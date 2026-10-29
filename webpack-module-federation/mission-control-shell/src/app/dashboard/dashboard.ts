import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgComponentOutlet } from '@angular/common';
import { afterNextRender, Component, inject, inputBinding, outputBinding, resource, signal, viewChild, ViewContainerRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, NgComponentOutlet],
  selector: 'mc-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly router = inject(Router);
  private readonly countdownHost = viewChild.required('countdownHost', { read: ViewContainerRef });
  protected readonly countdownLoadingError = signal(false);
  protected readonly nextLaunchId = signal('6'); // hardcoded for now

  // alternative approach using NgComponentOutlet
  // resource() gives same as signal but provides also isLoading and error states
  protected readonly countdown = resource({
    loader: () =>
      loadRemoteModule({ type: 'manifest', remoteName: 'launchSchedule', exposedModule: './NextLaunchCountdown' })
        .then((m) => m.NextLaunchCountdown),
  });

  constructor() {
    afterNextRender(async () => {
      try {
        const m = await loadRemoteModule({
          type: 'manifest',
          remoteName: 'launchSchedule',
          exposedModule: './NextLaunchCountdown',
        });
        this.countdownHost().createComponent(m.NextLaunchCountdown, {
          bindings: [
            inputBinding('launchId', this.nextLaunchId),
            outputBinding<string>('detailsRequested', () => this.router.navigate(['/launches', this.nextLaunchId()])),
          ],
        });
      } catch (err) {
        console.error('launchSchedule remote unavailable', err);
        this.countdownLoadingError.set(true);
      }
    });
  }
}

// more structured option to handle exceptions and tests is to wrap remotes into a service e.g.
// // src/app/remotes/launch-schedule-remote.ts
// @Service()
// export class LaunchScheduleRemote {
//   loadNextLaunchCountdown(): Promise<Type<unknown>> {
//     return loadRemoteModule({ type: 'manifest', remoteName: 'launchSchedule', exposedModule: './NextLaunchCountdown' })
//       .then((m) => m.NextLaunchCountdown);
//   }
// }
// this also forces the createion of mock for tests that would in turn make contract explicit
// @Component({ selector: 'mc-fake-countdown', template: '' })
// class FakeCountdown {
//   readonly launchId = input<string>();
//   readonly detailsRequested = output<string>();
// }

// providers: [
//   provideRouter([]),
//   { provide: LaunchScheduleRemote, useValue: { loadNextLaunchCountdown: async () => FakeCountdown } },
// ],
