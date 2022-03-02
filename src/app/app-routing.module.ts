import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./Components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./Components/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./Components/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./Components/recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./Components/recipes/recipe-start/recipe-start.component";
import { RecipeResolverService } from "./Components/recipes/recipes-resolver.service";
import { RecipesComponent } from "./Components/recipes/recipes.component";
import { ShoppingListComponent } from "./Components/shopping-list/shopping-list.component";

const appRoutes:Routes=[

  {path:'',redirectTo:'/recipes',pathMatch:'full'},
  {path:'recipes',component:RecipesComponent,children:[
    {path:'',component:RecipeStartComponent},
    
    {path:'new',component:RecipeEditComponent},
    {path:':id',component:RecipeDetailComponent,resolve:[RecipeResolverService]},
   
    
    {path:':id/edit',component:RecipeEditComponent,resolve:[RecipeResolverService]}
  ]},
  {path:'shopping-list',component:ShoppingListComponent},
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]

})
export class AppRoutingModule
{

}