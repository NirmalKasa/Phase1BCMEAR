import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../shared/document.service';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import { LocalStorageService } from '../shared/localstorage.service';
import { Router } from '@angular/router';
import { SearchService } from '../shared/search.service';


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
    private route : Router, private searchService : SearchService) { }

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
  editBrd(fileName){
    this.route.navigate(['brd'],{queryParams:{fileName:fileName}})
 }

 deleteBrd(clientName,fileName){
  this.documentService.deleteBrdDocument(clientName,fileName).subscribe(
    response =>{
      console.log(response)
      this.fetchDocuments();
    }
  )
}

searchDocuments(event : any){
  console.log(event.target.value);
  if(event.target.value==null || event.target.value==""){
    this.fetchDocuments();
  } 
  else{
    this.fetchDocumentsUsingSearchCriteria(event)    
  }
     
}

fetchDocuments(){
  this.documentService.fetchClientDocuments( this.clientFields.name).subscribe( data => {
    this.documentService.clientsBrdDocs = data.brdDocs;
    if(this.documentService.clientsBrdDocs != undefined ){
      console.log("brd docs available");
      this.brdDocs  = this.documentService.clientsBrdDocs;
      this.store.setBrdDocsDetails(this.documentService.clientsBrdDocs);  
    }
  })
}

fetchDocumentsUsingSearchCriteria(event : any){
    this.searchService.retrieveDocumentSearchResults(event.target.value).subscribe( data => {
    this.searchService.brdDocs = data;
    if(this.searchService.brdDocs != undefined ){
      console.log("brd docs available");
      this.brdDocs  = this.searchService.brdDocs;
      this.store.setBrdDocsDetails(this.searchService.brdDocs);  
    }
  })
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
