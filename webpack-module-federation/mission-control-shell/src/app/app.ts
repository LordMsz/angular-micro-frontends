import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'mc-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  // related to NG0203 error and using rxjs-interop
  // remote's launch-detail.ts used toSignal (@angular/core/rxjs-interop), the shell didn't
  // Webpack only shares what the host build imports -> remote fell back to its own rxjs-interop,
  // bundled with its own copy of core internals (injection-context state) -> NG0203. See README.
  // Uncommenting this (plus imports: toSignal, of) makes the shell provide it -> remote works.
  // s = toSignal(of(null))
}
