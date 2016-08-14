import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RecipeService } from "../recipe.service";
import { Subscription } from "rxjs/Rx";
import { Recipe } from "../recipe";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder, REACTIVE_FORM_DIRECTIVES } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'rb-recipe-edit',
  templateUrl: 'recipe-edit.component.html',
  styles: [],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private recipeIndex: number;
  private subscription: Subscription;
  private recipe: Recipe;
  private isNew = true;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }


  private navigateBack() {
    this.router.navigate(['../']);
  }

  onRemoveItem(index: number){
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddItem(name: string, amount: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [
          Validators.required,
          Validators.pattern("\\d+")
        ])
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImage = '';
    let recipeContent = '';
    let recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [
                Validators.required,
                Validators.pattern("\\d+")
              ])
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImage = this.recipe.imagePath;
      recipeContent =  this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImage, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

}
