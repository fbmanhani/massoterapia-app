import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user';
import { BaseService } from '../core/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class LdapService extends BaseService<User, number> {
  constructor(http: HttpClient) {
    super('ldap', http);
  }

  public getAllUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.base + '/users');
  }
}
