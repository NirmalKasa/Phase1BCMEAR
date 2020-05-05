import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  selection : any;
  navigateTo: string;
  constructor(private router : Router) { }

  ngOnInit() {
  }

  onSelection( type :string){
    this.navigateTo = type
  }
  navigate(){

        {
      this.router.navigate([this.navigateTo]);
    }
    

  }


}
