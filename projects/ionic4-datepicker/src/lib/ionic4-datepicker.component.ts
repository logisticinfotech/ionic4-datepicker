import { Component, OnInit, forwardRef, Input, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import * as moment_ from 'moment';

const moment = moment_;

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Ionic4DatepickerComponent),
  multi: true
};
@Component({
  selector: 'li-ionic4-datepicker',
  templateUrl: './ionic4-datepicker.component.html',
  styleUrls: ['./ionic4-datepicker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {
  @Input() inputDateConfig: any;
  @Input() placeholder: string;

  selectedDate: any = {};
  isSelected = false;
  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private modalCtrl: ModalController, public el: ElementRef, public renderer2: Renderer2) {}

  resetDate() {
    console.log("reset date.")
    this.selectedDate = new Date();
    this.value = '';
  }

  onChangeValue(value) {
    // console.log('onChangeValue =>' , value);
    if (!value) {
      this.isSelected=false;
    } else {
      this.isSelected=true;
    }
  }

  async openDatePicker(value) {
    // console.log('openDatePicker');
    if (value) {
      this.selectedDate.date = value;
    }

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: this.inputDateConfig, selectedDate: this.selectedDate.date },
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then((data) => {
      // console.log(data);
      if (data.data && data.data.date && data.data.date !== 'Invalid date') {
        this.selectedDate.date = data.data.date;
        this.value = data.data.date;
      }
    });
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
    this.onChangeValue(v);
  }

  // Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
    this.onChangeValue(value);
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
