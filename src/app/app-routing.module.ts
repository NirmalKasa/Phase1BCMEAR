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
import { AuthGuard} from './auth.guard'



const routes: Routes = [
  { path: '', component: LogInComponent,pathMatch: 'full'},
  { path: 'maindashboard', component: MaindashboardComponent,canActivate: [AuthGuard]  },
  { path: 'folder', component: FolderComponent,resolve: { clntsInfo: FolderResolverService },canActivate: [AuthGuard] },
  { path: 'client', component: ClientComponent,canActivate: [AuthGuard]},
  { path: 'docrepo', component: DashboardComponent,canActivate: [AuthGuard]},
  { path: 'project', component: ProjectComponent,canActivate: [AuthGuard]},
  { path : 'document', component : DocumentComponent,canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard]},
  { path: 'changepwd' , component: ChangepwdComponent,canActivate: [AuthGuard]},
  { path: 'forgotpwd', component : ForgotpwdComponent,canActivate: [AuthGuard]},
  {path: 'brd', component : BrdComponent,canActivate: [AuthGuard]},
  {path: 'fsd', component : FsdComponent,canActivate: [AuthGuard]},
  {path: 'tsd', component : TsdComponent,canActivate: [AuthGuard]},
  {path: 'rtm', component : RtmComponent,canActivate: [AuthGuard]},
  {path: 'test', component : TestComponent,canActivate: [AuthGuard]},
  {path : 'preview', component : PreviewComponent,canActivate: [AuthGuard]},
  { path: 'readme', component:ReadmeComponent,canActivate: [AuthGuard]},
  {path :'brddocs', component:BrdDocsComponent,canActivate: [AuthGuard]},
  {path:'fsddocs', component:FsdDocsComponent,canActivate: [AuthGuard]},
  {path:'tsddocs', component:TsdDocsComponent,canActivate: [AuthGuard]},
  {path:'rtmdocs', component:RtmDocsComponent,canActivate: [AuthGuard]},
  {path:'testdocs', component:TestDocsComponent,canActivate: [AuthGuard]},
  {path:'forgotpwd', component:ForgotpwdComponent,canActivate: [AuthGuard]},
  {path:'clientdetails/:id', component:ClientdetailsComponent, resolve : {clientInfo : ClientDetailResolver},canActivate: [AuthGuard]},
  { path: 'client/:id', component: ClientComponent,canActivate: [AuthGuard]},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
