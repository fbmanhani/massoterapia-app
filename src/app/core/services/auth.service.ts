import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { BaseService } from './base.service';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any, number> {
  static TOKEN_KEY = 'token';
  isAuthenticated = new BehaviorSubject(false);
  currentToken = new BehaviorSubject(null);
  token = '';

  constructor(http: HttpClient, private jwtHelper: JwtHelperService) {
    super('auth', http);
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: AuthService.TOKEN_KEY });
    if (token && token.value && !this.jwtHelper.isTokenExpired(token.value)) {
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
        console.log(this.jwtHelper.decodeToken(token));
        this.currentToken.next(token);
        return from(Storage.set({ key: AuthService.TOKEN_KEY, value: token }));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    this.currentToken.next(null);
    return Storage.remove({ key: AuthService.TOKEN_KEY });
  }

  getToken() {
    return this.currentToken.value;
  }

  getUsername() {
    if (this.isAuthenticated.value) {
      return this.jwtHelper.decodeToken(this.getToken()).sub;
    }
    return;
  }

  getCity() {
    if (this.isAuthenticated.value) {
      return this.jwtHelper.decodeToken(this.getToken()).city;
    }
    return;
  }

  isAdmin() {
    if (this.isAuthenticated.value) {
      const roles = this.jwtHelper.decodeToken(this.getToken()).roles;
      return roles === 'ROLE_ADMINISTRADOR';
    }
    return;
  }

  isMassagist() {
    if (this.isAuthenticated.value) {
      const roles = this.jwtHelper.decodeToken(this.getToken()).roles;
      return roles === 'ROLE_MASSOTERAPEUTA';
    }
    return;
  }
}
