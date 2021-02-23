import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  /**
   * Tem escopo de página 
   * selector: 'ap-photo-detail',*/
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {

  /**
   * @property 
   */
  photo$!: Observable<Photo>;

  /**
   * Injetados
   * @property route 
   * @property photoService
   */
  constructor(
    private route : ActivatedRoute, 
    private photoService : PhotoService,
    private router : Router,
    private alertService: AlertService, 
    private userService: UserService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    const id = this.route.snapshot.params.photoId;
    this.photo$ = this.photoService.findById(id);
    this.photo$.subscribe(
      () => {
        /** faz nada */
      }, 
      err => { 
        console.log(err);
        this.router.navigate(['not-found']);
      }
    );
  }

  /**
   * 
   */
  remove() {
    const id = this.route.snapshot.params.photoId;
    this.photoService.removePhoto(id).subscribe(
      /** Deu certo */
      () => { 
        /** Feedback */
        this.alertService.success('Photo removed', true);
        /** 
         * Volta para a home do usuário, apagando a rota da 
         * foto excluída do histórico do navegador (replaceUrl)
         */
        this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true}); 
      },
      /** Deu pau */
      err => { 
        console.log(err);
        this.alertService.warning('Could not delete the photo. Check console for error message'); 
      }
    );
  }

  /**
   * @param photo
   */
  like(photo: Photo) {
    this.photoService
      .like(photo.id)
      .subscribe(
        liked => {
          if(liked) {
            this.photo$ = this.photoService.findById(photo.id);
            this.alertService.success('Photo liked', true);
          } else {
            this.alertService.warning('This photo has been liked once');
          }
        },
        err => {
          console.log(err);
          this.alertService.warning('Could not like the photo. Check console for error message');
        }
      );
  }
}
