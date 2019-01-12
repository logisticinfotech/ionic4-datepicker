import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerDirectivePage } from './datepicker-directive.page';

describe('DatepickerDirectivePage', () => {
  let component: DatepickerDirectivePage;
  let fixture: ComponentFixture<DatepickerDirectivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerDirectivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerDirectivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
