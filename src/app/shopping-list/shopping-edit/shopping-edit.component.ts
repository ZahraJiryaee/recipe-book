import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
//import { Recipe } from './../../recipes/recipes.model';
import { Ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm:NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  //@ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  //@ViewChild('amountInputt', { static: true }) amountInputtRef: ElementRef;

  //ingredientAdded=new EventEmitter<{name:string, amount: number}>();
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private slService:ShoppingListService) {}
  
  
  

  ngOnInit(): void {
    this.subscription = this.slService.startedEditting.subscribe((index)=>{
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.slService.getIngredients(index);
      this.slForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount,
      })
    });
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputtRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    //const newIngredient = new Ingredient(ingName, ingAmount);
    //this.ingredientAdded.emit(newIngredient);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
    
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
