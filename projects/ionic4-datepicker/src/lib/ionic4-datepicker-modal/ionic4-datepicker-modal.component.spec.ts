import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal.component';

describe('Ionic4DatepickerModalComponent', () => {
  let component: Ionic4DatepickerModalComponent;
  let fixture: ComponentFixture<Ionic4DatepickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ionic4DatepickerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ionic4DatepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
