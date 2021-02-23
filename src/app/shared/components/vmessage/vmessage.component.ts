import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ap-vmessage',
  templateUrl: './vmessage.component.html',
  styleUrls: ['./vmessage.component.scss']
})
export class VmessageComponent implements OnInit {

  /**
   * Inbound 
   * @property string
   */
  @Input() text : string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
