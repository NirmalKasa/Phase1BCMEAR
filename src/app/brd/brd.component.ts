import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ClientFields } from '../client/client.component';
import { PreviewService } from '../preview/preview.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-brd',
  templateUrl: './brd.component.html',
  styleUrls: ['./brd.component.css']
})
export class BrdComponent implements OnInit {

  brdFields = new  BrdFields();
  clientFields : ClientFields;
  fileName : string;
  version : number = 1
  selectedId: number
  constructor(private previewService: PreviewService,private router : ActivatedRoute,
    private route: Router,
    private store : LocalStorageService) { }

  ngOnInit() {

   if(this.router.snapshot.queryParams['id']){
    this.selectedId= +this.router.snapshot.queryParamMap.get('id');
     console.log("selected id==>"+ this.selectedId)
     this.brdFields =this.store.getBrdDocItembyIndex(this.selectedId);
     console.log(this.brdFields);
     this.fileName=this.brdFields.fileName
     var res =this.fileName.split('.',2);
     res= res[0].split('_',4);
     console.log(+res[3]+1)
     this.version = +res[3]+1
   }else{
     console.log("creating new BRD doc");
   }
    console.log("seleted id=="+this.selectedId)
    this.clientFields = JSON.parse(this.store.getClientDetails());
    console.log(this.clientFields.name)
  }

  updateSessionStorage(){

    sessionStorage.setItem('brdFields', JSON.stringify(this.brdFields));
  }

  saveBrdDocument(form: NgForm){
    console.log(JSON.stringify(form.value))
    this.brdFields = form.value;
    this.generatePdf();
  }

  generatePdf(){
    let base64Data : any;
  //  const pdfContent: Element = document.getElementById('pdfTable');
   const documentDefinition = { content: 'This is a sample BRD document of version '+this.version };
 //pdfMake.createPdf(documentDefinition).open();
const pdfDocGenerator= pdfMake.createPdf(documentDefinition);
this.fileName =  this.clientFields.name+"_BRD_V_"+ this.version+".pdf";
console.log(this.version)
pdfDocGenerator.getBase64((data) => {
// console.log(data);
// blobData = data;
base64Data = data;

 this.previewService.saveClientDocument(base64Data,"BRD",this.clientFields.name,this.fileName,this.brdFields);
 this.route.navigate(['docrepo'])
});

  }
}

export class BrdFields {
  module : string;
  introduction : string;
  purpose :string;
  projectScope : string;
  documentScope : string;
  relatedFiles : string;
  acr : string;
  projectOverview : string;
  businessObjective : string;
  businessBackground : string;
  currentFunc : string;
  expeFunc : string;
  workflow : string;
  impact : string;
  funcreq : string;
  inScope : string;
  outScope : string;
  report : string;
  asumptions : string;
  ref : string;
  app : string;
  rev : string;
  pdfId: string;
  fileName: string;

}
