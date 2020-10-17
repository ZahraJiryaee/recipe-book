import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from './../../recipes.model';
import { RecipeService } from './../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  //@Output() recipeSelected = new EventEmitter<void>();

  @Input() index: number;

  //constructor(private reciprService:RecipeService) {}

  ngOnInit(): void {}

  // onSelected() {
  //   //this.recipeSelected.emit();
  //   this.reciprService.recipeSelected.emit(this.recipe);
  // }
}
