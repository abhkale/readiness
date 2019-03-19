import { Component } from '@angular/core';
import {AngularIndexedDB} from 'angular2-indexeddb';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public db = new AngularIndexedDB('myDb', 1);
  objectStore: any;
  objectStore1: any;
  constructor(){ 
 
    
    }

  ngOnInit(){  
    this.db.openDatabase(1, (evt) => {
      this.objectStore = evt.currentTarget.result.createObjectStore(
          'Users', { keyPath: "id", autoIncrement: true });
  
          this.objectStore.createIndex("name", "name");
          this.objectStore.createIndex("email", "email");
          this.objectStore.createIndex("DOb", "name");
          this.objectStore.createIndex("MOB", "email");
          this.objectStore.createIndex("Token","Token");
          this.objectStore.createIndex("Password","Password");

          const objectStore2 = evt.currentTarget.result.createObjectStore(
            'TournamentData', { keyPath: 'id', autoIncrement: true });
        
    
            objectStore2.createIndex("Tournamentname", "Tournamentname");
            objectStore2.createIndex("SOD", "SOD");
            objectStore2.createIndex("EOD", "EOD");
    });

    this.db.openDatabase(1);
  }


}
