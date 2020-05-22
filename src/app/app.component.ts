import { Component } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { IBreadCrum } from './ibread-crum';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EAR';
  previous: String;
  public breadcrumbs: IBreadCrum[]

  totalUrl = new Map();

  currentOrderMappingUrls = new Map();

  constructor(public router: Router,private route: ActivatedRoute) {
    this.totalUrlMapping();
    this.projectDirectoryNavigation(this.router, this.route);
    this.breadcrumbs = this.buildBreadCrumb(this.route.root);
  }
  ngOnInit(){
    this.router.events.pipe(filter((event:Event) => event instanceof NavigationEnd),
    distinctUntilChanged(),
  ).subscribe(() => {
    this.breadcrumbs = this.buildBreadCrumb(this.route.root);
    
  })
  console.log(this.breadcrumbs);
  }



  totalUrlMapping(): void {
    this.totalUrl.set(0, ["/folder", "Dashboard"]);
    this.totalUrl.set(1, ["/client", "Client Information"]);
    this.totalUrl.set(2, ["/project", "Project Details"]);
    this.totalUrl.set(3, ["/brd", "Business Requirement"]);
    this.totalUrl.set(4, ["/preview", "Document Preview"]);
  }
  public routesList = [

    {
      path: '',
      component: 'LogInComponent',
    },
    {
      path: 'folder',
      component: 'FolderComponent',
      data: {
        breadcrumb: 'Dashboard',
      },
      children: [
        {
          path: 'client',
          component: 'ClientComponent',
          data: {
            breadcrumb: 'Client Information',
          },
          children: [
            {
              path: 'project',
              component: 'ProjectComponent',
              data: {
                breadcrumb: 'ProjectComponent',
              },
            }
            ]
         
        },
        {
          path: 'clientdetails/:id',
          component: 'ClientdetailsComponent',
          data: {
            breadcrumb: 'Client Details',
          },
        },
        {
          path: 'docrepo',
          component: 'DashboardComponent',
          data: {
            breadcrumb: 'Document Repository',
          },
        }
  
  
      ]
  
    }
  ]


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
  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadCrum[] = []): IBreadCrum[] {
    console.log(breadcrumbs);
   
    
    //If no routeConfig is avalailable we are on the root path
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let isClickable = route.routeConfig && route.routeConfig.data && route.routeConfig.data.isClickable;
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
  
    // If the route is dynamic route such as ':id', remove it
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
  
    //In the routeConfig the complete path is not available,
    //so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;
  
    const breadcrumb: IBreadCrum = {
        label: label,
        url: nextUrl,
    };
    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {
        //If we are not on our current path yet,
        //there will be more children to look after, to build our breadcumb
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}


