import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root'})
export class LoadingInterceptor implements HttpInterceptor {

  /**
   * @property loadingService 
   */
  constructor(
    private loadingService : LoadingService
  ) {}

  /**
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      /**
       * Pega a handle (observavél) e chama o 
       * start/stop do serviço do componente loading
       */
      .pipe(tap(event => {
        if(event instanceof HttpResponse) {
          this.loadingService.stop();
        } else {
          this.loadingService.start();
        }
      }));
  }
}
