import { TestBed } from '@angular/core/testing';
import { LaunchStore } from './launch-store';

describe('LaunchStore', () => {
  let service: LaunchStore;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [LaunchStore] });
    service = TestBed.inject(LaunchStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
