import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /**
   * Título da app
   * @type string
   * @property
   */
  title: string = 'Alurapic';

  /**
   * @param router 
   * @param route 
   * @param titleService 
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
  }

  /**
   * 
   */
  ngOnInit(): void {
    /**********************************************************************
     * Define o título da página de acordo com o "title" da rota ativa
     **********************************************************************/
    /**
     * Todos os Observáveis de eventos
     */
    this.router.events
    /**
     * Transforma os eventos Observáveis em um específico: "NavigationEnd" 
     * (rota termina com sucesso)
     */  
    .pipe(filter(event => event instanceof NavigationEnd))
    /**
     * Transforma o Observável do tipo "NavigationEnd" 
     * em um Obseverável "activetedRoute"
     */
    .pipe(map(() => this.activatedRoute))
    /**
     * Transforma o Observável "activatedRoute"
     * e pega a última delas
     */
    .pipe(map(route => {
      /** Navega na hierarquia */
      while(route.firstChild) { 
        route = route.firstChild; 
      }
      return route;
    }))
    /**
     * Pára de ouvir o Observável, e transforma em Observável 
     * contendo a rota achada  
     */
    .pipe(switchMap(route => route.data))
    /**
     * Inscreva-se no Observável contendo os dados da rota achada, 
     * definindo o título da pagina de acordo com o que havíamos 
     * definido na propriedade "title" em: 
     *    @see src\app\app.routing.module.ts  
     *    @see src\app\home\home.routing.module.ts
     */
    .subscribe(data => this.titleService.setTitle(data.title ? data.title : this.title));
  }
}
