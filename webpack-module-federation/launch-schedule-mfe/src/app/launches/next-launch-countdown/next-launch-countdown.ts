import { Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';

import { LaunchStore } from '../launch-store';

@Component({
  imports: [],
  providers: [LaunchStore],
  selector: 'ls-next-launch-countdown',
  styleUrl: './next-launch-countdown.scss',
  templateUrl: './next-launch-countdown.html',
})
export class NextLaunchCountdown {
  private readonly launchStore = inject(LaunchStore);

  // inputs and outputs being critical contract between MFE and the shell
  readonly launchId = input.required<string>();
  readonly detailsRequested = output<string>();

  private readonly now = signal(Date.now());
  protected readonly launch = computed(() =>
    this.launchStore.launches().find((l) => l.id === this.launchId()),
  );
  protected readonly secondsLeft = computed(() => {
    const launch = this.launch();
    return launch ? Math.max(0, Math.floor((Date.parse(launch.windowOpens) - this.now()) / 1000)) : null;
  });

  constructor() {
    const timer = setInterval(() => this.now.set(Date.now()), 1000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
