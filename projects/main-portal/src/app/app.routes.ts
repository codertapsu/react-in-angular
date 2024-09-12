import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'react',
    loadComponent: () => import('@pages/react-container/react-container.component').then((m) => m.ReactContainerComponent),
  },
  {
    path: 'vue',
    loadComponent: () => import('@pages/vue-container/vue-container.component').then((m) => m.VueContainerComponent),
  }
];
