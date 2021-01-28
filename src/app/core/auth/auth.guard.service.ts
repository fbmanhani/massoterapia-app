import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    public menuCtrl: MenuController
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (await this.authService.isLoggedIn()) {
      if (!this.menuCtrl.isEnabled()) {
        this.menuCtrl.enable(true);
      }
      return true;
    } else {
      if (!this.menuCtrl.isEnabled()) {
        this.menuCtrl.enable(true);
      }
      this.router.navigate(['/login']);
      return false;
    }
  }

  async canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(route, state);
  }
}
