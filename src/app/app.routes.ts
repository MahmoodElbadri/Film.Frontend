import { Routes } from '@angular/router';
import {LoginComponent} from './core/auth/login/login.component';
import {RegisterComponent} from './core/auth/register/register.component';
import {MovieListComponent} from './features/movies/components/movie-list/movie-list.component';
import {MovieFormComponent} from './features/movies/components/movie-form/movie-form.component';
import {MovieDetailsComponent} from './features/movies/components/movie-details/movie-details.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';

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
    },
    {
      path: '',
      component: MovieListComponent,
      title: 'Index'
    },
    {
      path: 'movies/add',
      component: MovieFormComponent,
      title: 'Add Film'
    },
    {
      path: 'movies/update/:id',
      component: MovieFormComponent,
      title: 'Update Film'
    },
    {
      path: 'movies/details/:id',
      component: MovieDetailsComponent,
      title: 'Film Details'
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      title: 'Dashboard'
    }
  ];
