import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingService } from './shopping.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged=new Subject< Recipe[]>();

  
  addIngredients:Ingredient[];
  
  constructor(private shpService:ShoppingService) { }
  
  
  private recipes:Recipe[]=[
    new Recipe('A test Recipe2','dummy2','https://cdn.pixabay.com/photo/2016/11/19/12/16/dish-1838975_960_720.jpg',[new Ingredient('Meat',1),new Ingredient('Eggs',3)]),new Recipe('A test Recipe','dummy','https://cdn.pixabay.com/photo/2016/11/19/12/16/dish-1838975_960_720.jpg',[new Ingredient('Meat',1),new Ingredient('Eggs',3)])
  ];
  setRecipies(recipes:Recipe[])
    {
  this.recipes=recipes;
  this.recipeChanged.next(this.recipes.slice());
    }
deleteRecipe(ind:number)
{
  this.recipes.splice(ind,1);
  this.recipeChanged.next(this.recipes.slice());
}
  public addRecipe(recipe:Recipe)
  {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
 public updateRecipe(ind:number,rec:Recipe){
    this.recipes[ind]=rec;
    this.recipeChanged.next(this.recipes.slice());
  }
  public getRecipes()
  {
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }

  addIngredientsToShopping(ing:Ingredient[])
  {
    ing.forEach(element => {
      this.shpService.addIngredients(element);
      
    });
    
  }

}
