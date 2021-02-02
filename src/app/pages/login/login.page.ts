import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {
    this.menuCtrl.enable(false);
    this.credentials = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async () => {
        this.menuCtrl.enable(true);
        await loading.dismiss();
        this.router.navigateByUrl('/home', { replaceUrl: true });
      },
      async (error) => {
        await loading.dismiss();
        const message = 'Erro ao tentar realizar o login';
        const alert = await this.alertController.create({
          header: 'Erro',
          message: error.message ? error.message : message,
          buttons: ['OK'],
        });

        await alert.present();
      }
    );
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }
}
