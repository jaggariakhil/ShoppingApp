import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/Services/shopping.service';

import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy{
  @ViewChild('f') slForm:NgForm;
subscricption:Subscription;
editMode=false;
 editedItemIndex:number;
editedItem:Ingredient;

  constructor(private shpservice:ShoppingService) { }

  ngOnInit() {
    this.subscricption=this.shpservice.startedEditing.subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editedItemIndex=index;
        this.editedItem=this.shpservice.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount,
        })
      }
    );
   
  }

  onAddItem(form:NgForm) {
    const value=form.value;
    console.log(value.name);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.shpservice.updateIngredient(this.editedItemIndex,newIngredient);
      
    }
    else
    {
    this.shpservice.addIngredients(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  onDelete(form:NgForm)
  {
    this.shpservice.deleteIngredient(this.editedItemIndex);
    form.reset();
  }
  onClearItem(form:NgForm)
  {
    form.reset();
    this.editMode=false;
    
  }
  ngOnDestroy(){

  }

}
