import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../shared/client.service';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientFields = new ClientFields();


  constructor(private clientServices: ClientServices) {
   }

  ngOnInit() {
  }

  updateSessionStorage(){

    sessionStorage.setItem('clientFields', JSON.stringify(this.clientFields));
  }

  saveClientDetails(){
    console.log("client details=="+ JSON.stringify(this.clientFields));
    this.clientServices.saveClientDetails(this.clientFields);
    this.updateSessionStorage();
  }

}
export class ClientFields {

  name : string;
  engagement : string;
  code : string;
  sys : string;
  vertical : string;
  method : string;
  partner : string;
  manager : string;
  remarks : any;
}
