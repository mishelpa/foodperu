import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { from } from 'rxjs';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { SignSocialComponent } from './components/sign-social/sign-social.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { AppRoutingModule } from './app-routing.module';

Amplify.configure(awsmobile);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignSocialComponent,
    ResetPasswordComponent,
    PageLoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DialogModule,
    BrowserAnimationsModule,
    AppRoutingModule
    // Ng4LoadingSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
