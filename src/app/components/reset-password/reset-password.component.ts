import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder,  ValidatorFn, AbstractControl } from '@angular/forms';
import { Auth } from 'aws-amplify';
import { group } from '@angular/animations';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
   newPassword = false;
   restorePassword = true;
  errorMessage = '';
  userEmail ='';



  constructor(private fb:FormBuilder,) { }

  emailReset = new FormControl();
 

  resetField() {
    this.emailReset.reset();
    this.errorMessage = '';
  }
  restorePasswordForm = new FormGroup({
    email: new FormControl('')
  })

  // matchingPasswords(passwordKey: string, confirmPasswordKey: string){
  //   return (group: FormGroup):{[key:string]:any}=>{
  //     let password = group.controls[passwordKey];
  //     let confirmPassword = group.controls[confirmPasswordKey];
    
  //     if(password.value !== confirmPassword.value){
  //       return{
  //         mismatchedPasswords: true
  //       }
  //     }
  //   }
  //     }

   passwordForm = new FormGroup({
     code: new FormControl('', [Validators.required]),
   password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    passwordRepeat: new FormControl('',[Validators.required,Validators.minLength(8)])
   }
  //  ,{validators: this.matchingPasswords(' password','passwordRepeat')}
   )


  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      code: ['', [Validators.required]],
        password: ['', Validators.required],
        passwordRepeat: ['', Validators.required]
    });
  }

  sendPasswordCode(value){
    this.restorePassword = false
    Auth.forgotPassword(value)
    .then((data) => {
      console.log(data);
      
      this.newPassword =true;
    })
    .catch(err => {
      this.emailReset.reset();
      this.errorMessage = 'El correo electrónico es incorrecto';
      
      
      });
  }

  verifyPassword(value){
    console.log(value);
    this.userEmail = this.emailReset.value;
console.log(this.userEmail,value.code,value.password);


         Auth.forgotPasswordSubmit(this.userEmail,value.code,value.password)

         .then(data=> console.log(data+'entro')
        
         )
       }

}
