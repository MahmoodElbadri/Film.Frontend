import { Routes } from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';

export const routes: Routes =
  [
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login'
    },
    {
      path: 'register',
      component: RegisterComponent,
      title: 'Register'
    }
  ];
