import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  public storage: Storage = sessionStorage

  constructor() { }

  storeSessionUserName(userName: any){
this.storage.setItem('sesion un', userName);
  }
}
