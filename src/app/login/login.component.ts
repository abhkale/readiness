import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceConfigService } from '../service-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  authCode  :any;
  userName: any;
  password: any;
  DataSource: any;
  passwordEntered : any;

  constructor(private formBuilder: FormBuilder , private router: Router , private service:ServiceConfigService) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.userName = this.loginForm.value.firstName;
    this.password = this.loginForm.value.password;
    console.log(this.passwordEntered);
    if(this.userName !== "" && this.password !== "")
    {
    this.authCode = this.service.authUser(this.userName,this.password);
    if(this.authCode)
    { 
      this.router.navigateByUrl('dashboard');
    } 
   }
  }
}
