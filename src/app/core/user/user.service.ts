import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * O BehaviorSubject armazena a última emissão 
   * até que alguém apare para consumi-la
   * @property
   */
  private userSubject = new BehaviorSubject<User | null>(null);
  /**
   * @property
   */
  private userName : string = '';

  constructor(private tokenService: TokenService) { 
    /**
     * Verifica se já foi salvo um token o localStorage
     */
    if(this.tokenService.hasToken()) {
      this.decodeAndNotify(); 
    }
  }

  /**
   * Armazena o token no localStorage, decodifica
   * e notifica os Observavéis inscritos
   * @param token
   */
  setToken(token: any) : void {
    this.tokenService.setToken(token); 
    this.decodeAndNotify();
  }

  /**
   * Retorna um Observável de usuário
   */
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  /**
   * Decodifica o token armazenado no localStorage
   * e envia multicast para todos os Observáveis que 
   * se inscreveram  
   */ 
  private decodeAndNotify() : void {
    const token = this.tokenService.getToken();
    const user = jwtDecode(token) as User;
    this.userName = user.name;
    this.userSubject.next(user);
  }

  /**
   * 
   */
  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  /**
   * 
   */
  isLogged() : boolean {
    return this.tokenService.hasToken();
  }

  /**
   * 
   */
  getUserName() {
    return this.userName;
  }
}
