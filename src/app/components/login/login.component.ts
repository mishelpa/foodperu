import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import {AuthUserService} from 'src/app/services/auth-user.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    // public ng4LoadingSpinnerService :Ng4LoadingSpinnerService
    public authUser: AuthUserService
  ) {}

  signInFlag = true;
  signUpFlag = false;
  toVerifyEmail = false;
  userName: string;
  userLastName: string;
  userEmail: string;
  displayVerificationModal  = false;
  displayVerificationSuccessModal = false;
  displayVerificationFailedModal = false;
  displayLoginFailedModal = false;
  user: any;

  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl ('', Validators.required)
  });

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    dni: new FormControl('', [ Validators.minLength(8), Validators.maxLength(8)])

});

verifyEmailForm = new FormGroup({
  verifyEmail: new FormControl('', [Validators.required, Validators.minLength(5)])
});

showLogInView() {
    this.signInFlag = true;
    this.signUpFlag = false;
  }

  showRegisterView() {
    this.signInFlag = false;
    this.signUpFlag = true;
  }


  singUpToAWS(value) {
  console.log(value);
  this.userEmail = this.registerForm.value.email;
  const user = {
      username: this.registerForm.value.email,
      password: this.registerForm.value.password,

      attributes: {
          name:  this.registerForm.value.name,
          email: this.registerForm.value.email,
          // dni: this.registerForm.value.dni,
          // lastName:  this.registerForm.value.lastName
      }
    };


  Auth.signUp(user)
      .then(data => {
        console.log(data);
        this.displayVerificationModal = true;
      })
      .catch(err => console.log(err));
  }

  signInToAWS(value) {
    console.log(value + 'aqui');
    // e.preventDefault();
    // this.ng4LoadingSpinnerService.show();
    const authInfo = {
      username: this.loginForm.value.emailLogin,
      password: this.loginForm.value.passwordLogin
    };

    Auth.signIn(authInfo).then(user => {
      console.log(authInfo);

      console.log(user);
    //   console.log(user['attributes'].name);

      this.userName = user.attributes.name;
      this.authUser.storeSessionUserName(this.userName);
      //  this._router.navigate(['/home'])
    });
    //   .catch(err => {
    //     this._ng4LoadingSpinnerService.hide();
    //     this.displayLoginFailedModal = true;
    //     console.log(err)
    //   }
    // );
  }


  closeVerificationModal() {
    this.displayVerificationModal = false;
    this.toVerifyEmail = true;
    this.signInFlag = false;
    this.signUpFlag = false;
  }

  closeVerificationSuccessModal() {
    this.displayVerificationSuccessModal = false;
    this.toVerifyEmail = false;
    this.signInFlag = true;
    this.signUpFlag = false;
  }

  closeVerificationFailedModal() {
    this.displayVerificationFailedModal = false;
  }

  onVerify(verifycode) {
   console.log(verifycode, this.userEmail);

   Auth.confirmSignUp(this.userEmail, verifycode.verifyEmail, {
      forceAliasCreation: true
      }).then(data => {
        console.log(data);
        this.displayVerificationSuccessModal = true;
      })
        .catch(err => {
          this.displayVerificationFailedModal = true;
          console.log(err);
        }
      );
  }

  closeLoginFailedModal() {
    this.displayLoginFailedModal = false;
  }




}
