import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-social',
  templateUrl: './sign-social.component.html',
  styleUrls: ['./sign-social.component.scss']
})
export class SignSocialComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async signInGoogle() {
    console.log(AuthService.Google);
    const socialResult = await this.authService.socialSignIn(AuthService.Google);
    console.log('googleResult:', socialResult);
  }

  async signInFacebook() {
    const socialResult = await this.authService.socialSignIn(AuthService.Facebook);
    console.log('facebookResult:', socialResult);
  }
}
