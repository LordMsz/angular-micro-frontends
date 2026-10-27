import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'ls-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
