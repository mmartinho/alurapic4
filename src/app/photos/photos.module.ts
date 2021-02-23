import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoDetailsModule } from './photo-details/photo-details.module';

@NgModule({
  /**
   * "Declaráveis" (componentes, diretivas e pipes) para se "enxergarem" precisam 
   * estar no mesmo "module declarations"
   */
  declarations: [
  ],
  /** 
   * Módulos importados para este módulo 
   */
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotoListModule,
    PhotoDetailsModule,
    HttpClientModule,
    /**
     * OBS: todo módulo, exceto o módulo da app princiapal 
     * deve importar o CommonModule
     */
    CommonModule 
  ],
  /**
   * Membros deste módulo Exportados. 
   * Serão "enxergados" por outros módulos
   */
  exports : [
  ],
  providers: [
  ]
})
export class PhotosModule { }