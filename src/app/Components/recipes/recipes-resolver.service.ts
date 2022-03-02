import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "src/app/models/recipe.model";
import { DataStorageService } from "src/app/Services/data-storage.service";

@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe[]>
{
constructor(private dataStorageService:DataStorageService)
{}
resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
  return this.dataStorageService.fetchRecipes();

}

}