import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/auth/login.guard';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

/**
 * Rotas do módulo Home 
 * @constant Route[] Array de objetos Route
 */
const routes : Routes = [ 
    /**
     * Rota composta por duas rotas filhas
     * - / => contendo a tela de login
     * - /signup => contendo a tela de novo usuário
     * 
     */  
    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            /** Login */
            {
                path: '',
                component: SigninComponent,
                data : {
                    title : 'Sign in'
                }
            },
            /** Novo usuário */
            {
                path: 'signup',
                component: SignupComponent,
                data : {
                    title : 'Sign up'
                }
            }
        ]
    }
];

@NgModule({
    declarations: [  
    ],
    imports: [
        /** 
         * Cria e configura as rotas "filha"
         */
        RouterModule.forChild(routes)
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
export class HomeRoutingModule {

}