import { Component, OnInit } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { DocumentService } from '../shared/document.service';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  clientFields: ClientFields
  brdCount: number
  fsdCount: number = 0;
  tsdCount: number = 0;
  rtmCount: number = 0;
  testdocCount: number = 0;

  constructor(private documentService: DocumentService, private store: LocalStorageService) { }

  ngOnInit() {
    this.clientFields = JSON.parse(this.store.getClientDetails());
    this.fetchClientDocuments();
  }

  fetchClientDocuments() {
    this.documentService.fetchClientDocuments(this.clientFields.name).subscribe(data => {

      console.log(data);
      this.documentService.clientsBrdDocs = data.brdDocs;
      if (this.documentService.clientsBrdDocs != undefined) {
        console.log("brd docs available");
        this.store.setBrdDocsDetails(this.documentService.clientsBrdDocs);
        this.brdCount = this.documentService.clientsBrdDocs.length
      } else {
        this.brdCount = 0;
      }
      console.log(this.documentService.clientsBrdDocs)
    },

      error => {
        console.log("there is an error");
        this.brdCount = 0;
      })
  }
}
