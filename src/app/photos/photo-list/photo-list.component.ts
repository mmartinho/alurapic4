import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  /** 
   * Componente de escopo de página
   * selector: 'ap-photo-list', 
   */
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  /**
   * Filtro que atua nos objetos de fotos
   * @property string
   */
  filter : string = ''; 
  /**
   * Objetos de foto passados para o gabarito do componente
   * @property Photo[] 
   */
  photos : Photo[] = [];
  /**
   * Se existem outras páginas de fotos
   * @property boolean
   */
  hasMore : boolean = false;
  /**
   * Página atual das fotos
   * @property number
   */
  currentPage: number = 1;
  /**
   * De que usuário estamos acessando as fotos
   * @property
   */
  userName: string = '';

  /**
   * "Clama" por um "provider" que é injetado ao criar o componente.
   * @param activatedRoute Injetado pelo módulo AppRoutingModule da app principal
   */
  constructor(
    private activatedRoute : ActivatedRoute,
    private photoService : PhotoService
  ) {}
  
  /**
   * Implementação da função do Ciclo de vida do componente.
   * Ocorre depois da instanciação do componente e de receber os valores
   * das "inboud properties"
   * @implements
   */
  ngOnInit() : void {
    /**
     * Visto que o componente só é iniciado apenas uma vez, definimos um
     * Event handler para quando a activated route mudar algum parametro 
     * (no caso, o nome do usuário)
     */
    this.activatedRoute.params.subscribe(params => { 
      this.userName = params.userName;
      this.photos = this.activatedRoute.snapshot.data.photos;
    });
  }

  /**
   * Responde à interação do usuário ao clicar o botão "Load more"
   * para carregar a próxima página de photos
   */
  load(){
    this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.filter = ''; // apaga o filter
        this.photos = this.photos.concat(photos);
        if(!photos.length) {
          this.hasMore = false;
        } else {
          this.hasMore = true;
        }
      });
  }
}
