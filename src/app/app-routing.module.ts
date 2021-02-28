import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AutoLoginGuard } from './core/guards/auto-login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canLoad: [AutoLoginGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'parameters',
    loadChildren: () => import('./pages/parameters/parameters.module').then((m) => m.ParametersPageModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'unit',
    loadChildren: () => import('./pages/units/units.module').then((m) => m.UnitsPageModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then((m) => m.ReportPageModule),
    canLoad: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
