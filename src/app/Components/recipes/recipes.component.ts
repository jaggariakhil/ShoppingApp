import { Component, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  
  selRecipe:Recipe;
  
  constructor(private recService:RecipeService) { }

  ngOnInit(): void {
   
    
  }

}
