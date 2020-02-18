import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import * as jsPDF from 'jspdf';

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


  constructor() { }

  ngOnInit() {
    this.clientFields = JSON.parse(sessionStorage.getItem('clientFields'));
    this.brdFields = JSON.parse(sessionStorage.getItem('brdFields'));
    this.fileName = this.clientFields.name + "_" + this.brdFields.module + "_BRD.pdf";
    console.log(this.fileName);
   
  }

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  public downloadAsPDF() {
    console.log('down'+this.fileName);
    let doc = new jsPDF();
    
    doc.addHTML(this.pdfTable.nativeElement, function () {
      doc.save('BOFA_Changes for Interest Calculation_BRD.pdf');
    });

  }
  

}
