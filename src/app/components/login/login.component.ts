import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInFlag: boolean = true;
  signUpFlag: boolean = false;
  toVerifyEmail: boolean = false;
  userName: string;
  userLastName: string;
  userEmail: string;
  displayVerificationModal: boolean  = false;
  displayVerificationSuccessModal: boolean = false;
  displayVerificationFailedModal: boolean = false;
  displayLoginFailedModal: boolean = false;

  

  constructor() {}



  ngOnInit(): void {
  }

  loginForm = new FormGroup ({
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    dni: new FormControl('')

})
  
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
    }


    Auth.signUp(user)
      .then(data => {
        console.log(data);
        // this.displayVerificationModal = true;
      })
      .catch(err => console.log(err));
  }


}
