import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { Recipe } from '../recipe';
import { RecipeItemComponent } from './recipe-item.component';
import { RecipeService } from "../recipe.service";

@Component({
  moduleId: module.id,
  selector: 'rb-recipe-list',
  templateUrl: 'recipe-list.component.html',
  directives: [RecipeItemComponent, ROUTER_DIRECTIVES]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => this.recipes = recipes
    );
  }
}
