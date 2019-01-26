import { Component, OnInit, forwardRef, Input, ElementRef, Renderer, Renderer2 } from '@angular/core';
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
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {

  @Input() inputDateConfig: any;

  closeIcon;
  selectedDate: any = {};
  private innerValue: any = '';

  monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(
    private modalCtrl: ModalController,
    public el: ElementRef,
    public renderer: Renderer
  ) { }

  ngOnInit() {
    // tslint:disable-next-line:triple-equals
    if (this.inputDateConfig.clearButton || this.inputDateConfig.clearButton == undefined) {
      // tslint:disable-next-line:prefer-const
      this.closeIcon = document.createElement('ion-icon');
      this.closeIcon.name = 'close-circle';
      this.closeIcon.className = 'clearButton';
      this.closeIcon.style.position = 'absolute';
      this.closeIcon.style.right = '8px';
      this.closeIcon.style.bottom = '0px';
      this.closeIcon.style.fontSize = '18px';
      this.closeIcon.style.color = '#A9A9A9';
      this.closeIcon.style.zIndex = '5';
      // tslint:disable-next-line:triple-equals
      if (this.el.nativeElement.parentNode.nodeName == 'ION-ITEM') {
        this.closeIcon.style.bottom = '30%';
      }
      this.el.nativeElement.setAttribute('style', 'position: relative; width: 100%;');
      this.el.nativeElement.appendChild(this.closeIcon);

      this.renderer.listen(this.closeIcon, 'click', (event) => {
        // Do something with 'event'
        // console.log('button clicks');
        this.selectedDate = new Date();
        this.value = '';
      });
    }
  }

  onChangeValue(value) {
    // console.log('onChangeValue =>' , value);
    // tslint:disable-next-line:triple-equals
    if (this.inputDateConfig.clearButton || this.inputDateConfig.clearButton == undefined) {
      if (!value) {
        this.closeIcon.style.visibility = 'hidden';
      } else {
        this.closeIcon.style.visibility = 'visible';
      }
    }
  }

  async openDatePicker(value) {
    // tslint:disable-next-line:prefer-const
    let config = this.inputDateConfig;

    if (config.inputDate) {
      this.selectedDate.date = config.inputDate;
    }
    if (value) {
      this.selectedDate.date = value;
    }
    // tslint:disable-next-line:prefer-const
    let objConfig: any = {};
    objConfig.inputDate = this.selectedDate.date ? moment(this.selectedDate.date, objConfig.dateFormat).toDate() : new Date();
    objConfig.dateFormat = config.dateFormat ? config.dateFormat : 'DD MMM YYYY';
    objConfig.titleLabel = config.titleLabel ? config.titleLabel : null;
    objConfig.from = config.fromDate ? config.fromDate : '';
    objConfig.to = config.toDate ? config.toDate : '';
    objConfig.closeOnSelect = config.closeOnSelect ? config.closeOnSelect : false;
    // tslint:disable-next-line:triple-equals
    objConfig.showTodayButton = config.showTodayButton == undefined ? true : config.showTodayButton;
    objConfig.disableWeekDays = config.disableWeekDays ? config.disableWeekDays : [];
    objConfig.mondayFirst = config.mondayFirst ? config.mondayFirst : false;
    objConfig.setLabel = config.setLabel ? config.setLabel : 'Set';
    objConfig.todayLabel = config.todayLabel ? config.todayLabel : 'Today';
    objConfig.closeLabel = config.closeLabel ? config.closeLabel : 'Close';
    objConfig.disabledDates = config.disabledDates ? config.disabledDates : [];
    objConfig.monthsList = config.monthsList ? config.monthsList : this.monthsList;
    objConfig.monthsList = [...objConfig.monthsList];
    objConfig.weeksList = config.weeksList ? config.weeksList : this.weeksList;
    objConfig.weeksList = [...objConfig.weeksList];

    // console.log('config =>', objConfig);
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
          // tslint:disable-next-line:prefer-const

          let formattedDate = moment(data.data.date).format(objConfig.dateFormat);
          // console.log('FORMATTED DATE =>', formattedDate, objConfig.dateFormat);
          this.value = formattedDate;
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
