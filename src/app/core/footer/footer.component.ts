import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'ap-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /**
   * @property
   */
  user$!: Observable<User | null>;

  /**
   * @property userService Injetado 
   * @see src\app\core\user\user.service.ts
   */
  constructor(
    private userService: UserService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.user$ = this.userService.getUser();
  }

}
