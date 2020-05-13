import { HttpClient, HttpParams,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment'

//for Local configuration
// const clientSaveDocumentUrl= 'http://localhost:8081/files/save-client-files';
// const clientFetchDocumentUrl= 'http://localhost:8081/clientdetails/';
// const deleteBrdDocumentUrl = 'http://localhost:8081/brd-docs/delete-brd';
// const getBrdDocumentUrl ='http://localhost:8081/brd-docs/getBrdDoc';
// const downloadDocumentUrl= 'http://localhost:8081/files/download-pdf-file';

//for docker
const clientSaveDocumentUrl= environment.apiUrl+'/files/save-client-files';
const clientFetchDocumentUrl= environment.apiUrl+'/clientdetails/getByClient';
const deleteBrdDocumentUrl = environment.apiUrl+'/brd-docs/delete-brd';
const getBrdDocumentUrl =environment.apiUrl+'/brd-docs/getBrdDoc';
const downloadDocumentUrl= environment.apiUrl+'/files/download-pdf-file';

@Injectable({providedIn:"root"})
export class DocumentService {


  clientsBrdDocs : BrdFields[];
  constructor(private httpClient: HttpClient,private router:Router){
    console.log("Current API URL:", environment.apiUrl);
  }

  saveClientDocument(blob: Blob,document_type : string, clnt_name:string){
  console.log("saving the client files");
    const data = {
      pdf_blob: blob,
      client_name: clnt_name,
      doc_type:document_type,
    }
    const headers = { 'Content-Type': 'application/json' }
     this.httpClient.post(clientSaveDocumentUrl,
      data, {headers}
      ).subscribe(data => {
        console.log(data);
       })

       console.log("saving the client files end");
  }

//   fetchClientDocuments(name : string): Observable<any>{
//     //console.log("fetching client docs");
// //  const params = new HttpParams()
// //       .set('client_name', name)

// //     const headers = { 'Content-Type': 'application/json' }
// //    return  this.httpClient.get<any>(clientFetchDocumentUrl, {params, headers})
//     // .subscribe(
//     //   data => {
//     //     console.log(data);
//     //     return data;
//     //   }
//     // )

//     let paramURL = clientFetchDocumentUrl + name;
//    return this.httpClient.get<any>(paramURL);
//   }

  fetchClientDocuments(name: string,loggedInUser: string): Observable<any>{
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('loggedInUser', loggedInUser);
   return this.httpClient.get<any>(clientFetchDocumentUrl,{params: params});
  }

  deleteBrdDocument(clientName :string, fileName:string, loggedInUser:string): Observable<any>{
    let params = new HttpParams();
    params = params.append('clientName', clientName);
    params = params.append('fileName', fileName);
    params = params.append('loggedInUser', loggedInUser);
     return this.httpClient.delete(deleteBrdDocumentUrl,{params: params});
  }

  getBrdDocument(clientName :string, fileName:string,loggedInUser:string): Observable<any>{
    let params = new HttpParams();
    params = params.append('clientName', clientName);
    params = params.append('fileName', fileName);
    params = params.append('loggedInUser', loggedInUser);
    return this.httpClient.get(getBrdDocumentUrl,{params: params});
 }


 downloadDocument(id:string){
  const httpOptions = {
    responseType: 'blob' as 'json',
    headers: new HttpHeaders({
      Accept : 'application/pdf',
      observe : 'response'
    })
  };
   return this.httpClient.get(`${downloadDocumentUrl}/${id}`,httpOptions);
 }

}


