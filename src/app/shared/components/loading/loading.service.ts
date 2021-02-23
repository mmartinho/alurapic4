import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { LoadingType } from './loading-type';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /**
   * Tipo especial de Observável que permite que valores 
   * de "LoadingType" sejam difundidos para outro(s) 
   * Observável(is) inscritos
   * @property 
   */
  loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

  constructor(
  ) { }

  /**
   * Acesso à propriedade para inscrição neste observável,
   * na qual, na inscrição inicial dispara a difusão para 
   * todos os inscritos o valor tipo "STOPPED"
   */
  getLoading() {
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  /**
   * Difunde para todos os inscritos o valor tipo "Loading"
   */
  start() {
    this.loadingSubject.next(LoadingType.LOADING);
  }

  /**
   * Difunde para todos os inscritos o valor tipo "Stopped"
   */
  stop() {
    this.loadingSubject.next(LoadingType.STOPPED);
  }

}
