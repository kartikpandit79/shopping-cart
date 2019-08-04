import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // storedRecipe;
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipe() {
    const storedRecipe = this.recipeService.getRecipe();
    this.http.put('https://ng-recipebook-ae8fb.firebaseio.com//recipe.json',
        storedRecipe).subscribe(
            (resData => {
              console.log(resData);
            })
        );
  }

  onDataFetch () {
      return this.http.get<Recipe[]>
      ('https://ng-recipebook-ae8fb.firebaseio.com//recipe.json')
      .pipe((map(recipes => {
        return recipes.map( recipes => {
          return {...recipes, ingred: recipes.ingred ? recipes.ingred : [] };
        });
      })),
      tap (resData => {
        this.recipeService.setRecipe(resData);
      }));
   }
}

