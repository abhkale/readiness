import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';


@Injectable({
  providedIn: 'root'
})
export class ServiceConfigService {
  configUrl="https://reqres.in/api/register";

  private db = new AngularIndexedDB('myDb', 1);
  response: any;

  constructor( private router: Router ,public toastr: ToastrManager,private http: HttpClient,private spinnerService: Ng4LoadingSpinnerService) {
    
   }

  authUser(username,password)
  {
    const params = {
      "email": username,
      "password": password
  };
 
   
        this.db.openDatabase(1);
        this.spinnerService.show();
setTimeout(()=>{
  this.db.getByIndex('Users', 'name', username).then(
    person => {
      this.spinnerService.hide();
      if(person != undefined)
      {
      
       if(person.Password === password)
       {
        this.toastr.successToastr('This is success toast.', 'Success!');
        this.router.navigateByUrl('dashboard');
       }else{
        this.toastr.errorToastr('Incorrect Password'); 
       }
      }else
      {
        this.toastr.errorToastr('Please check crendentials');
      }
       
    },
    error => {
        console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
    }
);
  }, 4000);

}
}
