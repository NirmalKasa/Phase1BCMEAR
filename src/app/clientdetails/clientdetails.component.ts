import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientFields } from '../client/client.component';
import { ClientServices } from '../shared/client.service';
import { LocalStorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent implements OnInit {

  id: number
  clientInfo: ClientFields
  constructor(private route: ActivatedRoute, private clientService: ClientServices, private store: LocalStorageService,
    private _router : Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.displayClientInfo()
        //  console.log("selected index= "+this.id);
        //   this.clientInfo = this.clientService.getClientInfo(this.id);
        //   console.log(this.clientInfo);
      }
    )
  }

  displayClientInfo() {

    if (this.clientService.clientsList && this.clientService.clientsList.length > 0) {
      console.log("client list is not null");
      this.clientInfo = this.clientService.getClientInfo(this.id);
      console.log(this.clientInfo);
    }
    else {
      console.log("fetching client details");
      this.clientService.getClientDetails().subscribe(
        data => {
          console.log(data);
          this.clientService.clientsList = data;
          this.clientInfo = this.clientService.clientsList[this.id];
          console.log(this.clientInfo);
        },
        error => {
          console.log(error);
        }
      )
    }

    // sessionStorage.setItem('clientFields', JSON.stringify(this.clientInfo));
    this.store.setClientDetails(this.clientInfo)
    console.log(JSON.parse(this.store.getClientDetails()));
  }

  editClientDetails(){
    console.log(this.clientInfo._id);
    this._router.navigate(['/client', this.id]);
  }
}
