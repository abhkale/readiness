import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { ServiceConfigService } from '../service-config.service';

@Component({
  selector: 'app-add-tournament',
  templateUrl: './add-tournament.component.html',
  styleUrls: ['./add-tournament.component.css']
})
export class AddTournamentComponent implements OnInit {
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
  Tournamentname: any;
  StartOfDate: any;
  EndOfDate: any;

  constructor(public toastr: ToastrManager,private spinnerService: Ng4LoadingSpinnerService,private formBuilder: FormBuilder , private router: Router , private service:ServiceConfigService) { 
   
  }

  ngOnInit() {
      this.signUpForm = this.formBuilder.group({
          TournamentName: ['', Validators.required],
          SOD: ['', Validators.required],
          EOD : ['', Validators.required]
         
      });
  }

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    this.submitted = true;
      
    this.Tournamentname = this.signUpForm.value.TournamentName;
    this.StartOfDate = this.signUpForm.value.SOD;
    this.EndOfDate = this.signUpForm.value.EOD;
  if(this.Tournamentname !== "" && this.StartOfDate !=="" && this.EndOfDate !== "" ){
      this.db.openDatabase(1);
      this.spinnerService.show();
      setTimeout(()=>{
    this.db.add('TournamentData', { Tournamentname: this.Tournamentname , SOD: this.StartOfDate  ,EOD : this.EndOfDate }).then(() => {
        this.spinnerService.hide();
        this.toastr.successToastr('This is success toast.', 'Success!');
        this.router.navigateByUrl('dashboard');
    }, (error) => {
        console.log(error);
        this.toastr.errorToastr('This is error toast.', 'Oops!');
    });
  }, 4000);

    

}
  }
}
