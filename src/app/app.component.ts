import { Component } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAR';
  previous: String;

  totalUrl = new Map();

  currentOrderMappingUrls = new Map();

  constructor(private router: Router, private route: ActivatedRoute) {
    this.totalUrlMapping();
    this.projectDirectoryNavigation(this.router, this.route);
  }

  totalUrlMapping(): void {
    this.totalUrl.set(0, ["/folder", "DashBoard"]);
    this.totalUrl.set(1, ["/client", "Client Information"]);
    this.totalUrl.set(2, ["/project", "Project Details"]);
    this.totalUrl.set(3, ["/brd", "Business Requirement"]);
    this.totalUrl.set(4, ["/preview", "Document Preview"]);
  }


  projectDirectoryNavigation(router: Router, route: ActivatedRoute) {
    let entry: any;
    let id: any;
    let isMatch: Boolean = false;

    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {

        this.totalUrlMapping();
        if (event.url == '/docrepo') {
          this.totalUrl.clear();
          this.totalUrl.set(0, ["/folder", "DashBoard"]);
          this.totalUrl.set(1, ["/docrepo", "Document Repository"]);
          this.SplitProjectDirectory(event, this.totalUrl)
        } else if (event.url.split("/", 2)[1] == 'clientdetails') {
          this.totalUrl.clear();
          this.totalUrl.set(0, ["/folder", "DashBoard"]);
          this.totalUrl.set(1, [event.url, "ClientDetails"]);
          this.SplitProjectDirectory(event, this.totalUrl)
        } else if (this.previous == '/docrepo' && (event.url == '/project' || event.url == '/preview')) {
          this.totalUrl.set(0, ["/folder", "DashBoard"]);
          this.totalUrl.set(1, ["/docrepo", "Document Repository"]);
          this.totalUrl.set(2, ["/project", "Project Details"]);
          this.totalUrl.set(3, ["/brd", "Business Requirement"]);
          this.totalUrl.set(4, ["/preview", "Document Preview"]);
          this.SplitProjectDirectory(event, this.totalUrl);
        } else if (this.previous == '/docrepo' && event.url == '/brd') {
          this.totalUrl.set(0, ["/folder", "DashBoard"]);
          this.totalUrl.set(1, ["/docrepo", "Document Repository"]);
          this.totalUrl.set(3, ["/brd", "Business Requirement"]);
          this.totalUrl.set(4, ["/preview", "Document Preview"]);
          this.SplitProjectDirectory(event, this.totalUrl);
        } else {
          isMatch = false;


          for (let newEntry of this.totalUrl.entries()) {
            if (event.url == newEntry[1][0]) {
              isMatch = true;
              break;
            }
          }
          if (!isMatch) {
            console.log(isMatch);
            if (event.url !== "/") {
              event.url = "/folder"
              this.totalUrl.set(0, ["/folder", "DashBoard"]);
            }

            this.SplitProjectDirectory(event, this.totalUrl)

          } else {
            this.totalUrlMapping();
            this.SplitProjectDirectory(event, this.totalUrl)

          }
        }

      }
    })
  }
  SplitProjectDirectory(event: any, totalMap: any): void {
    if (event.url.length > 1) {
      this.currentOrderMappingUrls.clear();
     
     
      
      for (let newEntry of totalMap.entries()) {
        if (event.url == newEntry[1][0]) {
          // this.currentOrderMappingUrls.set(newEntry[0], totalMap.get(newEntry[0]));
          if (newEntry[1][0] == '/docrepo') {
            this.previous = newEntry[1][0];
          }
          if (newEntry[1][0] == '/client') {
            this.previous = newEntry[1][0];
          }
          break;
        }
        if (newEntry[1][0] == '/docrepo') {
          this.previous = newEntry[1][0];
        }
        if (newEntry[1][0] == '/client') {
          this.previous = newEntry[1][0];
        }
        this.currentOrderMappingUrls.set(newEntry[0], totalMap.get(newEntry[0]));
      }
      console.log(this.currentOrderMappingUrls);

    } else {
      this.currentOrderMappingUrls.clear();
      if (event.url !== '/' && event.url.toString().length > 1) {
        this.currentOrderMappingUrls.set(0, totalMap.get(0));
      }
    }

  }

}
