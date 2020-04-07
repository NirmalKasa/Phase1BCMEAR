import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrdFields } from '../brd/brd.component';


//const clientSaveDocumentUrl= 'http://localhost:8000/files/saveClientFiles';  // for testing
const saveClientBrdWithPDfUrl ='http://localhost:8000/brd-docs/save-brd-pdf';
@Injectable({providedIn:"root"})
export class PreviewService {

  constructor(private http: HttpClient){

  }

  saveClientDocument(base64Data: any,document_type : string, clnt_name:string,fileName : string,brdFields: BrdFields){
  console.log("saving the client files");


    const pdfData = {
      client_name: clnt_name,
      pdf_blob : base64Data,
      doc_type:document_type,
      file_Name : fileName,
      brd_details: brdFields
    }

    // const dataToSend = {
    //   pdf_details:pdfData,
    //   brd_details: brdFields
    // }
   // console.log(dataToSend);
      const headers = { 'Content-Type': 'application/json' }
     this.http.post(saveClientBrdWithPDfUrl,
      pdfData
      ).subscribe(data => {
        console.log(data);
       })

       console.log("saving the client files end");
  }


}
