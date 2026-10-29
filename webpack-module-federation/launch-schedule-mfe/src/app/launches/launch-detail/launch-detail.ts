import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map } from 'rxjs';

import { LaunchStore } from '../launch-store';

@Component({
  imports: [DatePipe, AsyncPipe, RouterLink],
  selector: 'ls-launch-detail',
  styleUrl: './launch-detail.scss',
  templateUrl: './launch-detail.html',
})
export class LaunchDetail {
  private readonly launchStore = inject(LaunchStore);
  private readonly route = inject(ActivatedRoute);

  // related to NG0203 error and using toSignal in MFE while host app didn't import rxjs-interop
  // see explanation in README and in mission-control-shell/src/app/app.ts
  // protected readonly id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))));

  // Alternative path: input bound from the :id path param by withComponentInputBinding() — a router feature of the HOST app.
  // Downside: host app needs to configure it; possible side-effect on existing host components
  // readonly id = input.required<string>();

  // protected readonly launch = computed(() =>
  //   this.launchStore.launches().find(l => l.id === this.id()));

  // using RxJs instead to avoid above issues and tight coupling with host config
  protected readonly launch$ = this.route.paramMap.pipe(
    map(params => params.get('id')),
    map(id => this.launchStore.launches().find(l => l.id === id))
  );
}
