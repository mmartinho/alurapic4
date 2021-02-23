import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'ap-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.scss']
})
export class PhotoCommentsComponent implements OnInit {
  
  /**
   * Inboud
   * @property
   */
  @Input() photoId!: number;

  /**
   * @property
   */
  comments$! : Observable<PhotoComment[]>;
  commentForm!: FormGroup; 

  /**
   * Injetados
   * @property photoService
   * @property formBuider 
   */
  constructor(
    private photoService: PhotoService, 
    private formBuider: FormBuilder
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.comments$ = this.photoService.getComments(this.photoId);
    /**
     * Regras de validação do commentForm
     */
    this.commentForm = this.formBuider.group({
      comment:[
        '',
        Validators.maxLength(300)
      ]
    });
  }

  /**
   * 
   */
  save() {
    const comment = this.commentForm?.get('comment')?.value as string;
    /** 
     * O operador switchMap cancela o Observable anterior passando o 
     * fluxo para um novo Observable, garantindo assim que a emissão 
     * tenha apenas o valor emitido pelo Observable retornado por switchMap
     */
    this.comments$ = this.photoService
      .addComment(this.photoId, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
      .pipe(tap(() => {
          this.commentForm.reset();
      }));
  }
  
}
