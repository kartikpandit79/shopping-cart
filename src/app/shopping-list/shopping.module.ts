import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const shopRoutes: Routes = [
  {path: '', component: ShoppingListComponent},
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild(shopRoutes),
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  exports: [RouterModule]
})
export class ShoppingModule { }
