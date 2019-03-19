import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceConfigService } from '../service-config.service';
import {AngularIndexedDB} from 'angular2-indexeddb';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public db = new AngularIndexedDB('myDb', 1);
  signUpForm: FormGroup;
  submitted = false;
  authCode  :any;
  userName: any;
  password: any;
  DataSource: any;
 
  createCollections: any;
  objectStore :any;
  customerData: any;
  DOB: any;
  MOB: any;
  email: any;
  random: number;
  myDate :number;
  transformedDate: string;

  constructor(public datePipe: DatePipe,public toastr: ToastrManager,private spinnerService: Ng4LoadingSpinnerService,private formBuilder: FormBuilder , private router: Router , private service:ServiceConfigService) { 
  }

 ageRangeValidator(date):ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    console.log(date); // now you can :)
    if (c.value)
      return null;
    else
      return { 'Date Greater then today' : true };
  }
}

  ngOnInit() {
    this.myDate = Date.now();
    this.transformedDate = this.datePipe.transform(this.myDate);
      this.signUpForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          email: ['', Validators.required ,Validators.email],
          MOB : ['', Validators.required],
          DOB : ['', Validators.required , this.ageRangeValidator(this.myDate)],
          password :['',Validators.required]
      });
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
    let myDate = Date.now();
    this.transformedDate = this.datePipe.transform(myDate ,'shortDate');
    this.userName = this.signUpForm.value.firstName;
    this.email = this.signUpForm.value.email;
    this.MOB = this.signUpForm.value.MOB;
    this.DOB = this.signUpForm.value.DOB;
    this.password = this.signUpForm.value.password;
    this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  if(this.email !== "" && this.DOB !== "" && this.MOB !=="" && this.userName !== "" && this.password !=="" ){
      this.db.openDatabase(1);
      this.spinnerService.show();
      setTimeout(()=>{
    this.db.add('Users', { name: this.userName , email: this.email  ,MOB : this.MOB  ,DOB :this.DOB ,Token : this.random,Password : this.password }).then(() => {
        this.spinnerService.hide();
        this.router.navigateByUrl('');
    }, (error) => {
        console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
    });
  }, 4000);
}
  }
}

