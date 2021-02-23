import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * 
   */
  hasToken() : boolean {
    return !!this.getToken();
  }

  /**
   * 
   * @param token 
   */
  setToken(token : any) : void {
    window.localStorage.setItem(KEY, token);
  }

  /**
   * 
   */
  getToken(): any {
    return window.localStorage.getItem(KEY);
  }

  /**
   * 
   */
  removeToken() : void {
    window.localStorage.removeItem(KEY);
  }
}
