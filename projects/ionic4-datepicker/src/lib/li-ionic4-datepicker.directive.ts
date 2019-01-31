import { Directive, Input, OnInit, HostListener, Output, EventEmitter, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { NgModel, NgControl } from '@angular/forms';

import * as moment_ from 'moment';

const moment = moment_;

@Directive({
  selector: '[liIonic4Datepicker]',
  exportAs: 'liIonic4Datepicker',
  providers: [NgModel]
})
export class LiIonic4DatepickerDirective implements OnInit {

  // @Input() inputDateConfig: any;
  @Input('liIonic4Datepicker') inputDateConfig: any;

  closeIcon;
  selectedDate: any = {};
  isModalOpen: any = false;

  monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor(
    private modalCtrl: ModalController,
    public ngModel: NgModel,
    public control: NgControl,
    public el: ElementRef,
    public renderer: Renderer,
  ) { }

  ngOnInit() {
    console.log('config.yearInAscending : ' + this.inputDateConfig.yearInAscending);
    // tslint:disable-next-line:triple-equals
    if (this.inputDateConfig.clearButton || this.inputDateConfig.clearButton == undefined) {
      // tslint:disable-next-line:prefer-const
      this.closeIcon = document.createElement('ion-icon');
      this.closeIcon.name = 'close-circle';
      this.closeIcon.className = 'clearButton';
      this.closeIcon.style.position = 'absolute';
      this.closeIcon.style.right = '8px';
      this.closeIcon.style.bottom = '30%';
      this.closeIcon.style.fontSize = '18px';
      this.closeIcon.style.color = '#A9A9A9';
      this.closeIcon.style.zIndex = '5';
      // tslint:disable-next-line:triple-equals
      if (this.el.nativeElement.parentNode.nodeName == 'ION-ITEM') {
        this.closeIcon.style.bottom = '12px';
      }
      this.el.nativeElement.parentNode.appendChild(this.closeIcon);

      this.renderer.listen(this.closeIcon, 'click', (event) => {
        // Do something with 'event'
        // console.log('button clicks');
        this.selectedDate = new Date();
        this.control.control.setValue('');
        this.ngModel.update.emit('');
      });
    }

    // tslint:disable-next-line:prefer-const
    let self = this;
    this.ngModel.valueChanges.subscribe((value) => {
      // console.log('ngModel value =>', value);
      self.selectedDate.date = value;
      // tslint:disable-next-line:triple-equals
      if (this.inputDateConfig.clearButton || this.inputDateConfig.clearButton == undefined) {
        if (!value) {
          this.closeIcon.style.visibility = 'hidden';
        } else {
          this.closeIcon.style.visibility = 'visible';
        }
      }
    });

    this.control.control.valueChanges.subscribe((value) => {
      // console.log('formcontrol value =>', value);
      self.selectedDate.date = value;
      // tslint:disable-next-line:triple-equals
      if (this.inputDateConfig.clearButton || this.inputDateConfig.clearButton == undefined) {
        if (!value) {
          this.closeIcon.style.visibility = 'hidden';
        } else {
          this.closeIcon.style.visibility = 'visible';
        }
      }
    });

    if (this.control.control.value) {
      self.selectedDate.date = this.control.control.value;
    }
  }

  @HostListener('click')
  onClick() {
    // console.log('on click of component =>', this.inputDateConfig);
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.openDatePicker();
    }
  }

  @HostListener('focus')
  onFocus() {
    // console.log('on focus of component =>', this.inputDateConfig);
    if (!this.isModalOpen) {
      this.isModalOpen = true;
      this.openDatePicker();
    }
  }

  async openDatePicker() {
    // tslint:disable-next-line:prefer-const
    let config = this.inputDateConfig;
    if (config.inputDate) {
      this.selectedDate.date = config.inputDate;
    }
    // tslint:disable-next-line:prefer-const
    let objConfig: any = {};

    objConfig.from = config.fromDate ? config.fromDate : '';
    objConfig.to = config.toDate ? config.toDate : '';
    objConfig.showTodayButton = config.showTodayButton === undefined ? true : config.showTodayButton;
    objConfig.closeOnSelect = config.closeOnSelect ? config.closeOnSelect : false;
    objConfig.disableWeekDays = config.disableWeekDays ? config.disableWeekDays : [];
    objConfig.mondayFirst = config.mondayFirst ? config.mondayFirst : false;
    objConfig.setLabel = config.setLabel ? config.setLabel : 'Set';
    objConfig.todayLabel = config.todayLabel ? config.todayLabel : 'Today';
    objConfig.closeLabel = config.closeLabel ? config.closeLabel : 'Close';
    objConfig.disabledDates = config.disabledDates ? config.disabledDates : [];
    objConfig.titleLabel = config.titleLabel ? config.titleLabel : null;

    objConfig.monthsList = config.monthsList ? config.monthsList : this.monthsList;
    objConfig.monthsList = [...objConfig.monthsList];

    objConfig.weeksList = config.weeksList ? config.weeksList : this.weeksList;
    objConfig.weeksList = [...objConfig.weeksList];

    objConfig.dateFormat = config.dateFormat ? config.dateFormat : 'DD MMM YYYY';
    // console.log(this.selectedDate.date, objConfig.dateFormat, moment.locale());

    objConfig.clearButton = config.clearButton ? config.clearButton : false;

    objConfig.yearInAscending = config.yearInAscending ? config.yearInAscending : false;
    objConfig.momentLocale = config.momentLocale ? config.momentLocale : 'en-US';

    moment.locale(objConfig.momentLocale);
    objConfig.inputDate = this.selectedDate.date ? moment(this.selectedDate.date, objConfig.dateFormat).toDate() : new Date();
    // console.log('objConfig.inputDate : ', objConfig.inputDate);

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
        this.isModalOpen = false;
        // console.log(data);
        if (data.data && data.data.date) {
          this.selectedDate.date = data.data.date;
          // tslint:disable-next-line:prefer-const
          let formattedDate = moment(data.data.date).format(objConfig.dateFormat);
          // console.log('FORMATTED DATE =>', formattedDate);
          this.control.control.setValue(formattedDate);
          this.ngModel.update.emit(formattedDate);
        }
      });
  }
}

