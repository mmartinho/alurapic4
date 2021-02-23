import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  /**
   * @property loading$ Referencia o Observável Subject do serviço
   */
  loading$!: Observable<string>;

  /**
   * @property loadingService Injetado
   */
  constructor(
    private loadingService: LoadingService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.loading$ = this.loadingService
      .getLoading()
      /** 
       * Mapeia para outro tipo.
       * Ao invés de enum, considere como string,
       * visto que precisamos de uma string no template
       */
      .pipe(map(loadingType => loadingType.valueOf()));
  }

}
