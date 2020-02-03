import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientFields = new ClientFields();
  

  

  constructor() {
   }

  ngOnInit() {
  }

  updateSessionStorage(){
   
    sessionStorage.setItem('clientFields', JSON.stringify(this.clientFields)); 
  }

  

}
export class ClientFields {

  name : string;
  engagement : string;
  code : string;
  bseg : string;
  sys : string;
  method : string;
  vertical : string;
  owner : string;
  email : string;
  brd : string;
  remarks : any;


}