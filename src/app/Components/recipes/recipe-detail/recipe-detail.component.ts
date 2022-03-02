import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/Services/recipe.service';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recService:RecipeService,private route:ActivatedRoute,private router:Router) { }
  recipeSel:Recipe;
  id:number;

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.recipeSel=this.recService.getRecipe(this.id);
      }
    );
  }
  onDeleteRecipe(){
    this.recService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
    
    
  
  onShoppingList()
  {
this.recService.addIngredientsToShopping(this.recipeSel.ingredients);
  }
  onEditRecipe()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});
  }

}
