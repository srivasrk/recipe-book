import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from "@angular/router";

import { RecipeListComponent } from "./recipe-list";

@Component({
  moduleId: module.id,
  selector: 'rb-recipes',
  templateUrl: 'recipes.component.html',
  directives: [RecipeListComponent, ROUTER_DIRECTIVES]
})
export class RecipesComponent{
}
