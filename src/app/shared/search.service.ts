import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { ClientFields } from '../client/client.component';
import { BrdFields } from '../brd/brd.component';





const clientSearchCriteriaURL = 'http://localhost:8081/clientdetails/search/';
const documentsSearchCriteriaURL = 'http://localhost:8081/brd-docs/search/';
@Injectable({ providedIn: "root" })
export class SearchService {
    clientsList: ClientFields[]
    brdDocs: BrdFields[];

    constructor(private http: HttpClient) {
    }

    public retrieveSearchResults(searchCriteriaStr: String): Observable<ClientFields[]> {
        let paramURL = clientSearchCriteriaURL + searchCriteriaStr;
        return this.http.get<ClientFields[]>(paramURL);
    }

    public retrieveDocumentSearchResults(searchCriteriaStr: String, clientName : string, loggedInUserName : string): Observable<any> {
        let paramURL = documentsSearchCriteriaURL + searchCriteriaStr;
        let params = new HttpParams();
        params = params.append('clientName', clientName);
        params = params.append('loggedInUserName', loggedInUserName);
        return this.http.get<any>(paramURL,{params : params});
    }

}