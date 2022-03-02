import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/Services/recipe.service';

import {Recipe} from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  
  recipes:Recipe[];

  constructor(private recService:RecipeService,private router:Router,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recService.recipeChanged.subscribe(
      (rec:Recipe[])=>{
        this.recipes=rec;

      })
    
 this.recipes=this.recService.getRecipes();
  }
onNewRecipe()
{
this.router.navigate(['new'],{relativeTo:this.route})
}


}
