import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LaunchDetail } from './launch-detail';
import { LaunchStore } from '../launch-store';

describe('LaunchDetail', () => {
  let component: LaunchDetail;
  let fixture: ComponentFixture<LaunchDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetail],
      providers: [LaunchStore, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
