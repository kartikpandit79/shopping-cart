import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingService } from '../shopping-list/shoping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // selectedRecipe = new EventEmitter<Recipe>();
  addedRecipeChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   new Recipe('Desert-Evouqe',
  //   'RR-Evoque',
  //   'https://upload.wikimedia.org/wikipedia/commons/0/0d/Evoque_in_Dubai_054_(5957814952).jpg',
  //   [new Ingredient('Deset', 2), new Ingredient('Sand', 1)]),
  //   new Recipe('White-Evoque',
  //   'LR-Evoque',
  //   'https://smgmedia.blob.core.windows.net/images/113521/1024/land-rover-range-rover-evoque-coupe-diesel_36394432.jpg',
  //   [new Ingredient('White', 1), new Ingredient('ice', 3)])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shopingService: ShopingService) {
  }

  getRecipe() {
    return this.recipes.slice();
  }

  setRecipe(newRecipe: Recipe[]) {
    this.recipes = newRecipe;
    this.addedRecipeChanged.next(this.recipes.slice());
  }

  addIngredToShoppingList(newIngd: Ingredient[]) {
    this.shopingService.addNewIngredient(newIngd);
  }

  getOneRecipe(id: number) {
    const kar = this.recipes[id];
    console.log(kar);
    return this.recipes[id];
  }

  addRecipe(recipeuadd: Recipe) {
    this.recipes.push(recipeuadd);
    this.addedRecipeChanged.next(this.recipes.slice());
    // console.log(recipeuadd);
    // console.log(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.addedRecipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1 );
    this.addedRecipeChanged.next(this.recipes.slice());
  }

}



