import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mydate;
  datePickerObj: any = {};

  constructor() { }

  ngOnInit() {
    // EXAMPLE OBJECT
    this.datePickerObj = {
      fromDate: new Date('2018-12-08'), // default null
      toDate: new Date('2018-12-28'), // default null
      showTodayButton: true, // default true
      closeOnSelect: false, // default false
      disableWeekDays: [6] // default []
    };
  }
}
