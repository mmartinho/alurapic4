import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { NewUser } from './new-user';

const API = environment.ApiUrl;

/** 
 * Removido o { providedIn: 'root' }, e provedor 
 * colocado para o módulo inteiro:
 * @see src\app\home\home.module.ts 
 */
@Injectable()
export class SignupService {

    /**
     * @property http Injetado
     */
    constructor(
        private http: HttpClient,
    ) {} 

    /**
     * "Observável" para verificar no backend se nome de 
     * usuário já está em uso
     * @param userName 
     */
    checkUserNameTaken(userName : string) {
        return this.http.get(API + '/user/exists/' + userName);
    }

    /**
     * "Observável" para criar um novo usuário no backend
     * @param newUser 
     */
    signup(newUser : NewUser) {
        return this.http.post(API + '/user/signup', newUser);
    }
}