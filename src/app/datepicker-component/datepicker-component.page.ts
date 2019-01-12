import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker-component',
  templateUrl: './datepicker-component.page.html',
  styleUrls: ['./datepicker-component.page.scss'],
})
export class DatepickerComponentPage implements OnInit {

  mydate1 = '11 Dec 2018';
  mydate2 = '12 Dec 2018';
  mydate3 = '13 Dec 2018';
  datePickerObj: any = {};

  constructor() { }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018'), // Short format
    ];

    // EXAMPLE OBJECT
    this.datePickerObj = {
      // clearButton : false , // default true
      // clearButton : false , // default true
      // clearButton : false , // default true
      // inputDate: this.mydate,
      // dateFormat: 'yyyy-MM-dd',
      // fromDate: new Date('2018-12-08'), // default null
      // toDate: new Date('2018-12-28'), // default null
      // showTodayButton: true, // default true
      // closeOnSelect: false, // default false
      // disableWeekDays: [4], // default []
      // mondayFirst: false, // default false
      // setLabel: 'S',  // default 'Set'
      // todayLabel: 'T', // default 'Today'
      // closeLabel: 'C', // default 'Close'
      // disabledDates: disabledDates, // default []
      titleLabel: 'Select a Date', // default null
      // monthsList: this.monthsList,
      // weeksList: this.weeksList
    };
  }



}
