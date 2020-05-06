import { Component, OnInit } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { ActivatedRoute } from '@angular/router';
import { ClientServices } from '../shared/client.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { SearchService } from '../shared/search.service';
import { LoggedInUser } from '../log-in/log-in.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  clientsList : ClientFields[]
  loggedInUser = new LoggedInUser()
  constructor(private clientServices :ClientServices,private activatedRoute : ActivatedRoute,
    private localStorageService : LocalStorageService, private searchService : SearchService) { }

  ngOnInit() {
    //this.getClientsList();
    this.loggedInUser = JSON.parse(this.localStorageService.getLoggedInUser()) 
    this.getClientByUser(this.loggedInUser.username)
  }

  selectedclient(index : number) {
    console.log("client selected ==>"+this.clientsList[index].name)
    //sessionStorage.setItem('clientFields', JSON.stringify(this.clientsList[index]));
    this.localStorageService.setClientDetails(this.clientsList[index]);

  }

  getClientsList(){
    this.clientServices.getClientDetails().subscribe(
      data => {
        console.log(data);
        this.clientsList = data
        this.clientServices.clientsList= data;
      },
      error =>{
        console.log(error);
      }
    )
  }

  searchClient(event : any){
    console.log(event.target.value);
    if(event.target.value==null || event.target.value==""){
      this.getClientsList();
    }
    this.searchService.retrieveSearchResults(event.target.value).subscribe(
      data => {
        console.log(data);
        this.clientsList = data
        this.clientServices.clientsList= data;
      },
      error =>{
        console.log(error);
      }
    ) 
  }

  selectedclientForDelete(index : number) {
    console.log("client selected ==>"+this.clientsList[index].name)
    const clientInfo = this.clientsList[index];
    this.clientServices.deleteClient(clientInfo._id);
    location.reload();
   
  }

  getClientByUser(userName){
    this.clientServices.getClientByUserName(userName).subscribe(
      data => {
        console.log(data);
        this.clientsList = data
        this.clientServices.clientsList= data;
      },
      error =>{
        console.log(error);
      }
    )
  }

}
