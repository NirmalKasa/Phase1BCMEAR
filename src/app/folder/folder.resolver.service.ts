import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { empty } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ClientServices } from '../shared/client.service';

@Injectable({providedIn: 'root'})
export class FolderResolverService implements Resolve<any>{
  constructor(private clientsService : ClientServices){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("in resolver")

  }
}
