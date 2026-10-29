import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextLaunchCountdown } from './next-launch-countdown';
import { LaunchStore } from '../launch-store';

describe('NextLaunchCountdown', () => {
  let component: NextLaunchCountdown;
  let fixture: ComponentFixture<NextLaunchCountdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextLaunchCountdown],
      providers: [{ provide: LaunchStore, useValue: { launches: signal([]) } }],
    }).compileComponents();

    fixture = TestBed.createComponent(NextLaunchCountdown);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('launchId', '6');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
