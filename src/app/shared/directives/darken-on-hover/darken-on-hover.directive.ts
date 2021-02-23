import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

  @Input() brightness = '70%';

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) {}

  /**
   * Responde ao evento mouseouver do this.el
   */
  @HostListener('mouseover')
  darkenOn() {
    this.render.setStyle(this.el.nativeElement,'filter',`brightness(${this.brightness})`);
  }

  /**
   * Responde ao evento mouseleave do this.el
   */
  @HostListener('mouseleave')
  darkenOff() {
    this.render.setStyle(this.el.nativeElement,'filter','brightness(100%)');
  }  

}
