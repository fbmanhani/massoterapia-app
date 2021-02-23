import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Report } from 'src/app/core/models/report';
import { Unit } from 'src/app/core/models/unit';
import { SessionService } from 'src/app/services/session.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements AfterViewInit {
  @ViewChild('chart') private chart: ElementRef;

  doughnutChart: Chart;
  units: Array<Unit>;
  form: FormGroup;
  results: Array<Report>;

  constructor(
    private fb: FormBuilder,
    private unitService: UnitService,
    private loadingController: LoadingController,
    private sessionService: SessionService,
    private alertController: AlertController
  ) {
    this.form = this.fb.group({
      unitId: [null, [Validators.required]],
      date: [moment().startOf('day').toISOString(), [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.loadUnits();
  }

  async loadUnits() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.unitService.findAll().subscribe(
      async (res: Unit[]) => {
        if (res) {
          this.units = res;
        }
        await loading.dismiss();
      },
      async () => {
        await loading.dismiss();
      }
    );
  }

  async search() {
    this.results = [];
    this.doughnutChart?.clear();
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.form.valid) {
      this.sessionService.getSessionsReport(this.unitId.value, this.date.value).subscribe(
        async (res: Report[]) => {
          this.results = res;
          this.createChart();
          await loading.dismiss();
        },
        async (error) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: error.error ? 'Alerta' : 'Erro',
            message: error.error?.message || error.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
  }

  createChart() {
    const labels = [];
    const data = [];
    const colors = [];

    this.results.forEach((it) => {
      labels.push(it.massagist);
      data.push(it.sessions);
      colors.push(this.randomRgba());
    });

    this.doughnutChart = new Chart(this.chart.nativeElement, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            label: '# Sessões',
            data,
            backgroundColor: colors,
          },
        ],
      },
    });
  }

  get unitId() {
    return this.form.get('unitId');
  }

  get date() {
    return this.form.get('date');
  }

  randomRgba() {
    const o = Math.round;
    const r = Math.random;
    const s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.6 + ')';
  }
}
