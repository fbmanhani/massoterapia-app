import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../core/models/session';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService extends BaseService<Session, string> {
  constructor(http: HttpClient) {
    super('sessao', http);
  }

  getSessionsReport(unitId: string, date: string) {
    return this.get(`/${unitId}/${date}`);
  }

  getMassagistSessions(massagistLogin: string, date: string) {
    return this.get(`/count/${massagistLogin}/${date}`);
  }
}
