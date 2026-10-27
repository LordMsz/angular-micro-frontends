import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchStatusSummary } from './launch-status-summary';
import { LaunchStore } from '../launch-store';
import { signal } from '@angular/core';

describe('LaunchStatusSummary', () => {
  let component: LaunchStatusSummary;
  let fixture: ComponentFixture<LaunchStatusSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchStatusSummary],
      providers: [
        { provide: LaunchStore, useValue: {launches: signal([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchStatusSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
