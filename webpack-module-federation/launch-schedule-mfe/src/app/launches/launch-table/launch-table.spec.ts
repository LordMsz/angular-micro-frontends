import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchTable } from './launch-table';

describe('LaunchTable', () => {
  let component: LaunchTable;
  let fixture: ComponentFixture<LaunchTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LaunchTable);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('launches', []);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
