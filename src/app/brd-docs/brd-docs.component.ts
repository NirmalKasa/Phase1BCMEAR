import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../shared/document.service';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import { LocalStorageService } from '../shared/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brd-docs',
  templateUrl: './brd-docs.component.html',
  styleUrls: ['./brd-docs.component.css']
})
export class BrdDocsComponent implements OnInit {

  brdDocs : BrdFields[]
  clientFields : ClientFields;
  isLoading : boolean
  constructor(private documentService : DocumentService, private store : LocalStorageService,
    private route : Router) { }

  ngOnInit() {
     this.clientFields = JSON.parse(this.store.getClientDetails());
     this.fetchClientDocuments()
    // this.brdDocs = JSON.parse(this.store.getBrdDocsDetails());
    // console.log("in brd docs=="+this.brdDocs);
  }

  onSelect(index : number){
    console.log("selected file==>"+index);
    this.route.navigate(['brd'],{queryParams:{id:index}})
  }
  editBrd(clientName,fileName){
    this.route.navigate(['brd'],{queryParams:{fileName:fileName}})
 }

  deleteBrd(clientName,fileName){
    this.documentService.deleteBrdDocument(clientName,fileName).subscribe(
      response =>{
        console.log(response)
       // this.route.navigate(['docrepo'])
       this.documentService.fetchClientDocuments( this.clientFields.name).subscribe( data => {
        this.documentService.clientsBrdDocs = data.brdDocs;
        if(this.documentService.clientsBrdDocs != undefined ){
          console.log("brd docs available");
          this.brdDocs  = this.documentService.clientsBrdDocs;
          this.store.setBrdDocsDetails(this.documentService.clientsBrdDocs);
        }
      })
      }
    )
  }

  fetchClientDocuments(){
    this.isLoading = true
    this.documentService.fetchClientDocuments( this.clientFields.name).subscribe( data => {
      console.log(data);
      this.documentService.clientsBrdDocs = data.brdDocs;
      this.brdDocs = data.brdDocs;
      this.isLoading= false;
      // not req to store in localstorage, added db calls instead.
      if(this.documentService.clientsBrdDocs != undefined ){
        console.log("set the client brd docs")
        this.store.setBrdDocsDetails(this.documentService.clientsBrdDocs);  
      }
      console.log( this.documentService.clientsBrdDocs )
    },
    error=> {
        console.log("there is an error");
        
    })
  }
}
