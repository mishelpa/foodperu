import { Injectable } from '@angular/core';
import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { Hub, ICredentials } from '@aws-amplify/core';
import { Subject, Observable} from 'rxjs';
import { CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    Hub.listen('auth', (data) => {
      const { channel, payload } = data;
      if (channel === 'auth') {
        this.authState.next(payload.event);
      }
    });
  }
  public static Google = CognitoHostedUIIdentityProvider.Google;
  public static Facebook = CognitoHostedUIIdentityProvider.Facebook;

  loggedIn: boolean;
  private authState: Subject<CognitoUser|any> = new Subject<CognitoUser|any>();
  authStateOb: Observable<CognitoUser|any> = this.authState.asObservable();
  public signIn = 'signIn';
  public signOut = 'signOut';

  signOutMethod(): Promise<any> {
    return Auth.signOut()
    .then(() => this.loggedIn = false);
  }

  socialSignIn(provider: CognitoHostedUIIdentityProvider): Promise<ICredentials> {
    return Auth.federatedSignIn({
      'provider': provider
    });
  }
}
