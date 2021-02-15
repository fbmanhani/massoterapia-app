import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParametersPage } from './parameters.page';


const routes: Routes = [
  {
    path: '',
    component: ParametersPage
  },
  {
    path: 'unit',
    loadChildren: () => import('./unit-parameters/unit-parameters.module').then( m => m.UnitParametersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametersPageRoutingModule {}
