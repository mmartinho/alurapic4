import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ServerLog } from './server.log';

const LOGGER = environment.LogUrl;

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {

  constructor(
    private http : HttpClient
  ) { }

  /**
   * 
   * @param serverLog 
   */
  log(serverLog: ServerLog) {
    return this.http.post(LOGGER+'/infra/log', serverLog);
  }
}
