import type { Routes } from '@angular/router';

import { LaunchSchedule } from './launch-schedule/launch-schedule';
import { LaunchStore } from './launch-store';

export const LAUNCH_ROUTES: Routes = [
  {
    path: '',
    // Scoped to this feature. providedIn: 'root' would register it in the root injector —
    // on a MFE federated page that's the shell's, visible to anyone with the same token (e.g. once the package gets shared).
    providers: [LaunchStore],
    children: [
      { path: '', component: LaunchSchedule }
    ]
  }
];
