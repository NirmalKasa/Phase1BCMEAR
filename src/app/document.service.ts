import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const clientSaveDocumentUrl= 'http://localhost:8000/files/saveClientFiles';
@Injectable({providedIn:"root"})
export class DocumentService {



  constructor(private http: HttpClient){

  }

  saveClientDocument(blob: Blob,document_type : string, clnt_name:string){
  console.log("saving the client files");
    const data = {
      pdf_blob: blob,
      client_name: clnt_name,
      doc_type:document_type,
    }
    const headers = { 'Content-Type': 'application/json' }
     this.http.post(clientSaveDocumentUrl,
      data, {headers}
      ).subscribe(data => {
        console.log(data);
       })

       console.log("saving the client files end");
  }
}
