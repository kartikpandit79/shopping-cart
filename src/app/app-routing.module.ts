import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'} ,
  {path: 'recipes', loadChildren: './recipe/recipe.module#RecipeModule'},
  {path : 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'shopinglist' , loadChildren: './shopping-list/shopping.module#ShoppingModule'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
