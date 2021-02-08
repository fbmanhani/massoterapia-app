import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-unit-register',
  templateUrl: './unit-register.page.html',
  styleUrls: ['./unit-register.page.scss'],
})
export class UnitRegisterPage implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    console.log('ngOnInit');
    const unit = this.router.getCurrentNavigation().extras.state;
    this.form = this.fb.group({
      id: [unit?.id],
      descricao: [unit?.descricao, [Validators.required, Validators.maxLength(100)]],
      posicoes: [unit?.posicoes, [Validators.required, Validators.maxLength(6)]],
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
  }

  async save() {
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.form.valid) {
      if (this.posicoes.value.lenght > 6) {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'O campo número de posições pode ter no máximo 6 caracteres',
          buttons: ['OK'],
        });
        await alert.present();
      } else {
        this.unitService.save(this.form.value).subscribe(
          async (res) => {
            await loading.dismiss();
            const alert = await this.alertController.create({
              header: 'Sucesso',
              message: 'Informações salvas com sucesso',
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel',
                  handler: () => {
                    this.router.navigate(['/units'], { replaceUrl: true });
                  },
                },
              ],
            });
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
  }

  get descricao() {
    return this.form.get('descricao');
  }

  get posicoes() {
    return this.form.get('posicoes');
  }
}
