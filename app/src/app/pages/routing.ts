import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const Routing: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

export { Routing };
