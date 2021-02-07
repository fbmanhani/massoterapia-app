import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {
  constructor(private router: Router) {}

  handleError(error) {
    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['/login']);
    }

    throw error;
  }
}
