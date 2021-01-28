import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private menuCtrl: MenuController
  ) {}

  login(form) {
    // this.http.post('http://localhost:8081/massoterapia-api/auth/login', form.value).subscribe((res) => {
    //   console.log(res);
    // });

    this.authService.login(form.value).subscribe(
      (res) => {
        this.menuCtrl.enable(true);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
