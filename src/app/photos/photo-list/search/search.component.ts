import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'ap-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy { 
  /**
   * Evento CUSTOMIZADO
   * Usado para receber os dados vindos do componente 
   * "pai" photo-list 
   * @see this.ngOnInit()
   * @see src\app\photos\photo-list\photo-list.component.html
   * @property
   */
  @Output() onTyping = new EventEmitter<string>();

  /**
   * Pode ser alterada no template que usa o componente
   * @property
   */
  @Input() value: string = '';

  /**
   * Padrão de Projeto "debounce"
   * Subject é um tipo de Observavel que permite que um valor
   * seja difundido para vários "Observables"
   * @property Subject<string>
   */
  debounce: Subject<string> = new Subject<string>();

  constructor() { }

  ngOnInit(): void {
    /**
     * Usando observável Subject, definimos a função a ser executada
     * a cada 300 ms (debounceTime) quando o next (@see onKeyUp) for 
     * chamado  
     */
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.onTyping.emit(filter)); 
  }  

  /**
   * Implementação da função do Ciclo de vida do componente.
   * Ocorre antes do componente chegar ao final do seu ciclo de vida
   * @implements
   */
  ngOnDestroy(): void {
    /** Termina o que foi subscrito no observável Subject */
    this.debounce.unsubscribe();
  }  

  /**
   * Responde à interação do usuário no teclado no input "search" 
   * definido no template
   * @param input 
   */
  onKeyUp(target : any) {
    if(target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      /**
       * Ao invés de passar o valor diretamente para o filtro...
       *    this.filter = elemento.value;
       * ...difundimos um valor usando o observável "Subject"
       * Isso inicia o
       */
      this.debounce.next(elemento.value);
    }
  }  
}
