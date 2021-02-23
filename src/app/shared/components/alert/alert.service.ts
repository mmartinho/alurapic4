import { Injectable, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from './alert';

@Injectable({providedIn: 'root'})
export class AlertService implements OnInit{

  /**
   * @property
   */
  alertSubject: Subject<Alert | null> = new Subject<Alert | null>();
  /**
   * @property
   */
  keepAfterRouterChange = false;

  /**
   * 
   */
  constructor(
    private router : Router
  ) {}

  /**
   * 
   */
  ngOnInit(): void {
    this.router.events.subscribe(
      event => {
        if(event instanceof NavigationStart) {
          if(this.keepAfterRouterChange) {
            this.keepAfterRouterChange = false;
          } else {
            this.clear();
          }
        }
      }
    );
  }

  /**
   * @param alertType 
   * @param message 
   */
  private alert(alertType: AlertType, message : string, keepAfterRouterChange = false)  {
    this.keepAfterRouterChange = keepAfterRouterChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  /**
   * @param message 
   */
  success(message: string, keepAfterRouterChange = false) {
    this.alert(AlertType.SUCCESS, message, keepAfterRouterChange);
  }

  /**
   * @param message 
   */
  warning(message: string, keepAfterRouterChange = false) {
    this.alert(AlertType.WARNING, message, keepAfterRouterChange);
  }

  /**
   * @param message 
   */
  danger(message: string, keepAfterRouterChange = false) {
    this.alert(AlertType.DANGER, message, keepAfterRouterChange);
  }

  /**
   * @param message 
   */
  info(message: string, keepAfterRouterChange = false) {
    this.alert(AlertType.INFO, message, keepAfterRouterChange);
  }

  /**
   * Retorna o observável do alert
   */
  getAlert() : Observable<Alert | null> {
    return this.alertSubject.asObservable();
  }

  /**
   * Força a limpeza da mensagem
   */
  clear() {
    this.alertSubject.next(null);
  }

}
