import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

/**
 * Rotas da aplicação 
 * @constant Route[] Array de objetos Route
 */
const routes : Routes = [
    /**
     * Redireciona o acesso "/" para "home"
     */
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    }, 
    /**
     * Módulo de rotas "filha" carregado em lazyloading 
     * através de uma função callback assíncrona
     * @see src\app\home\home.module.ts
     * @see src\app\home\home.routing.module.ts
     */
    {
        path : 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },    
    {  
        /** 
         * Rota parametrizada 
         * A Lista de fotos do usuario (time-line)
         */
        path: 'user/:userName',
        component: PhotoListComponent,
        /**
         * Pré-carregamento de dados
         */
        resolve: {
            photos: PhotoListResolver
        },
        data : {
            title: 'Timeline'
        }  
    },
    {  
        /**
         * Formulário para adicionar nova foto
         */
        path: 'p/add',
        component: PhotoFormComponent,
        canActivate : [AuthGuard],
        data : {
            title: 'Photo upload'
        }  
    }, 
    {  
        /**
         * Rota parametrizada
         * Detalhes de uma determinada foto
         */
        path: 'p/:photoId',
        component: PhotoDetailsComponent,
        data : {
            title: 'Photo detail'
        }
    }, 
    {
        /** 
         * Erro Global 
         */
        path: 'error',
        component : GlobalErrorComponent,
        data : {
            title : 'Error'
        }
    },       
    {
        /** 
         * Não encontrado 
         */
        path: 'not-found',
        component : NotFoundComponent,
        data : {
            title : 'Not found'
        }
    },       
    {
        /** 
         * Qualquer outra coisa coisa 
         */
        path: '**', 
        redirectTo: 'not-found'
    }
];

@NgModule({
    declarations: [  
    ],
    imports: [
        /** 
         * Cria e configura as rotas "pai ou raiz" 
         * {useHash:true} Todas as "routes" são precedidas por "#"
         */
        RouterModule.forRoot(routes, {useHash:true})
    ],
    exports: [
        /** 
         * Quem importar o módulo, 
         * vai ganhar de quebra o RouterModule 
         */
        RouterModule
    ],
    providers: [
    ],
})
export class AppRoutingModule {

}