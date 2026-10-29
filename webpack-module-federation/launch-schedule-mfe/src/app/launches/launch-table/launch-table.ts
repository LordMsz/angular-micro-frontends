import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Launch } from '../launch.model';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'ls-launch-table',
  styleUrl: './launch-table.scss',
  templateUrl: './launch-table.html',
})
export class LaunchTable {
  readonly launches = input.required<Launch[]>();
}
