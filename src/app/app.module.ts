import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { HeaderComponent } from './header/header.component';
import { FolderComponent } from './folder/folder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";


import { MatSliderModule,MatToolbarModule,MatSidenavModule,MatListModule,MatIconModule,MatRadioModule,MatCardModule, MatFormFieldModule, MatInputModule, MatFormFieldControl, } from '@angular/material';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { DocumentComponent } from './document/document.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    FolderComponent,
    ClientComponent,
    DashboardComponent,
    ProjectComponent,
    DocumentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
