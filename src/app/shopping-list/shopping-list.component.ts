import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShopingService } from './shoping.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private Sub: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingService: ShopingService) { }
  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.Sub = this.shoppingService.newIngredients.subscribe(
      (ingredientss: Ingredient[]) => {
        this.ingredients = ingredientss;
      }
     );
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.Sub.unsubscribe();
  }

  // lect-118
  // kartik onIngdAddition
  // ngOnInit() {
  //   this.ingredients = this.shoppingService.getIngredient();
  //   this.shoppingService.newIngredients.subscribe(
  //     (ing: Ingredient) => { this.ingredients.push(ing); }
  //   );
  // }
  // onIngdAddition(eventData: Ingredient) {
  //   this.ingredients.push(eventData);
  // }
}
