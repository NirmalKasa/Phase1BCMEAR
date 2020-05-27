import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../shared/localstorage.service';
import {  AuthService} from '../auth.service';
const ldapURL= 'http://localhost:8081/ldap/login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  auth2: any;

  form;
  cred: credentials;
  loginForm: FormGroup;
  submitted = false;
  loggedInUser = new LoggedInUser()

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  constructor(private router : Router,private http: HttpClient,private store: LocalStorageService,private auth: AuthService, private formBuilder: FormBuilder) {
    
   }

  username = ''
  email = ''
  password = ''
  invalidLogin = false

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  checkLogin(){
    if(this.username == "admin" && this.password == "admin"){
      this.router.navigate(['/folder'])
    } else{
        this.invalidLogin = true;
        alert("invalid username/password")
      }
  }

  

  prepareLoginButton() {
 console.log("INside prepare button");
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
   console.log("googleUser"+googleUser.getEmail);
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        this.router.navigate(['/folder'])
   
   
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
   
  }
  CheckCredentials(email1,password1)
  {
    // this.email = email;
    // this.password = password;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }

  if (this.loginForm.valid) {
    this.auth.sendToken(this.loginForm.value.email)
    this.router.navigate(["folder"]);
  }
   this.cred = new credentials();
   this.cred.email = email1;
   this.cred.password = password1;
    const headers = { 'Content-Type': 'application/json' }
   // const body ={"name":"Temenos"}
    this.http.post<any>(ldapURL,
    JSON.stringify(this.cred), {headers}
     ).subscribe(data => {
       console.log("data value is"+JSON.stringify(data.data));
       if(data.status == "200")
       {
         console.log("success")
         this.loggedInUser.username = this.cred.email;
        this.store.setLoggedInUser(this.loggedInUser)
         this.router.navigate(['/folder'])
        }
        else
        {
          alert(data.data)
        }
      })

      
  }

  
onReset() {
    this.submitted = false;
    this.loginForm.reset();
} 
}

export class credentials
{
  email: string;
  password: string;
}
export class LoggedInUser {
  username: string;
  password: string;
}