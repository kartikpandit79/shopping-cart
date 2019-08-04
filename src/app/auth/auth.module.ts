import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const appAuthRoutes: Routes = [
  {path: '', component: AuthComponent}
];

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    // CommonModule,
    RouterModule.forChild(appAuthRoutes)
  ],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule { }
