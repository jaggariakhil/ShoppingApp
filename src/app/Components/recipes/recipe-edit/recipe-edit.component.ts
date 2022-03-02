import { ElementSchemaRegistry } from '@angular/compiler';
import { taggedTemplate } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { retry } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/Services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})


export class RecipeEditComponent implements OnInit {
id:number;

editMode=false;
recipeForm:FormGroup;
  
constructor(private route:ActivatedRoute,private recServive:RecipeService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
      this.id=+params['id'];
  
      this.editMode=params['id']!=null;
  
   
      this.initForm();
      }

    );}

    onSubmit()
    {
      const newRecipe=new Recipe(this.recipeForm.value['name'],
                                    this.recipeForm.value['description'],
                                    this.recipeForm.value['imagePath'],
                                    this.recipeForm.value['ingredients']
                        
      );
      if(this.editMode)
      {
      this.recServive.updateRecipe(this.id,this.recipeForm.value);
      }
      else{
      
      this.recServive.addRecipe(newRecipe);
      }
      this.onCancel();
      
      
    }
    get controls(){
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }
    onCancel(){

      this.router.navigate(['../'],{relativeTo:this.route});
    }
    onAddIngredient()
    {
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name':new FormControl(null,[Validators.required]),
          'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
        })
      )
    }
    onDeleteIngredient(ind:number)
    {
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(ind);
    }
    private initForm()
    {
      
      let recipeName='';
      let recipeImagePath='';
      let recipeDesc='';
      let recipeIngredients=new FormArray([]);
      if(this.editMode){
        const recipe=this.recServive.getRecipe(this.id);
        recipeName=recipe.name;
        recipeImagePath=recipe.imagePath;
        recipeDesc=recipe.description;
        if(recipe['ingredients']){
          for(let ing of recipe.ingredients)
          {
            recipeIngredients.push(
              new FormGroup({
                'name':new FormControl(ing.name,Validators.required),
                'amount':new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)],),
              })
            )
          }
        }

      }
      this.recipeForm=new FormGroup(
        {

         'name':new FormControl(recipeName,Validators.required),
         'imagePath':new FormControl(recipeImagePath,Validators.required) ,
         'description':new FormControl(recipeDesc,Validators.required),
         'ingredients':recipeIngredients,


        }
      )

    }
    
  }




