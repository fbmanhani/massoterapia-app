import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitPositionsPage } from './unit-positions.page';

const routes: Routes = [
  {
    path: '',
    component: UnitPositionsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitParametersPageRoutingModule {}
