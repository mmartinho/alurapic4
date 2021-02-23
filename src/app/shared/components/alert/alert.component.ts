import { Component, Input, OnInit } from '@angular/core';

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
  selector: 'ap-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  /** 
   * Inbound
   * @property
   */
  @Input() timeout: number = 3000;
  /**
   * @property 
   */
  alerts : Alert[] = [];

  /**
   * @property alertService 
   */
  constructor(
    private alertService: AlertService
  ) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.alertService.getAlert()
      .subscribe(alert => {
          if(!alert) {
            this.alerts = [];
            return;
          }
          this.alerts.push(alert);
          setTimeout(() => this.removeAlert(alert), this.timeout);
        },
        err => alert('Alert Service isnt available')
      );
  }

  /**
   * @param alert 
   */
  removeAlert(alertToRemove : Alert) {
    this.alerts = this.alerts.filter(alert => alert != alertToRemove);
  }

  /**
   * @param alert 
   */
  getAlertClass(alert: Alert) : string {
    if(!alert) { 
      return '';
    } else { 
      switch (alert.alertType) {
        case AlertType.DANGER: return 'alert alert-danger';
        case AlertType.INFO: return 'alert alert-info';
        case AlertType.SUCCESS: return 'alert alert-success';
        case AlertType.WARNING: return 'alert alert-warning';
        default: return '';
      }
    }
  }

}
