import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recserv:RecipeService) { 

  }
  storeRecipies(){
const recipes=this.recserv.getRecipes();
return this.http.put('https://shoppingapp-d2c10-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(
  (res)=>{
    console.log(res);
  }
)

  }
  fetchRecipes(){
    return this.http.get<Recipe[]>('https://shoppingapp-d2c10-default-rtdb.firebaseio.com/recipes.json').
    pipe(map(recipes=>{
      return recipes.map(recipe=>{
        return {...recipe,ingredients:recipe.ingredients?recipe.ingredients:[]}
      }

      );
    }),tap(recipes=>
      {
        this.recserv.setRecipies(recipes);
      }))
  }


}
