import { Injectable } from '@angular/core';
import { 
    Resolve, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot 
} from '@angular/router';
import { Observable } from 'rxjs';

import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';

@Injectable({ providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    /**
     * Serviço injetado
     * @property service 
     */
    constructor(
        private service: PhotoService
    ) {}

    /**
     * Chama a função cliente API retornando as 
     * fotos do usuário
     * 
     * @implements
     * @param route 
     * @param state 
     * @returns Observable<Photo[]>
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const userName = route.params.userName;
        /*return this.service.listFromUser(userName);*/
        return this.service.listFromUserPaginated(userName, 1);
    }

}