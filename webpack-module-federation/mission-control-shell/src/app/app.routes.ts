import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
    children: [
      {
        path: '',
        outlet: 'launch-status',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'launchSchedule',
            exposedModule: './LaunchStatusRoutes'
          }).then(m => m.LAUNCH_STATUS_ROUTES)
      }
    ]
  },
  {
    path: 'launches',
    loadChildren: () =>
      loadRemoteModule({
        type: 'manifest',
        remoteName: 'launchSchedule',
        exposedModule: './LaunchRoutes'
      }).then(m => m.LAUNCH_ROUTES)
  }
];
