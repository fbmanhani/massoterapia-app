import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitParametersPageRoutingModule } from './unit-parameters-routing.module';

import { UnitParametersPage } from './unit-parameters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitParametersPageRoutingModule
  ],
  declarations: [UnitParametersPage]
})
export class UnitParametersPageModule {}
