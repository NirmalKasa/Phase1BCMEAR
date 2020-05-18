import { Injectable, EventEmitter } from '@angular/core';
import { ClientFields } from '../client/client.component';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientinteractorService {

  updateClientSub = new Subject<ClientFields[]>();

  constructor() { }

 sendupdatedClientList(ClientFields : ClientFields[]){
  this.updateClientSub.next(ClientFields);
 }

 clearList(){
   this.updateClientSub.next();
 }

 getUpdatedClientList(): Observable<any>{
    return this.updateClientSub.asObservable();
  }
}
