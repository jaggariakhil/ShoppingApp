import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataStorageService } from 'src/app/Services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private dataserv:DataStorageService) { }

  ngOnInit(): void {
  }
onSaveData(){
  this.dataserv.storeRecipies();
}
onFetchData(){
  this.dataserv.fetchRecipes().subscribe();

}

}
