import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Ionic4DatepickerComponent),
  multi: true
};

@Component({
  selector: 'ionic4-datepicker',
  templateUrl: './ionic4-datepicker.component.html',
  styleUrls: ['./ionic4-datepicker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {

  @Input() inputDate: any;

  date;
  month;
  year;
  finaldate;

  selectedDate: any = {};

  private innerValue: any = '';

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async openDatePicker(value) {
    this.selectedDate.date = value;
    if (this.inputDate.from) {
      this.selectedDate.from = this.inputDate.from;
    }
    if (this.inputDate.to) {
      this.selectedDate.to = this.inputDate.to;
    }
    // console.log('selectedDate', this.selectedDate);
    // tslint:disable-next-line:prefer-const
    let objConfig: any = {};
    objConfig.monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    objConfig.closeOnSelect = false;
    objConfig.templateType = 'popup';
    objConfig.from = this.selectedDate.from ? this.selectedDate.from : '';
    objConfig.to = this.selectedDate.to ? this.selectedDate.to : '';
    objConfig.disableWeekDays = [];
    objConfig.mondayFirst = 1;
    objConfig.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    objConfig.showTodayButton = true;

    // tslint:disable-next-line:triple-equals
    this.selectedDate.date ? objConfig.inputDate = new Date(this.selectedDate.date) : objConfig.inputDate = new Date();

    // console.log('config =>', objConfig);
    // tslint:disable-next-line:prefer-const
    let datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'ionic4-datePicker',
      componentProps: { 'mainObj': objConfig }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        // console.log(data);
        if (data.data && data.data.date) {
          this.selectedDate.date = data.data.date;
          let dd: any = new Date(data.data.date).getDate();
          // tslint:disable-next-line:prefer-const
          let yyyy = new Date(data.data.date).getFullYear();
          let mm: any = new Date(data.data.date).getMonth() + 1; // January is 0!
          if (dd < 10) {
            dd = '0' + dd;
          }
          if (mm < 10) {
            mm = '0' + mm;
          }
          this.value = yyyy + '-' + mm + '-' + dd;
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
