import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router, private menuCtrl: MenuController) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log('GUARD: ', isAuthenticated);
        if (isAuthenticated) {
          this.menuCtrl.enable(true);
          return true;
        } else {
          this.menuCtrl.enable(false);
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    );
  }
}
