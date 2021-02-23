import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.scss']
})
export class PhotoFormComponent implements OnInit {

  /**
   * @property
   */
  photoForm!: FormGroup;
  /**
   * @property
   */
  file: File | null = null;
  /**
   * @property
   */
  preview : string = '';
  /**
   * @property
   */
  percentDone: number = 0;

  /**
   * @property formBuilder 
   */
  constructor(
    private formBuilder: FormBuilder,
    private fotoService : PhotoService,
    private router : Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
        file: [
          '',
          Validators.required
        ],
        description : [
          '',
          Validators.maxLength(300)
        ],
        allowComments : [
          true
        ]
    });
  }

  /** 
   * Manipulador do evento de mudança de arquivo anexo
   * @param target 
   */
  onFileChange(target : any){
    if(target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      this.file = elemento.files ? this.previewFile(elemento.files[0]) : null;
    }
  }

  /**
   * Atualiza a propriedade "preview" com o conteúdo 
   * base64 do arquivo
   * @param file 
   */
  previewFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
    return file;
  }

  /**
   * Manipulador do evento de submissão do formulário
   */
  upload() {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;
    if(this.file) { 
      this.fotoService
        .upload(description, allowComments, this.file)
        /** 
         * Finalizou (certo ou errado), encaminha para time-line do usuário 
         */
        .pipe(finalize( () => this.router.navigate(['/user', this.userService.getUserName()]) ))
        /**
         * Faz a inscrição o observável de "upload" do serviço de photo
         */
        .subscribe(
          /** Tudo OK: em cada evento... */
          (event : HttpEvent<any>) => {
            /** ...de progresso  */
            if(event.type == HttpEventType.UploadProgress) {
              if(event.total) { // para não termos divisão por zero
                this.percentDone = Math.round(100 * event.loaded / event.total);
              }
            /** ..de resposta final */  
            } else if(event instanceof HttpResponse) {
              this.alertService.success('Photo uploaded with success', true);  
            }
          },
          /** Deu algum erro */
          err => { 
            console.log(err);
            this.alertService.warning('Could not upload the photo. See console for details', true); 
          }
        ); 
    }
  }

}
