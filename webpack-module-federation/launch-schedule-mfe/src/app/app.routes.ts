import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'launches',
    loadChildren: () => import('./launches/launch.routes').then(m => m.LAUNCH_ROUTES)
  },
  {
    path: 'status',
    loadChildren: () => import('./launches/launch-status.routes').then(m => m.LAUNCH_STATUS_ROUTES)
  },
];
