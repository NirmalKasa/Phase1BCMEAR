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
import { HeaderLoginComponent } from './header-login/header-login.component';
import { BrdDocsComponent } from './brd-docs/brd-docs.component';
import { TrdDocsComponent } from './trd-docs/trd-docs.component';
import { FsdDocsComponent } from './fsd-docs/fsd-docs.component';
import { TsdDocsComponent } from './tsd-docs/tsd-docs.component';
import { RtmDocsComponent } from './rtm-docs/rtm-docs.component';
import { TestDocsComponent } from './test-docs/test-docs.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HeaderComponent,
    FolderComponent,
    ClientComponent,
    DashboardComponent,
    ProjectComponent,
    DocumentComponent,
    SignupComponent,
    ChangepwdComponent,
    ForgotpwdComponent,
    BrdComponent,
    FsdComponent,
    TsdComponent,
    RtmComponent,
    TestComponent,
    PreviewComponent,
    ReadmeComponent,
    HeaderLoginComponent,
    BrdDocsComponent,
    TrdDocsComponent,
    FsdDocsComponent,
    TsdDocsComponent,
    RtmDocsComponent,
    TestDocsComponent,
    ForgotPwdComponent
    
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
