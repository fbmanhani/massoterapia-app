import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ParametersPageRoutingModule } from './parameters-routing.module';
import { ParametersPage } from './parameters.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParametersPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ParametersPage]
})
export class ParametersPageModule {}
