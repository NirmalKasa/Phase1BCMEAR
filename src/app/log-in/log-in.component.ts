import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';


const ldapURL= 'http://localhost:8081/ldap/login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  auth2: any;

 
  cred: credentials;
  
 

  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  constructor(private router : Router,private http: HttpClient) {
    
   }

  username = ''
  email = ''
  password = ''
  invalidLogin = false

  ngOnInit() {
  }

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
         this.router.navigate(['/folder'])
        }
        else
        {
          alert(data.data)
        }
      })

      
  }

  





  
}


export class credentials
{
  email: string;
  password: string;
}