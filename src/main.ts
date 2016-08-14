import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

import { RecipeBookAppModule } from "./app/recipe-book.module"; // add this import
import { environment } from "./app";


if (environment.production) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(RecipeBookAppModule);
