import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { __importDefault } from 'tslib';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit, OnChanges {

  @Input() photos : Photo[] = [];
  rows : any[]= [];

  /**
   * 
   */
  constructor() { }

  /**
   * Executa somente quando o componente é criado
   */
  ngOnInit(): void { }

  /**
   * Executa a cada mudança de propriedades do componente
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.photos) { // propriedade photos mudou?
      this.rows = this.groupColumns(this.photos);
    }
  }

  /**
   * Monta linhas com 3 colunas de photos
   * @param photos 
   */
  private groupColumns(photos : Photo[]) {
    const newRows: any[] = [];
    for(let index = 0; index < photos.length; index+=3) {
      newRows.push(photos.slice(index, index + 3));
    }
    return newRows; 
  }
}
