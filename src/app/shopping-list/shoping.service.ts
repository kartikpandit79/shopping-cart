import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopingService {
  newIngredients = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Pasta', 10),
    new Ingredient('Milk', 15),
    new Ingredient('Beer', 4),
    new Ingredient('Maggie', 2),
    new Ingredient('lemon', 4)
  ];
  constructor() { }
  getIngredient() {
    return this.ingredients.slice();
  }
  getSingIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(addIngred: Ingredient) {
     this.ingredients.push(addIngred);
     this.newIngredients.next(this.ingredients.slice());
  }
  addNewIngredient(newIng: Ingredient[]) {
    this.ingredients.push(...newIng);
    this.newIngredients.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newingrd: Ingredient) {
    this.ingredients[index] = newingrd;
    this.newIngredients.next(this.ingredients.slice());
  }
  DeleteIngredient(indexNumb: number) {
    this.ingredients.splice(indexNumb, 1);
    this.newIngredients.next(this.ingredients.slice());
  }


  // lect 118
  // getIngredient() {
  //   return this. ingredients.slice();
  // }

  // addIngredient(data: Ingredient) {
  //   this.ingredients.push(data);
  //   this.newIngredients.emit(this.ingredients.slice());
  // }

  // addNewIngredient(newData: Ingredient[]) {
  //   this.ingredients.push(...newData);
  //   this.newIngredients.emit(this.ingredients.slice());
  // }
}
