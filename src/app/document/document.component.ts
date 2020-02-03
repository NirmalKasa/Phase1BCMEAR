import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ClientFields } from '../client/client.component';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  clientFields = new ClientFields();

  constructor() { }

  ngOnInit() {
  }

  generatePdf(){
    
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download();
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
              
              text: 'Name : ' +this.clientFields.name,
              bold: true
              
            },
          {
              text: 'Engagement : '+ this.clientFields.engagement
            },
            {
              text: 'Client/Engagement code : '+ this.clientFields.code
            },
            {
              text: 'Business Segment : '+ this.clientFields.bseg
            },
            {
              text: 'System : '+ this.clientFields.sys
            },
            {
              text: 'Project Methodology : '+this.clientFields.method
            },
            {
              text: 'Banking Vertical : '+this.clientFields.vertical
            },
            {
              text: 'Owner : '+this.clientFields.owner
            },
            {
              text: 'Email Id : '+this.clientFields.email
            },
            {
              text: 'BRD Id : ' +this.clientFields.brd
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
