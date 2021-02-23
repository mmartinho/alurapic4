import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    /**
     * Injetada
     * @property tokenService 
     */
    constructor(
        private tokenService: TokenService
    ) {}

    /**
     * Inclui um cabeçalho em todas as requisições
     * http que a aplicação faz (p.ex as que são feitas ao backend)
     * @param req 
     * @param next 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            req = req.clone({
                setHeaders : {
                    'x-access-token' : token
                }
            });
        }
        return next.handle(req);
    }

}