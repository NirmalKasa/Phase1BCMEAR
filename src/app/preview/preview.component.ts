import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import { PreviewService } from './preview.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { exportPDF, Group, pdf } from '@progress/kendo-drawing';
import { LocalStorageService } from '../shared/localstorage.service';
import { LoggedInUser } from '../log-in/log-in.component';
import { StateManagerService } from '../shared/state-manager.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  clientFields = new ClientFields();
  brdFields = new BrdFields();
  fileName: string;
  todayDate: Date = new Date();
  version: number = 1;
  showMsg: boolean = false;
  loggedInUser = new LoggedInUser();

  constructor(private previewService: PreviewService, private store :LocalStorageService, private stateManager : StateManagerService) { }

  ngOnInit() {

    this.clientFields = JSON.parse(this.store.getClientDetails());
    this.brdFields = JSON.parse(sessionStorage.getItem('brdFields'));
    console.log( this.brdFields);
    this.loggedInUser = JSON.parse(this.store.getLoggedInUser()) ;
    this.brdFields.loggedInUserName = this.loggedInUser.username;
    this.fileName = this.brdFields.fileName;
    if(this.fileName){
      var res = this.fileName.split('.', 2);
      res = res[0].split('_', 5);
      console.log(+res[4] + 1)
      this.version = +res[4] + 1
    }
    console.log(this.fileName);
    this.fileName = this.clientFields.name + "_BRD_"+this.brdFields.module+"_V_" + this.version + ".pdf";
  }

  public writeToPDF(pdfComponent: any): void {
    let base64: any
    pdfComponent.export().then((group: Group) => {
      return exportPDF(group);
    }).then((dataUri: string) => {
      base64 = dataUri.replace('data:application/pdf;base64,', '');
      console.log(base64);
      this.version += 1;
      this.previewService.saveClientDocument(base64, "BRD", this.clientFields.name, this.fileName, this.brdFields);
      this.showMsg= true;
    });
  }

  returnToUnsavedData(){
    this.stateManager.enableFormRestoration = true;
  }

  clearLocalStorage(){
    this.stateManager.removeBRDDocFormValues();
    this.stateManager.removeProjectFormData();
  }
}
