import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ParametersService } from 'src/app/services/parameters.service';
import { Parameters } from '../../core/models/parameters';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss'],
})
export class ParametersPage implements OnInit {
  form: FormGroup;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private parametersService: ParametersService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      sessionTime: [null, [Validators.required]],
      monthlyGoal: [null, [Validators.required]],
    });
    const loading = await this.loadingController.create();
    await loading.present();
    this.parametersService
      .get()
      .valueChanges()
      .subscribe(async (res: Parameters) => {
        this.sessionTime.setValue(res?.sessionTime);
        this.monthlyGoal.setValue(res?.monthlyGoal);
        await loading.dismiss();
      });
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.form.valid) {
      this.parametersService.save(this.form.value).then(
        async (res) => {
          const alert = await this.alertController.create({
            header: 'Sucesso',
            message: 'Informações salvas com sucesso',
            buttons: [
              {
                text: 'OK',
                role: 'cancel',
              },
            ],
          });
          await loading.dismiss();
          await alert.present();
        },
        async (error) => {
          await loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Erro',
            message: error.message,
            buttons: ['OK'],
          });
          await alert.present();
        }
      );
    }
  }

  get sessionTime() {
    return this.form.get('sessionTime');
  }

  get monthlyGoal() {
    return this.form.get('monthlyGoal');
  }
}
