import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ClientFields } from '../client/client.component';
import { DocumentService } from '../shared/document.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  clientFields = new ClientFields();

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  generatePdf(){

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download();
    console.log("savign the file from component");
    this.documentService.saveClientDocument(pdfMake.createPdf(documentDefinition).getBlob(),"BRD","TCS");
    console.log("savign the file from component end");
   }

   getDocumentDefinition() {
      this.clientFields = JSON.parse(sessionStorage.getItem('clientFields'));
      console.log("rahul" + this.clientFields);


    return {
      content: [
        {
          text: 'BUSINESS REQUIREMENT DOCUMENT (BRD)',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{

              text: 'Client Name : ' +this.clientFields.name,
              bold: true

            },
          {
              text: 'Engagement Name : '+ this.clientFields.engagement
            },
            {
              text: 'Engagement code : '+ this.clientFields.code
            },
            {
              text: 'System : '+ this.clientFields.sys
            },
            {
              text: 'Banking Vertical : '+this.clientFields.vertical
            },
            {
              text: 'Project Methodology : '+this.clientFields.method
            },
            {
              text: 'Enagagement Partner : '+this.clientFields.partner
            },
            {
              text: 'Project Manager : '+this.clientFields.manager
            },
            {
              text: 'Remarks : '+this.clientFields.remarks
            }
          ]
        ]
      }
    ]
  }
}

}
