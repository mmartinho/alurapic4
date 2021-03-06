import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PhotosModule } from './photos/photos.module';
import { ErrorsModule } from './errors/errors.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    /**
     * Módulo para renderização em navegadores.
     * Outros componentes devem importar "CommonModule"
     */
    BrowserModule,
    /** ***** Outros módulos da Aplicação ******* */
    PhotosModule,
    ErrorsModule,
    CoreModule,
    AppRoutingModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
