import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Promise<boolean>;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Início',
      url: '/home',
      icon: 'home',
    },
    {
      title: 'Unidades',
      url: '/unit',
      icon: 'business',
    },
    {
      title: 'Parâmetros',
      url: '/parameters',
      icon: 'settings',
    },
    {
      title: 'Relatórios',
      url: '/report',
      icon: 'stats-chart',
    },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private alertController: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      console.log('Back press handler!');
      if (
        this.location.isCurrentPathEqualTo('/home') ||
        this.location.isCurrentPathEqualTo('/login') ||
        this.location.isCurrentPathEqualTo('/tabs/session') ||
        this.location.isCurrentPathEqualTo('/tabs/report')
      ) {
        // Show Exit Alert!
        console.log('Show Exit Alert!');
        this.showExitConfirm();
        processNextHandler();
      } else {
        // Navigate to back page
        console.log('Navigate to back page');
        this.location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      console.log('Handler called to force close!');
      this.alertController
        .getTop()
        .then((r) => {
          if (r) {
            navigator['app'].exitApp();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }

  async ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  get username() {
    return this.authService.getUsername();
  }

  showExitConfirm() {
    this.alertController
      .create({
        header: 'Alerta',
        message: 'Deseja realmente fechar o aplicativo?',
        backdropDismiss: false,
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              navigator['app'].exitApp();
            },
          },
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('Application exit prevented!');
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
