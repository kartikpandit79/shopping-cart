import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
// import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  // providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
  constructor() {}


ngOnInit() {

}
}

//   // lect 179
// toRecipeDetails;
// constructor(private recipeService: RecipeService) {
    // ngOnInit() {
  //   // this.recipeService.selectedRecipe.subscribe(
  //   //   (recivedRecipe: Recipe) => { this.toRecipeDetails = recivedRecipe; }
  //   // );
  // }
// lect-117
  // onRecRecipe(recData: Recipe) {
  //   this.toRecipeDetails = recData;
  // }

