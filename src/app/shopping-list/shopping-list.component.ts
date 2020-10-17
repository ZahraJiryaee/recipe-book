import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from './../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] ;
  private igChangeSub: Subscription;

  constructor(private slService:ShoppingListService) {}


  ngOnInit() {
    this.ingredients=this.slService.getIngredient();
    this.igChangeSub = this.slService.ingredientChanged.subscribe((ingredient:Ingredient[])=>{
      this.ingredients=ingredient;
    })
  }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
    this.igChangeSub.unsubscribe();
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number){
    this.slService.startedEditting.next(index);
  }

}
