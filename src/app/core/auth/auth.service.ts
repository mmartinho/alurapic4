import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

const API = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * 
   * @param http HttpClient
   */
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  /**
   * Realiza a autenticação usando a API 
   * fornecida pelo backend
   * 
   * @param userName 
   * @param password 
   */
  authenticate(userName: string, password : string) : Observable<Object> {
    return this.http
      .post(
          API + '/user/login',
          /**
           * Forma reduzida de:
           * userName: userName
           * password: password 
           */
          { userName, password },
          /**
           * Expõe a resposta
           * @param
           */
          { observe: 'response' }
      )
      .pipe(tap(res => {
          /** 
           * Pega o token temporário de utilização da API 
           * para esse usuário 
           */
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken); 
          //console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }
}
