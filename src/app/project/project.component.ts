import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateManagerService } from '../shared/state-manager.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  navigateTo: string;
  isBRDSelected : boolean;
  isDevSelected : boolean;
  isTestingSelected : boolean;
  isAnalysisSelected  : boolean;
  static BRDDoc : string = "brd"
  projectPhases : string[] = ["Analysis", "Development","Testing"]

  constructor(private router : Router, private stateManager : StateManagerService ) { }

  ngOnInit() {
   if(this.stateManager.enableProjectFormRestoration) {this.onRentry()}; 
    
  }

  onSelection( type :string){
    this.navigateTo = type
    this.stateManager.setProjectFormData(this.navigateTo);
  }
  navigate(){
    {
      this.router.navigate([this.navigateTo]);
    }
    

  }

  onRentry(){
    var entryDocPath = JSON.parse(this.stateManager.getProjectFormData());
    console.log(entryDocPath);   
    this.stateManager.enableProjectFormRestoration=false 
    switch (entryDocPath) {
      case "/brd":
        this.isAnalysisSelected=true;
        this.isBRDSelected=true;
        this.navigateTo="/brd";
        break;   
      default:
        break;
    }
  }

}
