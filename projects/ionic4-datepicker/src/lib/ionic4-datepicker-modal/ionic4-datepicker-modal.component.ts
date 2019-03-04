import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'li-ionic4-datepicker-modal',
  templateUrl: './ionic4-datepicker-modal.component.html',
  styleUrls: ['./ionic4-datepicker-modal.component.scss']
})
export class Ionic4DatepickerModalComponent implements OnInit {

  currentDate;
  today;

  // inputs
  mainObj: any = {};
  selectedDate: any = {};

  // component variables
  selctedDateEpoch;
  firstDayEpoch;
  lastDayEpoch;
  disabledDates = [];
  fromDate;
  toDate;
  disableWeekdays = [];
  data: any = {
    currentMonth: '',
    currentYear: '',
    currentMonthSelected: ''
  };
  currentYearSelected;
  numColumns;

  rows = [0, 7, 14, 21, 28, 35];
  cols = [0, 1, 2, 3, 4, 5, 6];
  monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  yearsList = [];
  daysList = [];
  yearInAscending = false;

  momentLocale = 'en-US';

  selectedDateString;

  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.today = this.resetHMSM(new Date()).getTime();
    if (this.navParams.get('selectedDate')) {
      // console.log('Selected date =>', this.navParams.get('selectedDate'));
      this.selectedDate.date = this.navParams.get('selectedDate');
    }
    this.mainObj = this.initDatePickerObj(this.navParams.get('objConfig'));
    // console.log('Main Object =>', this.mainObj, this.selectedDate.date);
  }

  ngOnInit() {
    this.initDatePicker();
  }

  // Reset the hours, minutes, seconds and milli seconds
  resetHMSM(currentDate) {
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  }

  // Previous month
  prevMonth() {
    // console.log('prevNext', this.currentDate);
    if (this.currentDate.getMonth() === 1) {
      this.currentDate.setFullYear(this.currentDate.getFullYear());
    }
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.data.currentMonth = this.mainObj.monthsList[this.currentDate.getMonth()];
    this.data.currentYear = this.currentDate.getFullYear();
    this.refreshDateList(this.currentDate);
    // this.changeDaySelected();
  }

  // Next month
  nextMonth() {
    // console.log('nextNext', this.currentDate);
    if (this.currentDate.getMonth() === 11) {
      this.currentDate.setFullYear(this.currentDate.getFullYear());
    }
    this.currentDate.setDate(1);
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.data.currentMonth = this.mainObj.monthsList[this.currentDate.getMonth()];
    this.data.currentYear = this.currentDate.getFullYear();
    this.monthChanged(this.currentDate.getMonth());
    this.refreshDateList(this.currentDate);
    // this.changeDaySelected();
  }

  // changeDaySelected ( day selection changes )
  changeDaySelected() {
    // console.log('changeDaySelected');
    const newSelectedDate: any = new Date(this.selctedDateEpoch);
    newSelectedDate.setMonth(this.currentDate.getMonth());
    newSelectedDate.setYear(this.currentDate.getFullYear());

    this.selctedDateEpoch = newSelectedDate.getTime();
    this.selectedDateString = this.formatDate();
    // this.closeModal(this.selctedDateEpoch);
  }

  // Date selected
  dateSelected(selectedDate) {
    // console.log('dateSelected =>', selectedDate);
    if (selectedDate && !selectedDate.disabled) {
      if (!selectedDate || Object.keys(selectedDate).length === 0) { return; }
      this.selctedDateEpoch = selectedDate.epoch;
      this.selectedDateString = this.formatDate();
      if (this.mainObj.closeOnSelect) {
        this.closeModal(this.selctedDateEpoch);
      }
    }
  }

  // Set today as date for the modal
  setIonicDatePickerTodayDate() {
    // console.log('setIonicDatePickerTodayDate');
    const today = new Date(this.today);
    const today_obj = {
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      day: today.getDay(),
      epoch: today.getTime(),
      disabled: false
    };
    this.dateSelected(today_obj);
    this.refreshDateList(new Date());
    this.selctedDateEpoch = this.resetHMSM(today).getTime();
    this.selectedDateString = this.formatDate();
    // this.closeModal(this.selctedDateEpoch);
  }

  // Set date for the modal
  setIonicDatePickerDate() {
    // console.log('setIonicDatePickerDate');
    this.closeModal(this.selctedDateEpoch);
  }

  // Setting the disabled dates list.
  setDisabledDates(obj) {
    // console.log('setDisabledDates =>', obj);
    if (!obj.disabledDates || obj.disabledDates.length === 0) {
      this.disabledDates = [];
    } else {
      this.disabledDates = [];
      for (let i = 0; i < obj.disabledDates.length; i++) {
        // val = resetHMSM(new Date(val));
        this.disabledDates.push(this.resetHMSM(new Date(obj.disabledDates[i])).getTime());
      }
    }
  }

  // Refresh the list of the dates of a month
  refreshDateList(currentDate) {
    // console.log('refreshDateList =>', currentDate);
    // console.log('currentDate before ', this.currentDate);
    currentDate = this.resetHMSM(currentDate);
    // console.log('currentDate after ', currentDate);
    this.currentDate = currentDate;

    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    this.monthsList = [];
    if (this.mainObj.monthsList && this.mainObj.monthsList.length === 12) {
      this.monthsList = this.mainObj.monthsList;
    } else {
      this.monthsList = this.monthsList;
    }

    this.yearsList = this.getYearsList(this.mainObj.from, this.mainObj.to);
    this.daysList = [];
    let tempDate, disabled;
    this.firstDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
    this.lastDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();

    for (let i = firstDay; i <= lastDay; i++) {
      tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      disabled = false;
      const day = tempDate.getDay();
      if (this.disableWeekdays.length > 0) {
        if (this.disableWeekdays.indexOf(day) >= 0) {
          disabled = this.disableWeekdays.indexOf(day) >= 0;
        } else {
          disabled = false;
        }
      }

      if (this.disabledDates.length > 0) {
        if (this.disabledDates.indexOf(tempDate.getTime()) >= 0) {
          disabled = true;
        }
      }

      if (this.fromDate && !disabled) {
        disabled = (tempDate.getTime() < this.fromDate)
          || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
      }
      if (this.toDate && !disabled) {
        disabled = (tempDate.getTime() > this.toDate)
          || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
      }

      this.daysList.push({
        date: tempDate.getDate(),
        month: tempDate.getMonth(),
        year: tempDate.getFullYear(),
        day: tempDate.getDay(),
        epoch: tempDate.getTime(),
        disabled: disabled
      });
    }

    // To set Monday as the first day of the week.
    let firstDayMonday = this.daysList[0].day - this.mainObj.mondayFirst;
    firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

    for (let j = 0; j < firstDayMonday; j++) {
      this.daysList.unshift({});
    }

    this.rows = [0, 7, 14, 21, 28, 35];
    this.cols = [0, 1, 2, 3, 4, 5, 6];

    this.data.currentMonth = this.mainObj.monthsList[currentDate.getMonth()];
    // console.log('currentDate.getMonth() ' + currentDate.getMonth());
    this.data.currentYear = currentDate.getFullYear();
    this.data.currentMonthSelected = this.data.currentMonth;
    this.currentYearSelected = this.data.currentYear;
    this.numColumns = 7;
  }

  // Month changed
  monthChanged(event) {
    // console.log('monthChanged =>', event);
    if (event && event.target && event.target.value) {
      this.data.currentMonth = event.target.value;
    }
    const monthNumber = this.monthsList.indexOf(this.data.currentMonth);
    // console.log('monthChanged monthNumber : ' + monthNumber + ' event.target.value : ' + event.target.value);
    // console.log('currentDate before ', this.currentDate);
    this.currentDate.setDate(1);
    this.currentDate.setMonth(monthNumber);
    // console.log('currentDate after ', this.currentDate);
    this.refreshDateList(this.currentDate);
    // this.changeDaySelected();
  }

  // Year changed
  yearChanged(event) {
    // console.log('yearChanged =>', event);
    if (event && event.target && event.target.value) {
      this.data.currentYear = event.target.value;
    }
    this.currentDate.setFullYear(this.data.currentYear);
    this.refreshDateList(this.currentDate);
    // this.changeDaySelected();
  }

  // Setting up the initial object
  setInitialObj(ipObj) {
    // console.log('setInitialObj =>', ipObj);
    this.mainObj = ipObj;
    this.selctedDateEpoch = this.resetHMSM(this.mainObj.inputDate).getTime();
    this.selectedDateString = this.formatDate();
    if (this.mainObj.weeksList && this.mainObj.weeksList.length === 7) {
      this.weeksList = this.mainObj.weeksList;
    }
    if (this.mainObj.mondayFirst) {
      this.weeksList.push(this.mainObj.weeksList.shift());
    }
    if (this.mainObj.yearInAscending) {
      this.yearInAscending = this.mainObj.yearInAscending;
    }
    if (this.mainObj.momentLocale) {
      this.momentLocale = this.mainObj.momentLocale;
    }

    this.disableWeekdays = this.mainObj.disableWeekDays;
    this.setDisabledDates(this.mainObj);

    // console.log('INPUT DATE =>' , this.mainObj.inputDate);
    this.refreshDateList(this.mainObj.inputDate);
  }

  // for dismiss modal
  closeModal(selectedDate) {
    // console.log('closeModal => ', selectedDate);
    this.modalCtrl.getTop();
    // this.selectedDate.date = selectedDate;
    const formattedDate = moment(selectedDate).format(this.mainObj.dateFormat);
    this.modalCtrl.dismiss({ 'date': formattedDate });
  }

  // close modal button
  closeIonicDatePickerModal() {
    // console.log('closeIonicDatePickerModal');
    this.closeModal(null);
  }

  // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
  getYearsList(from, to) {
    // console.log('getYearsList =>', from, to);
    const yearsList = [];
    let minYear = 1950;
    let maxYear = new Date().getFullYear() + 1;
    minYear = from ? new Date(from).getFullYear() : minYear;
    maxYear = to ? new Date(to).getFullYear() : maxYear;
    // console.log('getYearsList: ', this.yearInAscending);
    if (this.yearInAscending) {
      for (let i = minYear; i <= maxYear; i++) {
        yearsList.push(i);
      }
    } else {
      for (let i = maxYear; i >= minYear; i--) {
        yearsList.push(i);
      }
    }
    return yearsList;
  }

  // Init Date-Picker
  initDatePicker() {
    this.fromDate = '';
    this.toDate = '';
    // $scope.mainObj = angular.extend({}, config, ipObj);
    if (this.mainObj.from) {
      this.fromDate = this.resetHMSM(new Date(this.mainObj.from)).getTime();
    }
    if (this.mainObj.to) {
      this.toDate = this.resetHMSM(new Date(this.mainObj.to)).getTime();
    }
    // if (ipObj.disableWeekdays && this.config.disableWeekdays) {
    //   this.mainObj.disableWeekDays = ipObj.disableWeekdays.concat(this.config.disableWeekdays);
    // }
    this.setInitialObj(this.mainObj);
  }

  // Init DatePicker Object
  initDatePickerObj(config) {
    // const config = this.mainObj;

    if (config.inputDate && !this.selectedDate.date) {
      this.selectedDate.date = config.inputDate;
    }

    const objConfig: any = {};
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

    objConfig.btnCloseSetInReverse = config.btnCloseSetInReverse ? config.btnCloseSetInReverse : false;

    objConfig.btnProperties = {};
    if (config.btnProperties) {
      const btnProperties = config.btnProperties;

      objConfig.btnProperties.expand = btnProperties.expand ? btnProperties.expand : 'block';
      objConfig.btnProperties.fill = btnProperties.fill ? btnProperties.fill : 'solid';
      objConfig.btnProperties.size = btnProperties.size ? btnProperties.size : 'default';
      objConfig.btnProperties.color = btnProperties.color ? btnProperties.color : '';
      objConfig.btnProperties.disabled = btnProperties.disabled ? btnProperties.disabled : false;
      objConfig.btnProperties.strong = btnProperties.strong ? btnProperties.strong : false;
    } else {
      objConfig.btnProperties.expand = 'block';
      objConfig.btnProperties.fill = 'solid';
      objConfig.btnProperties.size = 'default';
      objConfig.btnProperties.disabled = false;
      objConfig.btnProperties.strong = false;
    }
    // console.log('config =>', objConfig);
    return objConfig;
  }

  // Format date
  formatDate() {
    // console.log('formatDate: ', this.selctedDateEpoch, new Date(this.selctedDateEpoch));
    return moment(this.selctedDateEpoch).format(this.mainObj.dateFormat);
  }
}

