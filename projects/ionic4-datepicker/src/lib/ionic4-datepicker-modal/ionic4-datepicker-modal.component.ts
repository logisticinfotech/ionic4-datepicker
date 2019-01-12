import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'li-ionic4-datepicker-modal',
  templateUrl: './ionic4-datepicker-modal.component.html',
  styleUrls: ['./ionic4-datepicker-modal.component.scss']
})
export class Ionic4DatepickerModalComponent implements OnInit {

  // default config
  // config = {
  //   inputDate: new Date(),
  //   titleLabel: null,
  //   setLabel: 'Set',
  //   todayLabel: 'Today',
  //   closeLabel: 'Close',
  //   mondayFirst: true,
  //   showTodayButton: false,
  //   closeOnSelect: false,
  //   disableWeekdays: [],
  //   weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  //   monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  // };

  currentDate;
  today;

  // inputs
  mainObj: any = {};

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
  monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weeksList = ['Sun', 'Mon', 'Tue', 'Wed', 'thu', 'Fri', 'Sat'];
  yearsList = [];
  daysList = [];

  //
  selectedDateString;
  //

  constructor(
    private navParams: NavParams,
    private datePipe: DatePipe,
    private modalCtrl: ModalController
  ) {
    this.today = this.resetHMSM(new Date()).getTime();
    this.mainObj = this.navParams.get('mainObj');
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
    // tslint:disable-next-line:prefer-const
    let newSelectedDate: any = new Date(this.selctedDateEpoch);
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
    // tslint:disable-next-line:prefer-const
    let today = new Date(this.today);
    // tslint:disable-next-line:prefer-const
    let today_obj = {
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
    currentDate = this.resetHMSM(currentDate);
    this.currentDate = currentDate;

    // tslint:disable-next-line:prefer-const
    let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
    // tslint:disable-next-line:prefer-const
    let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

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

    // for (let i = firstDay; i <= lastDay; i++) {
    //   tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

    //   if (this.fromDate && this.toDate) {
    // tslint:disable-next-line:max-line-length
    //     disabled = (tempDate.getTime() < this.fromDate) || (tempDate.getTime() > this.toDate) || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
    //   }

    //   this.daysList.push({
    //     date: tempDate.getDate(),
    //     month: tempDate.getMonth(),
    //     year: tempDate.getFullYear(),
    //     day: tempDate.getDay(),
    //     epoch: tempDate.getTime(),
    //     disabled: disabled
    //   });
    // }

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

      if (this.fromDate && this.toDate && !disabled) {
        // tslint:disable-next-line: max-line-length
        disabled = (tempDate.getTime() < this.fromDate) || (tempDate.getTime() > this.toDate) || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
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
    // tslint:disable-next-line:prefer-const
    let monthNumber = this.monthsList.indexOf(this.data.currentMonth);
    this.currentDate.setMonth(monthNumber);
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
    this.disableWeekdays = this.mainObj.disableWeekDays;

    this.setDisabledDates(this.mainObj);
    this.refreshDateList(this.mainObj.inputDate);
  }

  // for dismiss modal
  closeModal(selectedDate) {
    // console.log('closeModal => ', selectedDate);
    this.modalCtrl.getTop();
    this.modalCtrl.dismiss({ 'date': selectedDate });
  }

  // close modal button
  closeIonicDatePickerModal() {
    // console.log('closeIonicDatePickerModal');
    this.closeModal(null);
  }

  // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
  getYearsList(from, to) {
    // console.log('getYearsList =>', from, to);
    // tslint:disable-next-line:prefer-const
    let yearsList = [];
    let minYear = 1900;
    // let maxYear = 2100;
    // let minYear = 2000;
    let maxYear = new Date().getFullYear() + 1;
    minYear = from ? new Date(from).getFullYear() : minYear;
    maxYear = to ? new Date(to).getFullYear() : maxYear;
    for (let i = minYear; i <= maxYear; i++) {
      yearsList.push(i);
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

  formatDate() {
    return this.datePipe.transform(new Date(this.selctedDateEpoch), this.mainObj.dateFormat);
    // let dd: any = new Date(this.selctedDateEpoch).getDate();
    // // tslint:disable-next-line:prefer-const
    // let yyyy = new Date(this.selctedDateEpoch).getFullYear();
    // // let mm: any = new Date(this.selctedDateEpoch).getMonth() + 1; // January is 0!
    // if (dd < 10) {
    //   dd = '0' + dd;
    // }
    // // if (mm < 10) {
    // //   mm = '0' + mm;
    // // }
    // // yyyy-MM-dd
    // return yyyy + ' ' + this.mainObj.monthsList[new Date(this.selctedDateEpoch).getMonth()] + ' ' + dd;
  }
}
