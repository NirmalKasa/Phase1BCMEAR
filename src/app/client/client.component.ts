import { Component, OnInit } from '@angular/core';
import { ClientServices } from '../shared/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedInUser } from '../log-in/log-in.component';
import { LocalStorageService } from '../shared/localstorage.service';
import { DailogService } from '../shared/dailog.service';



@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientFields = new ClientFields();
  id : number;
  loggedInUser = new LoggedInUser();
  constructor(private clientServices: ClientServices, private route: ActivatedRoute, private clientService: ClientServices,
    private _router : Router,private store:LocalStorageService,
    private dialogService : DailogService) {
   }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id!=null){
      this.clientFields = this.clientService.getClientInfo(this.id);
    }
  }

  updateSessionStorage(){
    //Commented by Uma
   // sessionStorage.setItem('clientFields', JSON.stringify(this.clientFields));
    this.store.setClientDetails(this.clientFields);
  }

  saveClientDetails(){
    console.log("client details=="+ JSON.stringify(this.clientFields));
    this.loggedInUser = JSON.parse(this.store.getLoggedInUser()) ;
   this.clientFields.loggedInUserName = this.loggedInUser.username;
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

  stepBack(){
    this.dialogService.openConfirmDialog('Data entered would be lost. Confirm whether to go back ?')
    .afterClosed().subscribe(res =>{
      if(res){
        this._router.navigate(['folder']);
      }
    });
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
  loggedInUserName :string;
}
