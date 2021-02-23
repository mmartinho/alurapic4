import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /**
   * @property
   */
  user$!: Observable<User | null>;
  /**
   * @property
   */
  user!: User | null;

  /**
   * @property userService
   * @property router
   */
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Consome a informação armazenada pelo Observável
   * @see 
   */
  ngOnInit() : void {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(user => {
      this.user = user;
      return user;
    });
  }

  /**
   * 
   */
  logout() {
    this.userService.logout();
    this.router.navigate(['']);
  }

}
