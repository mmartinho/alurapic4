import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

    /**
     * @property userService 
     */
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    /**
     * 
     * @param route 
     * @param state 
     */
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        if(this.userService.isLogged()) {
            this.router.navigate(['user', this.userService.getUserName()]);
            return false;
        }
        return true;
    }

}