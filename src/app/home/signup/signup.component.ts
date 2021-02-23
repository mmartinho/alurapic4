import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { LowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { userNamePassword } from './username-password.validator';

@Component({
  /** 
   * É uma página completa, então, removemos: 
   * selector: 'ap-signup',*/
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  /**
   * Dependencia injetada especificada
   * @see src\app\home\signup\user-not-taken.validator.service.ts
   */
  providers : [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit, AfterViewInit {

  /**
   * @property
   */
  signupForm!: FormGroup;
  /**
   * @property
   * Diretiva "DAS" aplicada 
   * Essa instância é "INJETADA" usando o decorator "ViewChild"
   * @see src\app\home\signup\signup.component.html #emailInput
   */
  @ViewChild('emailInput')
  emailInput!: ElementRef<HTMLInputElement>;  

  /**
   * @param formBuider Instância Injetada
   */
  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService : SignupService,
    private router : Router,
    private platformDetectorService : PlatformDetectorService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    /**
     * Validações de cada campo do formulário.
     * OBS:
     *  1. O form precisa conter a diretiva [formGroup] em
     *     binding com signupForm
     *  2. Cada campo precisa do seu nome passado para 
     *     formControlName
     *     @see src\app\home\signup\signup.component.html
     *  3. As mensagens de erro de validação são controladas 
     *     por outro componente: ap-message
     *  4. Existe um validador que envolve todo o grupo de campos
     *     que é colocado no segundo parametro (options) do método 
     *     group:
     *     @see src\app\home\signup\username-password.validator.ts 
     */
    this.signupForm = this.formBuilder.group(
      /** ************ Configuração dos "controls" *************** */
      {
        email:    ['', 
          [
            Validators.required, 
            Validators.email
          ]
        ],  
        fullName: ['', 
          [
            Validators.required, 
            Validators.minLength(2), 
            Validators.maxLength(40)
          ]
        ],
        userName: ['', // valor padrão
          /** ************** Validadores Síncronos *************** */
          [
            Validators.required, 
            /**
             * Validador customizado
             * @see src\app\shared\validators\lower-case.validator.ts
             */
            LowerCaseValidator,
            Validators.minLength(2), 
            Validators.maxLength(30)
          ],
          /** *********** Validadores assíncronos ************ */
          [
            this.userNotTakenValidatorService.checkUserNameTaken()
          ]
        ],
        password: ['', 
          [ 
            Validators.required, 
            Validators.minLength(8), 
            Validators.maxLength(14) 
          ]
        ]
      }, 
      /** ************ Opções do Grupo ************* */
      { validator : userNamePassword }
    );
  }

  /**
   * 
   */
  ngAfterViewInit(): void {
    this.emailSetFocus();
  }

  /**
   * Efetiva o "observável" do serviço de signup da API
   */
  signup() {
    /** Tudo válido e nada pendente */
    if(this.signupForm.valid && !this.signupForm.pending) {
      /** 
       * "Empacota" todos os dados do formulário: nome 
       * e valores submetidos 
       */
      const newUser = this.signupForm.getRawValue() as NewUser;
      /**
       * Inscrição do "observável"
       */
      this.signupService.signup(newUser).subscribe(
        () => { return this.router.navigate(['']); },
        err => console.log(err)
      );
    }
  }

  /**
   * Coloca o foco do cursor no componente emailInput
   */
  emailSetFocus() : void {
    /**
     * Detecta a plataforma
     */
    if(this.platformDetectorService.isPlatformBrowser()) {
      this.emailInput?.nativeElement.focus(); 
    }     
  }  

}
