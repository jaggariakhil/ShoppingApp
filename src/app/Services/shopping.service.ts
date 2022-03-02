import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnInit {
  startedEditing=new Subject <Number>();

  constructor() { }
 
  ngOnInit(): void {
   
    
    

  }
    ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  public getIngredients():Ingredient[]{
    return this.ingredients.slice();
  }
  public addIngredients(ing:Ingredient)
  {
    this.ingredients.push(ing);
    
  }
  public getIngredient(index:number)
  {
    return this.ingredients[index];
 
  }
public updateIngredient(index:number,ing:Ingredient)
{
this.ingredients[index]=ing;
}
public deleteIngredient(index:number)
{
   this.ingredients.splice(index,1);
}

}
