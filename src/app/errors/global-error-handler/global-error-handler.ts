import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as StackTrace from 'stacktrace-js';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    /**
     * OBS: Não é interessante injetarmos artefatos no constructor do nosso 
     * Global Errorhandler, pois o angular primeiro criará instâncias dessas 
     * dependências para depois injetá-las e, se algum erro acontecer 
     * durante a injeção nosso ErrorHandler não será capaz de tratá-lo.
     * Nesse sentido, o ideal é injetar os artefatos no método, usando o
     * mecanismo de injeção "Injector"
     * 
     * Injetado
     * @property injector Mecanismo que realiza a injeção via qualquer método
     */
    constructor(
        private injector: Injector
    ) {}

    /**
     * @param error 
     */
    handleError(error: any): void {
        console.log('Passei pelo handler');
        
        /** Mensagem de erro */
        const message = error.message ? error.message : error.toString();
        
        /** **************** URL que estava no navegador ************************* */
        /** @injected */
        const location = this.injector.get(LocationStrategy);
        const url = location instanceof PathLocationStrategy ? location.path() : '';

        /** ********** Usuário que estava logado *********** */
        /** @injected */
        const userService = this.injector.get(UserService);
        const userName = userService.getUserName();
        
        /** ************ Serviço backend de Log ******************* */
        /** @injected */
        const serverLogService = this.injector.get(ServerLogService);

        /** *********** Router **************** */
        /** @injected */
        const router = this.injector.get(Router);
        /** Só redireciona se for produção */
        if(environment.production) { 
            router.navigate(['/error']);
        }
        
        StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stack = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');
                console.log(message);
                console.log(stack);
                serverLogService
                    .log({message, url, userName, stack})
                    .subscribe(
                        () => {
                            console.log({ message, url, userName, stack});
                            console.log('...logged to server '+environment.LogUrl);
                        }, 
                        err => {
                            console.log('Coud not log the problem to '+environment.LogUrl);
                            console.log(err);
                        }
                    );
            });
    }
    
}