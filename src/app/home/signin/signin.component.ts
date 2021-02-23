import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
  /** 
   * Esse componente é uma página da app, 
   * não será usado em outro template, portanto, 
   * não é necessário: 
   *    selector: 'ap-signin',
   */
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, AfterViewInit {

  /**
   * @property
   * "!" é uma Definite Assignment Assertions (DAS)
   * "DAS" é uma diretiva de compilação para o compilador 
   * ignorar uma variável quando esta deve ser inicializada
   * antes de ser usada
   * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html
   * Essa instância é "INJETADA" no init
   */
  loginForm!: FormGroup;
  /**
   * @property
   * Diretiva "DAS" aplicada 
   * Essa instância é "INJETADA" usando o decorator "ViewChild"
   * @see src\app\home\signin\signin.component.html #userNameInput
   */
  @ViewChild('userNameInput')
  userNameInput!: ElementRef<HTMLInputElement>;
  /**
   * 
   */
  fromUrl: string = ''; 

  constructor(
    /**
     * @properties
     * Depende do módulo "ReactiveFormsModule"
     * @see src\app\home\home.module.ts
     */
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router: Router,
    private platformDetectorService : PlatformDetectorService,
    private alertService : AlertService,
    private activatedRoute : ActivatedRoute
  ) { }

  /**
   * 
   */  
  ngOnInit(): void {
    /**
     * Salva a rota atual na propriedade "fromUrl"
     */
    this.activatedRoute.queryParams.subscribe( params => {
      this.fromUrl = params['fromUrl'];
    });
    /**
     * Representa o formulário de login
     */
    this.loginForm = this.formBuilder.group({
      userName : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  /**
   * 
   */
  ngAfterViewInit(): void {
    this.userNameSetFocus();
  }

  /**
   * Coloca o foco do cursor no componente userNameInput
   */
  userNameSetFocus() : void {
    /**
     * Detecta a plataforma
     */
    if(this.platformDetectorService.isPlatformBrowser()) {
      this.userNameInput?.nativeElement.focus(); 
    }     
  }

  /**
   * 
   */
  login() {
    if(this.loginForm.valid && !this.loginForm.pending) {
      const userName = this.loginForm.get('userName')?.value;
      const password = this.loginForm.get('password')?.value;
      /**
       * Encaminha para rota, quando autenticação for bem sucedida.
       */
      this.authService
        .authenticate(userName, password)
        .subscribe(
          /** Deu tudo certo */
          () => { 
              /** Se existe uma url de origem */
              if(this.fromUrl) {
                this.router.navigateByUrl(this.fromUrl); //url convencional
              } else {
                this.router.navigate(['user', userName]); //url por array
              }
          }, 
          /** Deu pau */
          err => { 
            if(err instanceof HttpErrorResponse) {
              if(err.status == 401) {
                this.alertService.warning('Invalid username or password', true);    
              } else {
                this.alertService.warning(err.message, true);
              }
            }
            console.log(err); 
            this.loginForm.reset(); 
            this.userNameSetFocus();
          }
        );
    }
  }

}
