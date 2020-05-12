import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ClientFields } from '../client/client.component';

const clientSaveUrl= 'http://localhost:8081/clientdetails/save-client';
const clientFetchUrl= 'http://localhost:8081/clientdetails/';
const getClientByUnserNameUrl= 'http://localhost:8081/clientdetails/getClients/';

@Injectable({providedIn:'root'})
export class ClientServices {

  clientsList : ClientFields[]

  constructor(private http: HttpClient){

  }

  public saveClientDetails(clientfields: ClientFields){
    console.log(JSON.stringify({clientfields}));
    const headers = { 'Content-Type': 'application/json' }

   // const body ={"name":"Temenos"}
    this.http.post<ClientFields>(clientSaveUrl,
    JSON.stringify(clientfields), {headers}
     ).subscribe(data => {
       console.log(data);
      })
  }

   fetchClientDetails(){
   return this.http.get<ClientFields[]>(clientFetchUrl);
  }

  getClientDetails() : Observable<ClientFields[]>{
    return this.http.get<ClientFields[]>(clientFetchUrl);
  }

  getClientInfo(id: number){
   console.log("id "+id);
   console.log(this.clientsList);
    return this.clientsList[id];
  }

  public updateClientDetails(id  : String,clientfields: ClientFields){
    console.log(JSON.stringify({clientfields}));
    const headers = { 'Content-Type': 'application/json' }
    let paramURL = clientFetchUrl+id;
    console.log(paramURL + " const url");
    this.http.put<ClientFields>(paramURL,
      JSON.stringify(clientfields), {headers}
       ).subscribe(data => {
         console.log(data);
        })
  }

  public deleteClient(id: String){
    let paramURL = clientFetchUrl+id;
    console.log(paramURL + " const url");
    return this.http.delete(paramURL)
  }

  getClientByUserName(userName: String): Observable<ClientFields[]>{
    let paramURL = getClientByUnserNameUrl + userName;
   return this.http.get<ClientFields[]>(paramURL);
  }
}
