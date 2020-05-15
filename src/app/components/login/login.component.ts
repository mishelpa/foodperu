import { Component, OnInit } from '@angular/core';
import { Auth, Hub } from 'aws-amplify';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {



  constructor() {}
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

  loginForm = new FormGroup ({
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dni: new FormControl('')

});



  ngOnInit(): void {
  }

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

  const user = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password,

      attributes: {
          name:  this.loginForm.value.name,
          email: this.loginForm.value.email,
          // dni: this.loginForm.value.dni,
          // lastName:  this.loginForm.value.lastName
      }
    };


  Auth.signUp(user)
      .then(data => {
        console.log(data);
        // this.displayVerificationModal = true;
      })
      .catch(err => console.log(err));
  }

}
