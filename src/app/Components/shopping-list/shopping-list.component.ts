import { Component, OnInit } from '@angular/core';
import { ShoppingService } from 'src/app/Services/shopping.service';

import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[]=[];
  constructor(private shpservice:ShoppingService) { }

  ngOnInit() {
    this.ingredients= this.shpservice.getIngredients();
}
  
  ngAfterContentChecked()
  {
    this.ingredients= this.shpservice.getIngredients();
  }
onEdit(index:number)
{
this.shpservice.startedEditing.next(index);

}
onDelete(edit:number)
{
  this.shpservice.deleteIngredient(edit);
}
  
}
