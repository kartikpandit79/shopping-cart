import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 id: number;
// @Input() selectedRecipeNow: Recipe;
selectedRecipeNow: Recipe;
  constructor(private recipeService: RecipeService,
      private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // console.log(this.id);
        this.selectedRecipeNow = this.recipeService.getOneRecipe(this.id);
      }
      );
      // console.log(this.selectedRecipeNow);
  }
  onAddToShoppingList() {
    this.recipeService.addIngredToShoppingList(this.selectedRecipeNow.ingred);
    // this.router.navigate(['../../', 'shopinglist'], {relativeTo: this.route});
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }

}
