import { Component, OnInit } from '@angular/core';

export class MyTemplateDriverForm {
  public name: string;
  public email: string;
  public date: string;

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // mydate = '11 Dec 2018';
  mydate = '11-12-2018';

  datePickerObj: any = {};

  monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor() {

  }

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
      // inputDate: this.mydate,
      // dateFormat: 'yyyy-MM-dd',
      dateFormat: 'dd-MM-YYYY',
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

  onChangeDate() {
    console.log("onChangeDate date ", this.mydate);
  }

  onClickSubmit() {
    // console.log('onClickSubmit', this.dataForm.value);
  }
}

