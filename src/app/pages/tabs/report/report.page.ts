import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Parameters } from 'src/app/core/models/parameters';
import { Report } from 'src/app/core/models/report';
import { AuthService } from 'src/app/core/services/auth.service';
import { ParametersService } from 'src/app/services/parameters.service';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements AfterViewInit {
  form: FormGroup;
  result: Report;
  goal: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private sessionService: SessionService,
    private alertController: AlertController,
    private parametersService: ParametersService
  ) {
    this.form = this.fb.group({
      date: [moment().startOf('day').toISOString(), [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.parametersService
      .get()
      .valueChanges()
      .subscribe(async (res: Parameters) => {
        this.goal = res?.monthlyGoal;
      });
    this.search();
  }

  async search() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.form.valid) {
      this.sessionService.getMassagistSessions(this.login, this.date.value).subscribe({
        next: async (res: Report) => {
          this.result = res;
          await loading.dismiss();
        },
        error: async () => {
          await loading.dismiss();
        },
      });
    }
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  get isMassagist() {
    return this.authService.isMassagist();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  get date() {
    return this.form.get('date');
  }

  isCurrentDate() {
    const date = moment(this.date.value);
    const currentDate = moment();
    console.log(date);
    return date.month() === currentDate.month() && date.year() === currentDate.year();
  }

  back() {
    const date = moment(this.date.value);
    date.subtract(1, 'month');
    this.date.setValue(date.toISOString());
    this.search();
  }

  forward() {
    const date = moment(this.date.value);
    date.add(1, 'month');
    this.date.setValue(date.toISOString());
    this.search();
  }

  get login() {
    const nome: string = this.authService.getUsername();
    return nome.slice(nome.indexOf('(') + 1, nome.length - 1);
  }
}
