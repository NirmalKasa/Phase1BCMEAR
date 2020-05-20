import { Injectable } from '@angular/core';
import { BrdFields } from '../brd/brd.component';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  constructor() { }
  public enableFormRestoration : boolean;
  public enableProjectFormRestoration  : boolean
  private BrdDocsStorageKey : string = "BRD_DOCS_TEMP_STORAGEDETAILS";
  private projectPhaseStorageKey : string = "PROJ_PHASE_TEMP_STORAGEDETAILS";
  

  brdFields : BrdFields

  setBrdDocFormValues(data : any) {
    localStorage.setItem(this.BrdDocsStorageKey,JSON.stringify(data));
  }

  getBrdDocFormValues(){
    return localStorage.getItem(this.BrdDocsStorageKey);
  }

  removeBRDDocFormValues(){
    localStorage.removeItem(this.BrdDocsStorageKey);
  }

  setProjectFormData(data : any){
    localStorage.setItem(this.projectPhaseStorageKey,JSON.stringify(data));
  }

  getProjectFormData(){
    return localStorage.getItem(this.projectPhaseStorageKey);
  }

  removeProjectFormData(){
    localStorage.removeItem(this.projectPhaseStorageKey);
  }

}
