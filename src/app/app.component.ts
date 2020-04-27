import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAR';

  totalUrl = new Map();
  currentMappingUrls = new Map();
  currentOrderMappingUrls = new Map();

  constructor(private router: Router) {
    this.totalUrlMapping();
    this.projectDirectoryNavigation(this.router);
  }

  totalUrlMapping(): void {
    this.totalUrl.set(0, ["/folder", "DashBoard"]);
    this.totalUrl.set(1, ["/client", "Client Information"]);
    this.totalUrl.set(2, ["/project", "Project Details"]);
    this.totalUrl.set(3, ["/brd", "Business Requirement"]);
    this.totalUrl.set(4, ["/preview", "Document Preview"]);

  }

  projectDirectoryNavigation(router: Router) {
    let entry: any;
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/') {
          console.log(event);
          this.currentMappingUrls.clear();
          for (entry of this.totalUrl.entries()) {

            if (event.url == entry[1][0]) {
              this.currentMappingUrls.set(entry[0], this.totalUrl.get(entry[0]));
            }

          }


        }

        if (this.currentMappingUrls.size > 0) {
          this.currentOrderMappingUrls.clear();
          for (let newEntry of this.totalUrl.entries()) {
            if (event.url == newEntry[1][0]) {
              this.currentOrderMappingUrls.set(newEntry[0], this.totalUrl.get(newEntry[0]));
              break;
            }
            this.currentOrderMappingUrls.set(newEntry[0], this.totalUrl.get(newEntry[0]));
          }
          console.log(this.currentOrderMappingUrls);

        }else{
          this.currentOrderMappingUrls.clear();
          if (event.url !== '/') {
          this.currentOrderMappingUrls.set(0, this.totalUrl.get(0));
          }
        }
      

      }
    })
  }
}
