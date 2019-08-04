import { NgModule } from '@angular/core';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeComponent } from './recipe.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
  ],

  declarations: [
    RecipeComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeItemComponent
  ],

  exports: [
    RecipeComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeStartComponent,
    RecipeListComponent,
    RecipeItemComponent,
  ]
})
export class RecipeModule { }
