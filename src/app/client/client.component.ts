import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../shared/client.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientFields = new ClientFields();
  id : number;

  constructor(private clientServices: ClientServices, private route: ActivatedRoute, private clientService: ClientServices,
    private _router : Router) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=null){
      this.clientFields = this.clientService.getClientInfo(this.id);
    }
  }

  updateSessionStorage(){
    sessionStorage.setItem('clientFields', JSON.stringify(this.clientFields));
  }

  saveClientDetails(){
    console.log("client details=="+ JSON.stringify(this.clientFields));
    this.clientServices.saveClientDetails(this.clientFields);
    this.updateSessionStorage();
  }

  renderSaveBtn(){
    if(this.id==null){
      return true;
    }
    return false;
  }

  updateClientDetails(){
    if(this.clientFields._id!=null){
      this.clientService.updateClientDetails(this.clientFields._id,this.clientFields);
      this._router.navigate(['clientdetails', this.id]);
    }
  }

  redirectToClientDetails(){
    if(this.clientFields._id!=null){
      this._router.navigate(['clientDetails', this.id]);
    }
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
  _id : String;

}
