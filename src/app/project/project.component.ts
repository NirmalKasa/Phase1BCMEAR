import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  selection : any;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  navigate(){

    if(this.selection=="BRD")
    {
      this.router.navigate(['/brd']);
    }
    

  }


}
