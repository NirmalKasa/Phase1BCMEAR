import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientServices } from '../shared/client.service';
import { ClientFields } from '../client/client.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit,OnDestroy {
  listItems = ['BRD','FSD','Template','FRD']
  clientsList : ClientFields[]
  subscription : any
  isLoading : boolean;
  constructor(private clientServices: ClientServices, private route : Router,
     private localStorageService : LocalStorageService) { }

  ngOnInit() {
    this.isLoading= true;
    this.subscription = setInterval(() => { 
                     this.fetchClientListDetails(); 
                }, 500);
    
  }
  doNavigate(routeurl: string, index : number){
    console.log("client index="+index);
    this.localStorageService.setClientDetails(this.clientsList[index]);
    this.route.navigate(['/'+routeurl]);
  }

  fetchClientListDetails(){
    this.clientsList = this.clientServices.clientsList
    this.isLoading= false;
    console.log("data from client services=="+this.clientsList)
    this.clearSubscription();
  }

  clearSubscription(){
    clearInterval(this.subscription);
    console.log("cleared interval subscription");
  }

  ngOnDestroy(){

  }
}
