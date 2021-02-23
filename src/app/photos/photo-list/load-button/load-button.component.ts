import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.scss']
})
export class LoadButtonComponent implements OnInit {

  /**
   * Inbound property
   */
  @Input() hasMore: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
