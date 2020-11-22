import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any, number>{

  authSubject = new BehaviorSubject(false);
  showMenu = false;

  constructor(http: HttpClient, private storage: Storage) {
    super('auth', http);
  }

  login(user: User): Observable<any> {
    return this.post(user, '/login').pipe(
      tap(async (res: any) => {
        if (res) {
          await this.storage.set('token', res.accessToken).then(() => console.log('token set'));
          this.showMenu = true;
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove('token');
    this.authSubject.next(false);
  }

  async isLoggedIn() {
    const token = await this.storage.get('token');
    return !!token;
  }

}
