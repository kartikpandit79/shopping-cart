import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeComponent } from './recipe.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { ResolverService } from './resolver.service';

const recipeRoutes: Routes = [
  {path: '',
   canActivate: [AuthGuard],
   component: RecipeComponent,
    children: [
    // {path: 'itemlist', component: RecipeItemComponent},
    {path: '', component: RecipeStartComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailsComponent, resolve: { ResolverService}},
    {path: ':id/edit', component: RecipeEditComponent, resolve: { ResolverService}},
  ]} ,
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
