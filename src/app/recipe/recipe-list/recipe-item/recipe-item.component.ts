import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipesItemList: Recipe;
@Input() index: number;
constructor(private recipeService: RecipeService) { }

ngOnInit() {
}

// not in use
onToSelect() {
  // this.recipeService.selectedRecipe.emit(this.recipesItemList);
}
// lec-117;
// @Output() emitRecipe = new EventEmitter<void>();
  // onToSelect() {
  //   this.emitRecipe.emit();
  // }

}
