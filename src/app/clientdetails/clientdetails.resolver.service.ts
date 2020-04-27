import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ClientFields } from '../client/client.component';
import { Injectable } from '@angular/core';


@Injectable({providedIn: "root"})
export class ClientDetailResolver implements Resolve<any> {

  clientData : ClientFields
  constructor (){

  }
  resolve(route : ActivatedRouteSnapshot, state:RouterStateSnapshot){
console.log("in ClientDetailResolver")
  //   if(this.clientService.clientsList && this.clientService.clientsList.length > 0){
  //     this.clientData = this.clientService.clientsList[+route.paramMap.get['id']];
  //     console.log(this.clientData);
  //     return this.clientData
  //   }
  //   else{
  //     console.log("in ClientDetailResolver fetch the list")
  //   }
  // }
  }
}
