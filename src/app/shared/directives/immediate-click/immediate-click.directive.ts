import { Directive, ElementRef, OnInit } from '@angular/core';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
  selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

  /**
   * @property element 
   */
  constructor(
    private element: ElementRef<any>,
    private platFormDetector: PlatformDetectorService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.platFormDetector.isPlatformBrowser()) { 
      this.element.nativeElement.click();
    }   
  }

}
