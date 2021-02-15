import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Unit } from 'src/app/core/models/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private unitService: UnitService
  ) {}

  units: Array<Unit>;

  ngOnInit() {
    this.loadUnits();
  }

  async loadUnits() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.unitService.findAll().subscribe(
      async (res: Array<Unit>) => {
        if (res) {
          this.units = res;
        }
        await loading.dismiss();
      },
      async () => {
        await loading.dismiss();
        this.alertController.create({
          header: 'Erro',
          message: 'Erro ao recuperar as unidades',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
            },
          ],
        });
      }
    );
  }

  config(unit: Unit) {
    this.router.navigate(['/parameters/unit'], { replaceUrl: true, state: unit });
  }
}
