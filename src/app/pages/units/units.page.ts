import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Unit } from 'src/app/core/models/unit';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './units.page.html',
  styleUrls: ['./units.page.scss'],
})
export class UnitsPage implements OnInit {
  units: Array<Unit>;

  constructor(private unitService: UnitService, private loadingController: LoadingController, private router: Router) {}

  ngOnInit() {
    this.loadUnits();
  }

  async loadUnits() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.unitService.findAll().subscribe(
      async (res) => {
        if (res) {
          this.units = res;
        }
        await loading.dismiss();
      },
      async (err) => {
        await loading.dismiss();
      }
    );
  }

  add() {
    this.router.navigate(['/units/register'], { replaceUrl: true });
  }

  edit(unit: Unit) {
    this.router.navigate(['/units/register'], { replaceUrl: true, state: unit });
  }
}
