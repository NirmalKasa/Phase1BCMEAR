import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { ActivatedRoute } from '@angular/router';
import { ClientServices } from '../shared/client.service';
import { LocalStorageService } from '../shared/localstorage.service';
import { SearchService } from '../shared/search.service';
import { LoggedInUser } from '../log-in/log-in.component';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DailogService } from '../shared/dailog.service';
import { ClientinteractorService } from '../shared/clientinteractor.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  clientsList : ClientFields[]
  loggedInUser = new LoggedInUser()
  searchClientStr:String;
  showSpinner : boolean = false;
  updatedClientList = new EventEmitter<ClientFields[]>();

  constructor(private clientServices :ClientServices,private activatedRoute : ActivatedRoute,
    private localStorageService : LocalStorageService, private searchService : SearchService, private dialog: MatDialog,
    private dialogService : DailogService, private clientInteractor : ClientinteractorService) { }

  ngOnInit() {
    //this.getClientsList();
    this.loggedInUser = JSON.parse(this.localStorageService.getLoggedInUser())
    this.showSpinner=true;
    this.getClientByUser(this.loggedInUser.username)
  }

  selectedclient(index : number) {
    console.log("client selected ==>"+this.clientsList[index].name)
    //sessionStorage.setItem('clientFields', JSON.stringify(this.clientsList[index]));
    this.localStorageService.setClientDetails(this.clientsList[index]);

  }

  // getClientsList(){
  //   this.clientServices.getClientDetails().subscribe(
  //     data => {
  //       console.log(data);
  //       this.clientsList = data
  //       this.clientServices.clientsList= data;
  //     },
  //     error =>{
  //       console.log(error);
  //     }
  //   )
  // }

  searchClient(){
    console.log(this.searchClientStr);   
    this.showSpinner=true;   
    document.getElementById("overlay").style.display = "block";   
    if(this.searchClientStr==null || this.searchClientStr==""){
      this.getClientByUser(this.loggedInUser.username)
    }
    this.searchService.retrieveSearchResults(this.searchClientStr).subscribe(
      data => {
        console.log(data);
        this.clientsList = data    
        this.clientServices.clientsList= data;
        setTimeout(()=>{
          this.showSpinner = false;
          document.getElementById("overlay").style.display = "none";
        }, 1000) 
      },
      error =>{
        console.log(error);
      }
    )
  }

  selectedclientForDelete(index : number) {
    console.log("client selected ==>"+this.clientsList[index].name)
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res =>{
      if(res){
        const clientInfo = this.clientsList[index];
        this.clientServices.deleteClient(clientInfo._id).subscribe(
          data => {
            console.log(data);
            this.getClientByUser(this.loggedInUser.username)  
          },
          error =>{
            console.log(error);
          }
        )

      }
    });
  }

  getClientByUser(userName){
    document.getElementById("overlay").style.display = "block";   
    this.clientServices.getClientByUserName(userName).subscribe(
      data => {
        console.log(data);
        this.clientsList = data
        this.clientServices.clientsList= data;
        this.clientInteractor.sendupdatedClientList(this.clientsList)
        setTimeout(()=>{
          this.showSpinner = false;
          document.getElementById("overlay").style.display = "none";   

        }, 1000)     
      },
      error =>{
        console.log(error);
      }
    )
  }
}
