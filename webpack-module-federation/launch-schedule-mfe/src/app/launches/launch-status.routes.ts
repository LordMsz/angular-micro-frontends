import { Routes } from '@angular/router';
import { LaunchStore } from './launch-store';
import { LaunchStatusSummary } from './launch-status-summary/launch-status-summary';

export const LAUNCH_STATUS_ROUTES: Routes = [
  { path: '', providers: [LaunchStore], component: LaunchStatusSummary },
];
