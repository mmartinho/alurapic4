import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string = '';

  /**
   * @proprerty element 
   * @property renderer 
   * @property userService 
   */
  constructor(
    private element : ElementRef<any>,
    private renderer : Renderer2,
    private userService : UserService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    /** Salva o display 1x, ao carregar a diretiva */
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    /** 
     * Toda vez que tiver um "emit" do "userService"
     * teremos esse callback "ouvindo", o qual recebe 
     * o objeto "user", que pode ser nulo ou não... 
     */
    this.userService.getUser().subscribe(user => {
      /** Não sendo nulo, tem usuário logado... */
      if(user) {
        /** ...define o estilo do display do elemento anexado à diretiva  */
        this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);    
      /** Sendo nulo, não tem usuário logado... */
      } else {
        /** ...define o estilo do display do elemento anexado à diretiva como "none" (invisível) */
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');  
      }
    });
  }

}
