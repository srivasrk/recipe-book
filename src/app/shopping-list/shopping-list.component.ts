import { Component, OnInit } from '@angular/core';

import { ShoppingListAddComponent } from "./shopping-list-add.component";
import { Ingredient } from "../shared";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  moduleId: module.id,
  selector: 'rb-shopping-list',
  templateUrl: 'shopping-list.component.html',
  directives: [ShoppingListAddComponent]
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient = null;

  constructor(private sls: ShoppingListService) {}

  ngOnInit() {
    this.items = this.sls.getItems();
  }

  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
  }

  onCleared() {
    this.selectedItem = null;
  }
}
