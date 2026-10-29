import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NextLaunchCountdown } from './launches/next-launch-countdown/next-launch-countdown';

@Component({
  imports: [RouterOutlet, RouterLink, NextLaunchCountdown],
  selector: 'ls-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  onDetailsRequested(launchId: string) {
    alert('Details requested for launch:' + launchId);
  }
}
