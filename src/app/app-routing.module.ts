import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { FolderComponent } from './folder/folder.component';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProjectComponent } from './project/project.component';

import { SignupComponent } from './signup/signup.component';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { BrdComponent } from './brd/brd.component';
import { FsdComponent } from './fsd/fsd.component';
import { TsdComponent } from './tsd/tsd.component';
import { RtmComponent } from './rtm/rtm.component';
import { TestComponent } from './test/test.component';
import { PreviewComponent } from './preview/preview.component';
import { ReadmeComponent } from './readme/readme.component';
import { BrdDocsComponent } from './brd-docs/brd-docs.component';
import { FsdDocsComponent } from './fsd-docs/fsd-docs.component';
import { TsdDocsComponent } from './tsd-docs/tsd-docs.component';
import { RtmDocsComponent } from './rtm-docs/rtm-docs.component';
import { TestDocsComponent } from './test-docs/test-docs.component';
import { ClientdetailsComponent } from './clientdetails/clientdetails.component';
import { FolderResolverService } from './folder/folder.resolver.service';
import { ClientDetailResolver } from './clientdetails/clientdetails.resolver.service';
import { DocumentComponent } from './document/document.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';




const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'maindashboard', component: MaindashboardComponent },
  { path: 'folder', component: FolderComponent,resolve: { clntsInfo: FolderResolverService } },
  { path: 'client', component: ClientComponent},
  { path: 'docrepo', component: DashboardComponent},
  { path: 'project', component: ProjectComponent},
  { path : 'document', component : DocumentComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'changepwd' , component: ChangepwdComponent},
  { path: 'forgotpwd', component : ForgotpwdComponent},
  {path: 'brd', component : BrdComponent},
  {path: 'fsd', component : FsdComponent},
  {path: 'tsd', component : TsdComponent},
  {path: 'rtm', component : RtmComponent},
  {path: 'test', component : TestComponent},
  {path : 'preview', component : PreviewComponent},
  { path: 'readme', component:ReadmeComponent},
  {path :'brddocs', component:BrdDocsComponent},
  {path:'fsddocs', component:FsdDocsComponent},
  {path:'tsddocs', component:TsdDocsComponent},
  {path:'rtmdocs', component:RtmDocsComponent},
  {path:'testdocs', component:TestDocsComponent},
  {path:'forgotpwd', component:ForgotpwdComponent},
  {path:'clientdetails/:id', component:ClientdetailsComponent, resolve : {clientInfo : ClientDetailResolver}}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
