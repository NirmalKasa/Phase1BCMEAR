import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clientFields = new ClientFields();
  

  

  constructor() {
    
    this.clientFields=JSON.parse(sessionStorage.getItem('clientFields')); 
       
    
    
    console.log("rahul" + this.clientFields);
    
   }

  ngOnInit() {
  }

  generatePdf(){
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download();
   }

   getDocumentDefinition() {
    sessionStorage.setItem('clientFields', JSON.stringify(this.clientFields));
    
    
    return {
      content: [
        {
          text: 'BRD',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: 'Name : ' +this.clientFields.name
            }
          ]
        ]
      }
    ]
  }
}

}
export class ClientFields {

  name : string;
  engagement : string;
  code : string;
  bseg : string;
  sys : string;
  method : string;
  vertical : string;
  owner : string;
  email : string;
  brd : string;
  remarks : any;

  constructor(){
    
  }
}