import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';
import { Photo } from '../../photo/photo';

@Directive({
  selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

  /**
   * Inbound
   * @property
   */
  @Input() ownedPhoto! : Photo;
  
  /**
   * @property element
   * @property renderer 
   */
  constructor(
    private element : ElementRef<any>,
    private renderer: Renderer2,
    private userService: UserService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.userService
      .getUser()
      .subscribe(user => {
        /** 
         * Note a condição de guarda para quando o usuário não 
         * for nulo: "!user || user.id". Isso evita exceção para
         * quando o usuário não está logado
         */
        if(!user || user.id != this.ownedPhoto.userId) {
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      });
  }

}
