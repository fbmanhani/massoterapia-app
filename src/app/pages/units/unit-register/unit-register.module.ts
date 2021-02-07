import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnitRegisterPageRoutingModule } from './unit-register-routing.module';
import { UnitRegisterPage } from './unit-register.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UnitRegisterPageRoutingModule
  ],
  declarations: [UnitRegisterPage]
})
export class UnitRegisterPageModule {}
