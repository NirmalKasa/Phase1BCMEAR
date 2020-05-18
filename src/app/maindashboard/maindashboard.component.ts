import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientServices } from '../shared/client.service';
import { ClientFields } from '../client/client.component';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/localstorage.service';
import { Subscription } from 'rxjs';
import { FolderComponent } from '../folder/folder.component';
import { ClientinteractorService } from '../shared/clientinteractor.service';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit, OnDestroy {
  listItems = ['BRD', 'FSD', 'Template', 'FRD']
  clientsList: ClientFields[]
  subscription: any
  subscribe : Subscription
  isLoading: boolean;
  constructor(private clientServices: ClientServices, private route: Router, private router: ActivatedRoute,
    private localStorageService: LocalStorageService, private clientInterator : ClientinteractorService) { }

  ngOnInit() {
    this.isLoading = true;
    // this.clientsList = this.router.snapshot.data['clientsList']
    this.subscription = setInterval(() => {
      this.fetchClientListDetails();
    }, 1000)

    this.subscribe = this.clientInterator.updateClientSub
      .subscribe(
        (clientsList: ClientFields[]) => {
          this.clientsList = clientsList;
        }
      )
  }
  doNavigate(routeurl: string, index: number) {
    console.log("client index=" + index);
    this.localStorageService.setClientDetails(this.clientsList[index]);
    this.route.navigate(['/' + routeurl]);
  }

  fetchClientListDetails() {
    this.clientsList = this.clientServices.clientsList
    this.isLoading = false;

    this.clearSubscription();
  }

  clearSubscription() {
    clearInterval(this.subscription);
    console.log("cleared interval subscription");
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }
}
