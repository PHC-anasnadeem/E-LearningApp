import { Routes } from '@angular/router';
import { AuthGuard } from '../app/auth/auth.guard'; 


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then((m) => m.LoginComponent) },
  { path: 'home', loadComponent: () => import('./home/home.page').then((m) => m.HomePage), canActivate: [AuthGuard] },
  { path: 'sign-up', loadComponent: () => import('./sign-up/sign-up.component').then((m) => m.SignUpComponent) },
];
