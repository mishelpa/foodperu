import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { SignSocialComponent } from './components/sign-social/sign-social.component';

Amplify.configure(awsmobile);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignSocialComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AmplifyUIAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
