import { Injectable } from '@angular/core';
import { BrdFields } from '../brd/brd.component';


@Injectable({providedIn:"root"})
export class LocalStorageService {

  private clientStorageName : string = "CLIENT_DETAILS";
  private BrdDocsStorageName : string = "BRD_DOCS_DETAILS";

  brdDocsList : BrdFields[]
  setClientDetails(data : any){
    localStorage.setItem(this.clientStorageName, JSON.stringify(data));
  }

  getClientDetails(){
    return localStorage.getItem(this.clientStorageName);
  }

  setBrdDocsDetails(data : any) {
    localStorage.setItem(this.BrdDocsStorageName,JSON.stringify(data));
  }

  getBrdDocsDetails(){
    return localStorage.getItem(this.BrdDocsStorageName);
  }

  getBrdDocItembyIndex(index : number){
    this.brdDocsList = JSON.parse(this.getBrdDocsDetails())
    return this.brdDocsList[index]
  }
}
