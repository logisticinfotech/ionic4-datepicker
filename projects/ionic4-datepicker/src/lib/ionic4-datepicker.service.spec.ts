import { TestBed } from '@angular/core/testing';

import { Ionic4DatepickerService } from './ionic4-datepicker.service';

describe('Ionic4DatepickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ionic4DatepickerService = TestBed.get(Ionic4DatepickerService);
    expect(service).toBeTruthy();
  });
});
