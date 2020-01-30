import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { FolderComponent } from './folder/folder.component';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ProjectComponent } from './project/project.component';
import { DocumentComponent } from './document/document.component';;


const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'folder', component: FolderComponent },
  { path: 'client', component: ClientComponent},
  { path: 'docrepo', component: DashboardComponent},
  { path: 'project', component: ProjectComponent},
  { path : 'document', component : DocumentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
