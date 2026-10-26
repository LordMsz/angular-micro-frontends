import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'mc-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
