import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'session',
        loadChildren: () => import('./session/session.module').then((m) => m.SessionPageModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then((m) => m.ReportPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/session',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/session',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
