import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingComponent } from './loading/loading.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AlertComponent,
    LoadingComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  entryComponents: [ AlertComponent],
})
export class SharedModule { }
