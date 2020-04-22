import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';


const clientSaveDocumentUrl= 'http://localhost:8000/files/save-client-files';
const clientFetchDocumentUrl= 'http://localhost:8000/clientdetails/';
const downloadPDFDocumentUrl= 'http://localhost:8000/files/download-pdf-file/';
@Injectable({providedIn:"root"})
export class DocumentService {


  clientsBrdDocs : BrdFields[];
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

  fetchClientDocuments(name : string): Observable<any>{
    console.log("fetching client docs");
 const params = new HttpParams()
      .set('client_name', name)

    const headers = { 'Content-Type': 'application/json' }
   return  this.http.get<any>(clientFetchDocumentUrl+name, {params, headers})
    // .subscribe(
    //   data => {
    //     console.log(data);
    //     return data;
    //   }
    // )
  }

  downloadPDFDocument(pdfId : string){
    console.log("pdf Id="+pdfId);
    return  this.http.get(downloadPDFDocumentUrl+pdfId)
  }
}


