import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShopingService } from '../shoping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShopingService) { }

  ngOnInit() {
    console.log('add mode: ' + this.editMode);
    this.subscription = this.shoppingService.startedEditing.subscribe(
     (index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      console.log('edit mode:: ' + this.editMode);
      this.editedItem = this.shoppingService.getSingIngredient(index);
      this.slForm.setValue({
        'ingdName': this.editedItem.name,
        'amount': this.editedItem.amount
      });
    });
  }

  onSubmit(fdata: NgForm) {
    const  newIngd = new Ingredient(fdata.value.ingdName, fdata.value.amount);
    if ( this.editMode ) {
      console.log('1 edit mode:: ' + this.editMode);
      this.shoppingService.updateIngredient(this.editedItemIndex, newIngd);
    } else {
      console.log('2 add mode:: ' + this.editMode);
      this.shoppingService.addIngredient(newIngd);
    }
    this.editMode = false;
    fdata.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.DeleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // ng form 216
  // @ViewChild('ingdName') ingdName: ElementRef;
  // @ViewChild('ingdAmt') ingdAmt: ElementRef;
// onAddition() {
//     const newName = this.ingdName.nativeElement.value;
//     const newAmount = this.ingdAmt.nativeElement.value;
//     const  newIngd = new Ingredient(newName, newAmount);
// this.shoppingService.addIngredient(newIngd);
// }

// lect 118
// kartik addIngredient
// onAddition() {
//   const newName = this.ingdName.nativeElement.value;
//   const newAmount = this.ingdAmt.nativeElement.value;
//   const  newIngd = new Ingredient(newName, newAmount);
// this.shoppingService.newIngredients.emit(newIngd);
// }

// @Output() newAdded = new EventEmitter<Ingredient>();
// onAddition() {
  //   const newName = this.ingdName.nativeElement.value;
  //   const newAmount = this.ingdAmt.nativeElement.value;
  //   const  newIngd = new Ingredient(newName, newAmount);
  //   this.newAdded.emit(newIngd);
  // }

}
