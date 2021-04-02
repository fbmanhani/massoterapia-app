import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { Line } from 'src/app/core/models/line';
import { LinePosition } from 'src/app/core/models/line-position';
import { Parameters } from 'src/app/core/models/parameters';
import { Session } from 'src/app/core/models/session';
import { Unit } from 'src/app/core/models/unit';
import { AuthService } from 'src/app/core/services/auth.service';
import { AudioService } from 'src/app/services/audio.service';
import { LineService } from 'src/app/services/line.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { SessionService } from 'src/app/services/session.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit, OnDestroy, AfterViewInit {
  newSession = false;
  sessionTimeInMinutes: number;
  secondsLeft: number;
  unit: Unit;
  position: LinePosition;
  picture: string;

  progress = 0;
  percent = 0;
  radius = 100;
  countDownTimer = null;
  remainingTime: string;
  line: Line;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private insomnia: Insomnia,
    private parametersService: ParametersService,
    private lineService: LineService,
    private unitService: UnitService,
    private sessionService: SessionService,
    private audio: AudioService
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.parametersService
      .get()
      .valueChanges()
      .subscribe(async (res: Parameters) => {
        this.sessionTimeInMinutes = res?.sessionTime;
        this.secondsLeft = this.sessionTimeInMinutes * 60;
      });

    this.unitService.getByDescricao(this.authService.getCity()).subscribe(
      async (res: Unit) => {
        this.unit = res;
        this.lineService
          .getByKey(this.unit.id)
          .valueChanges()
          .subscribe(async (data: Line) => {
            this.line = data;
            await loading.dismiss();
          });
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'A unidade não está cadastrada. Entre em contato com o administrador.',
          buttons: ['Ok'],
        });
        await loading.dismiss();
        await alert.present();
        await this.authService.logout();
        this.router.navigateByUrl('/', { replaceUrl: true });
      }
    );
  }

  ngAfterViewInit() {
    this.audio.preload('short', 'assets/sounds/short-beep.mp3');
    this.audio.preload('short-double', 'assets/sounds/double-short-beep.mp3');
    this.audio.preload('long', 'assets/sounds/long-beep.mp3');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja realmente sair do aplicativo?',
      buttons: [
        {
          text: 'Sim',
          role: 'primary',
          handler: async () => {
            await this.authService.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          },
        },
        {
          text: 'Não',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  get username() {
    const nome: string = this.authService.getUsername();
    return nome.slice(0, nome.indexOf('('));
  }

  get login() {
    const nome: string = this.authService.getUsername();
    return nome.slice(nome.indexOf('(') + 1, nome.length - 1);
  }

  async createSession() {
    if (this.sessionTimeInMinutes && this.line) {
      const loading = await this.loadingController.create();
      await loading.present();
      this.position = this.line.posicoes.find((i) => !i.ativa);
      if (!this.position) {
        const alert = await this.alertController.create({
          header: 'Alerta',
          message: 'Todos os funcionários estão sendo atendidos no momento.',
          buttons: ['Ok'],
        });
        await loading.dismiss();
        await alert.present();
        return;
      }

      this.position.ativa = true;
      this.picture = `data:image/png;base64,${this.position.foto}`;
      this.reset();
      this.setRemainingTime();
      this.lineService.update(this.unit.id, this.line.posicoes).then(async () => {
        await loading.dismiss();
        this.newSession = true;
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Parâmetros não cadastrados. Entre em contato com o administrador da aplicação.',
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  startTimer() {
    this.insomnia.keepAwake();
    this.audio.play('short');
    this.secondsLeft = this.secondsLeft || this.sessionTimeInMinutes * 60;

    const backwardsTimer = () => {
      if (this.secondsLeft >= 0) {
        this.setRemainingTime();
        this.percent = 100 - (this.secondsLeft / (this.sessionTimeInMinutes * 60)) * 100;
        this.secondsLeft--;
      } else {
        clearInterval(this.countDownTimer);
        this.audio.play('long');
        this.reset();
        this.saveSession();
      }
    };

    this.countDownTimer = setInterval(backwardsTimer, 1000);
  }

  async stopTimer() {
    this.pauseTimer();
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Deseja realmente reiniciar o atendimento?',
      buttons: [
        {
          text: 'Sim',
          role: 'primary',
          handler: async () => {
            clearInterval(this.countDownTimer);
            this.reset();
            this.setRemainingTime();
            this.insomnia.allowSleepAgain();
          },
        },
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            this.startTimer();
          },
        },
      ],
    });
    await alert.present();
  }

  pauseTimer() {
    this.audio.play('short-double');
    clearInterval(this.countDownTimer);
    this.countDownTimer = null;
    this.insomnia.allowSleepAgain();
  }

  setRemainingTime() {
    const m = Math.floor(this.secondsLeft / 60);
    const s = this.secondsLeft - 60 * m;
    this.remainingTime = `${this.pad(m, 2)}:${this.pad(s, 2)}`;
  }

  pad(num, size) {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

  reset() {
    this.progress = 0;
    this.percent = 0;
    this.radius = 100;
    this.countDownTimer = null;
    this.secondsLeft = this.sessionTimeInMinutes * 60;
  }

  async saveSession() {
    const loading = await this.loadingController.create();
    await loading.present();
    const session: Session = {
      unit: this.unit,
      employee: {
        username: this.position.login,
      },
      massagist: {
        username: this.login
      },
    };

    this.sessionService.save(session).subscribe((res) => {
      if (!this.line) {
        this.line = {
          posicoes: [],
        };
      }

      const index = this.line.posicoes.findIndex((i) => i.login === this.position.login);
      this.line.posicoes.splice(index, 1);
      this.position.ativa = false;
      this.line.posicoes.push(this.position);
      this.lineService.update(this.unit.id, this.line.posicoes).then(async () => {
        this.newSession = false;
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Sessão finalizada com sucesso!',
          buttons: ['Ok'],
        });
        this.position = null;
        await loading.dismiss();
        await alert.present();
      });
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.reset();
    this.backToLine();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
    this.reset();
    this.backToLine();
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  backToLine() {
    if (this.line && this.position) {
      const obj = this.line.posicoes.find((i) => i.login === this.position.login);
      obj.ativa = false;
      this.lineService.update(this.unit.id, this.line.posicoes).then(async () => {
        console.log('line updated');
        this.position = null;
        this.newSession = false;
      });
    }
  }
}
