import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitsPage } from './units.page';

const routes: Routes = [
  {
    path: '',
    component: UnitsPage,
  },
  {
    path: 'register',
    loadChildren: () => import('./unit-register/unit-register.module').then( m => m.UnitRegisterPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsPageRoutingModule {}
