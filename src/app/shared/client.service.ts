import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ClientFields } from '../client/client.component';
import { environment } from '../../environments/environment'

const clientSaveUrl=  environment.apiUrl+'/clientdetails/save-client';
const clientFetchUrl= environment.apiUrl+'/clientdetails/';
const getClientByUserNameUrl= environment.apiUrl+'/clientdetails/getClients/';


@Injectable({providedIn:'root'})
export class ClientServices {

  clientsList : ClientFields[]

  constructor(private http: HttpClient){
    console.log("Current API URL:", environment.apiUrl);
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
    let paramURL = getClientByUserNameUrl + userName;
   return this.http.get<ClientFields[]>(paramURL);
  }
}
