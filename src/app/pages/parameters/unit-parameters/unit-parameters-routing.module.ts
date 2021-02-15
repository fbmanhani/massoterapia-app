import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitParametersPage } from './unit-parameters.page';

const routes: Routes = [
  {
    path: '',
    component: UnitParametersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitParametersPageRoutingModule {}
