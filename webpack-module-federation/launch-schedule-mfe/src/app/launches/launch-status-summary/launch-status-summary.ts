import { Component, computed, inject, signal } from '@angular/core';

import { LaunchStore } from '../launch-store';
import { LaunchStatus } from '../launch.model';

@Component({
  imports: [],
  selector: 'ls-launch-status-summary',
  styleUrl: './launch-status-summary.scss',
  templateUrl: './launch-status-summary.html',
})
export class LaunchStatusSummary {
  private readonly launchStore = inject(LaunchStore);
  private readonly launches = this.launchStore.launches;

  protected readonly statuses: LaunchStatus[] = ['GO', 'HOLD', 'SCRUBBED'];
  protected readonly selected = signal<LaunchStatus | null>(null);
  protected readonly counts = computed(() => {
    const counts: Record<LaunchStatus, number> = { GO: 0, HOLD: 0, SCRUBBED: 0 };
    for (const launch of this.launches()) counts[launch.status]++;
    return counts;
  });
}
