import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { SignupService } from './signup.service';

/** 
 * Removido o { providedIn: 'root' }, e modificado o dependente:
 * @see src\app\home\signup\signup.component.ts  
 */
@Injectable() 
export class UserNotTakenValidatorService {

    /**
     * @property signupService 
     */
    constructor(
        private signupService: SignupService
    ) {}

    /**
     * Verifica se nome de usuário já está sendo usado no backend
     * @returns Uma função de validação SEMELHANTE ao que foi feito 
     *          em src\app\shared\validators\lower-case.validator.ts
     */
    checkUserNameTaken() {
        return (control: AbstractControl) => {
            return control.valueChanges // é um Observável com emissão a cada mudança no "control"
                /** 
                 * Transforma a emissão do Observável "a cada mudança" 
                 * em "a cada 300ms" 
                 */ 
                .pipe(debounceTime(300)) 
                /** 
                 * Pipe switchMap: "Troque para novo Observável"
                 * Transforma de "valueChanges" para um NOVO Observável 
                 * definido na função checkUserNameTaken(), onde este é 
                 * inscrito no lugar, substituindo a inscrição anterior.
                 */
                .pipe(switchMap(userName => { 
                    return this.signupService.checkUserNameTaken(userName);
                }))
                /**
                 * Transforma o booleano do Observável anterior
                 * em outro Observável que com um Obj ou null 
                 */
                .pipe(map(isTaken => isTaken ? { usernametaken: true} : null))
                /**
                 * Transforma o Observável anterior para considerar apenas a 
                 * primeira emissão (ou a primeira que satisfaça alguma função 
                 * condicional, se essa existir. No caso, não existe) 
                 */
                .pipe(first());
        }
    }
}