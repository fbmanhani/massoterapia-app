import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitRegisterPage } from './unit-register.page';

const routes: Routes = [
  {
    path: '',
    component: UnitRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitRegisterPageRoutingModule {}
