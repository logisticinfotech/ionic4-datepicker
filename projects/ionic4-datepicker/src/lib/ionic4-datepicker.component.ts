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
  selector: 'li-ionic4-datepicker',
  templateUrl: './ionic4-datepicker.component.html',
  styleUrls: ['./ionic4-datepicker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {

  @Input() inputDateConfig: any;

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
    console.log('DIGVIJAY =>', this.inputDateConfig);
    if (this.inputDateConfig.inputDate) {
      this.selectedDate.date = this.inputDateConfig.inputDate;
    }
    if (value) {
      this.selectedDate.date = value;
    }
    // tslint:disable-next-line:prefer-const
    let objConfig: any = {};
    objConfig.from = this.inputDateConfig.fromDate ? this.inputDateConfig.fromDate : '';
    objConfig.to = this.inputDateConfig.toDate ? this.inputDateConfig.toDate : '';
    objConfig.closeOnSelect = this.inputDateConfig.closeOnSelect ? this.inputDateConfig.closeOnSelect : false;
    // tslint:disable-next-line:triple-equals
    objConfig.showTodayButton = this.inputDateConfig.showTodayButton == undefined ? true : this.inputDateConfig.showTodayButton;
    objConfig.disableWeekDays = this.inputDateConfig.disableWeekDays ? this.inputDateConfig.disableWeekDays : [];

    objConfig.monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    objConfig.templateType = 'popup';
    objConfig.mondayFirst = 1;
    objConfig.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // tslint:disable-next-line:triple-equals
    this.selectedDate.date ? objConfig.inputDate = new Date(this.selectedDate.date) : objConfig.inputDate = new Date();

    console.log('config =>', objConfig);
    // tslint:disable-next-line:prefer-const
    let datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
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
