import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { BaseService } from './base.service';

const { Storage } = Plugins;
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any, number> {
  isAuthenticated = new BehaviorSubject(false);
  currentToken = new BehaviorSubject(null);
  token = '';

  constructor(http: HttpClient) {
    super('auth', http);
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
      this.currentToken.next(token.value);
    } else {
      this.isAuthenticated.next(false);
      this.currentToken.next(null);
    }
  }

  login(user: User): Observable<any> {
    return this.post(user, '/login').pipe(
      map((data: any) => data.accessToken),
      switchMap((token) => {
        this.currentToken.next(token);
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.currentToken.next(null);
    return Storage.remove({ key: TOKEN_KEY });
  }

  getToken() {
    return this.currentToken.value;
  }
}
