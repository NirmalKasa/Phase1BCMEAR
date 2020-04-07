import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import * as jsPDF from 'jspdf';
import { PreviewService } from './preview.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  clientFields = new ClientFields();
  brdFields = new BrdFields();
  fileName: string;
  todayDate : Date = new Date();
  version : number =1 ;

  constructor(private previewService: PreviewService) { }

  ngOnInit() {

    this.clientFields = JSON.parse(sessionStorage.getItem('clientFields'));
    this.brdFields = JSON.parse(sessionStorage.getItem('brdFields'));
    this.fileName = this.clientFields.name + "_" + this.brdFields.module + "_BRD.pdf";

    this.fileName = "test_BRD.pdf";
    console.log(this.fileName);

  }

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  public downloadAsPDF() {
    console.log('down '+this.fileName);
    let doc = new jsPDF();

   doc.addHTML(this.pdfTable.nativeElement, function () {
     // doc.save('BOFA_Changes for Interest Calculation_BRD.pdf');
        });
     this.generatePdf();
  }

  generatePdf(){
       let base64Data : any;
     //  const pdfContent: Element = document.getElementById('pdfTable');
      const documentDefinition = { content: 'This is a sample BRD document.' };
    pdfMake.createPdf(documentDefinition).open();
  const pdfDocGenerator= pdfMake.createPdf(documentDefinition);
  this.fileName =  this.clientFields.name+"_BRD_V"+ this.version+".pdf";
  this.version+=1;
  console.log(this.version)
   pdfDocGenerator.getBase64((data) => {
   // console.log(data);
   // blobData = data;
   base64Data = data;

    this.previewService.saveClientDocument(base64Data,"BRD",this.clientFields.name,this.fileName,this.brdFields);
  });

   }


}
