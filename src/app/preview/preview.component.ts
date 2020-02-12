import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import * as jsPDF from 'jspdf';
import { stringify } from 'querystring';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  clientFields = new ClientFields();
  brdFields = new BrdFields();
  fileName: string;


  constructor() { }

  ngOnInit() {
    this.clientFields = JSON.parse(sessionStorage.getItem('clientFields'));
    this.brdFields = JSON.parse(sessionStorage.getItem('brdFields'));

  }

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  public downloadAsPDF() {
    this.fileName = this.clientFields.name + '_' + this.brdFields.module + '_BRD.pdf';
    let doc = new jsPDF();
    doc.addHTML(this.pdfTable.nativeElement, function () {
      doc.save(this.fileName);
    });


  }

}
