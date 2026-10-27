import { Component, inject } from '@angular/core';

import { LaunchTable } from '../launch-table/launch-table';
import { LaunchStore } from '../launch-store';

@Component({
  imports: [LaunchTable],
  selector: 'ls-launch-schedule',
  styleUrl: './launch-schedule.scss',
  templateUrl: './launch-schedule.html',
})
export class LaunchSchedule {
  private readonly launchStore = inject(LaunchStore);
  protected readonly launches = this.launchStore.launches;
}
