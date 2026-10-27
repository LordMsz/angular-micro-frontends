import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { LaunchSchedule } from './launch-schedule';
import { LaunchStore } from '../launch-store';

describe('LaunchSchedule', () => {
  let component: LaunchSchedule;
  let fixture: ComponentFixture<LaunchSchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchSchedule],
      providers: [{ provide: LaunchStore, useValue: { launches: signal([]) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchSchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
