import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ionic4DatepickerComponent } from './ionic4-datepicker.component';

describe('Ionic4DatepickerComponent', () => {
  let component: Ionic4DatepickerComponent;
  let fixture: ComponentFixture<Ionic4DatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ionic4DatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ionic4DatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
