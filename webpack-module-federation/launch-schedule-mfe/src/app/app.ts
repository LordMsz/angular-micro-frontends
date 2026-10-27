import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'ls-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
}
