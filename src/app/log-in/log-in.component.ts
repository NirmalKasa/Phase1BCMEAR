import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private router : Router) { }

  username = ''
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

}
