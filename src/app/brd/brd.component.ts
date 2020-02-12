import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brd',
  templateUrl: './brd.component.html',
  styleUrls: ['./brd.component.css']
})
export class BrdComponent implements OnInit {

  brdFields = new BrdFields();

  constructor() { }

  ngOnInit() {
  }

  updateSessionStorage(){
   
    sessionStorage.setItem('brdFields', JSON.stringify(this.brdFields)); 
  }

}

export class BrdFields {
  module : string;
  intro : string;
  purpose :string;
  proj : string;
  doc : string;
  related : any;
  acr : string;
  overview : string;
  obj : string;
  bkg : string;
  current : string;
  expected : string;
  workflow : string;
  impact : string;
  funcreq : string;
  inScope : string;
  outScope : string;
  report : string;
  asumptions : string;
  ref : string;
  app : string;
  rev : string;
  
  
}
