import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { NextLaunchCountdown } from './launches/next-launch-countdown/next-launch-countdown';

@Component({
  imports: [RouterOutlet, RouterLink, NextLaunchCountdown],
  selector: 'ls-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  onDetailsRequested(launchId: string) {
    this.router.navigate(['launches', launchId]);
  }
}
