import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Unit } from 'src/app/core/models/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './units.page.html',
  styleUrls: ['./units.page.scss'],
})
export class UnitsPage {
  units: Array<Unit>;

  constructor(private unitService: UnitService, private loadingController: LoadingController, private router: Router) {}

  ionViewWillEnter() {
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

  add() {
    this.router.navigate(['/unit/register'], { replaceUrl: true, state: null });
  }

  edit(unit: Unit) {
    this.router.navigate(['/unit/register'], { replaceUrl: true, state: unit });
  }

  positions(unit: Unit) {
    this.router.navigate(['/unit/positions'], { replaceUrl: true, state: unit });
  }
}
