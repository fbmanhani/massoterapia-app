import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnitParametersPageRoutingModule } from './unit-positions-routing.module';
import { UnitPositionsPage } from './unit-positions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitParametersPageRoutingModule
  ],
  declarations: [UnitPositionsPage]
})
export class UnitParametersPageModule {}
