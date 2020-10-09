import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';
import { environment } from 'src/environments/environment';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any, number>{

  authSubject = new BehaviorSubject(false);

  constructor(http: HttpClient, private storage: Storage) {
    super('auth', http);
  }

  login(user: User): any {
    return this.post(JSON.stringify(user), '/login').lift(
      tap(async (res: any) => {
        if (res) {
          await this.storage.set('token', res.accessToken).then(() => console.log('token set'));
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
