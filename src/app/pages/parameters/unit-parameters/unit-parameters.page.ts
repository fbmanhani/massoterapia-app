import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Position } from 'src/app/core/models/position';
import { Unit } from 'src/app/core/models/unit';
import { User } from 'src/app/core/models/user';
import { LdapService } from 'src/app/services/ldap.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-unit-parameters',
  templateUrl: './unit-parameters.page.html',
  styleUrls: ['./unit-parameters.page.scss'],
})
export class UnitParametersPage implements OnInit {
  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private ldapService: LdapService,
    private positionService: PositionService
  ) {}

  users: Array<User>;
  positions: Array<Position>;
  unit: Unit;
  loading: HTMLIonLoadingElement;

  async ngOnInit() {
    this.unit = this.router.getCurrentNavigation().extras.state as Unit;
    this.loading = await this.loadingController.create();
    await this.loading.present();
    await this.loadUsers();
    await this.loadUnitPositions();
    await this.loading.dismiss();
    this.initPositions();
  }

  initPositions() {
    if (this.positions?.length === 0) {
      for (let i = 0; i < this.unit.posicoes; i++) {
        const pos = new Position();
        pos.number = i + 1;
        pos.unit = this.unit;
        this.positions.push(pos);
      }
    } else {
      const bdSize = this.positions.length;
      const expectedSize = this.unit.posicoes;
      if (bdSize > expectedSize) {
        const remove = bdSize - expectedSize;
        this.positions.splice(expectedSize - 1, remove);
      } else if (bdSize < expectedSize) {
        const add = expectedSize - bdSize;
        for (let i = 0; i < add; i++) {
          const pos = new Position();
          pos.number = bdSize + i + 1;
          pos.unit = this.unit;
          this.positions.push(pos);
        }
      }
    }
  }

  async save() {
    this.loading = await this.loadingController.create();
    await this.loading.present();
    this.positionService.saveAll(this.positions).subscribe(
      async () => {
        await this.loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Posições salvas com sucesso.',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {
                this.router.navigate(['/parameters'], { replaceUrl: true });
              },
            },
          ],
        });
        await alert.present();
      },
      async (error) => {
        await this.loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: error.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  private async loadUsers() {
    this.ldapService.getAllUsers().subscribe(
      async (res: Array<User>) => {
        this.users = res;
      },
      async () => {
        await this.loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Erro ao recuperar as unidades',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
            },
          ],
        });
        await alert.present();
      }
    );
  }

  private async loadUnitPositions() {
    await this.positionService
      .getAllByUnidadeId(this.unit.id)
      .toPromise()
      .then((res) => (this.positions = res as Array<Position>));
  }

  async selectionChange(value: User, pos: Position) {
    if (!value) {
      pos.employee = undefined;
      return;
    }

    const currentPosition = this.positions.find((p) => p.number !== pos.number && p.employee && p.employee.username === value.username);

    if (currentPosition) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'O funcionário já está vinculado a uma posição. Deseja confirmar a substituição?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              pos.employee = undefined;
            },
          },
          {
            text: 'Ok',
            handler: () => {
              currentPosition.employee = undefined;
            },
          },
        ],
      });
      await alert.present();
    }
  }

  compareWith(o1: User, o2: User) {
    return o1 && o2 ? o1?.username === o2?.username : o1 === o2;
  }
}
