import { loadRemoteModule } from '@angular-architects/module-federation';
import { afterNextRender, Component, inject, inputBinding, outputBinding, signal, viewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'mc-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly router = inject(Router);
  private readonly countdownHost = viewChild.required('countdownHost', { read: ViewContainerRef });
  protected readonly nextLaunchId = signal('6'); // hardcoded for now

  constructor() {
    afterNextRender(async () => {
      const m = await loadRemoteModule({
        type: 'manifest',
        remoteName: 'launchSchedule',
        exposedModule: './NextLaunchCountdown',
      });
      this.countdownHost().createComponent(m.NextLaunchCountdown, {
        bindings: [
          inputBinding('launchId', this.nextLaunchId),
          outputBinding<string>('detailsRequested', () => this.router.navigate(['/launches'])),
        ],
      });
    });
  }
}
