import { Component, OnInit, ElementRef } from '@angular/core';
@Component({
  selector: 'app-datepicker-directive',
  templateUrl: './datepicker-directive.page.html',
  styleUrls: ['./datepicker-directive.page.scss'],
})
export class DatepickerDirectivePage implements OnInit {

  // mydate1;
  mydate2 = '';
  mydate1 = '24 Aug 2019';
  // mydate2 = '12 Dec 2018';
  datePickerObj: any = {};

  monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018'), // Short format
    ];

    // EXAMPLE OBJECT
    this.datePickerObj = {
      // inputDate: new Date('12'), // If you want to set month in date-picker
      // inputDate: new Date('2018'), // If you want to set year in date-picker
      // inputDate: new Date('2018-12'), // If you want to set year & month in date-picker
      inputDate: new Date('2018-12-01'), // If you want to set date in date-picker

      // fromDate: new Date('2015-12-20'), // need this in order to have toDate
      // toDate: new Date('2019-12-25'),
      // showTodayButton: false,
      // closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
      // setLabel: 'Select a Date',
      // todayLabel: 'Today',
      // closeLabel: 'Close',
      // disabledDates: [],
      titleLabel: 'Select a Date',
      // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      // weeksList: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
      // dateFormat: 'MMMM D, YYYY',
      // clearButton: false,
      // momentLocale: 'pt-BR',
      // yearInAscending: true,
      // btnCloseSetInReverse: false,
      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      },

      arrowNextPrev: {
        // nextArrowSrc: 'assets/images/arrow_right.svg',
        // prevArrowSrc: 'assets/images/arrow_left.svg'
      }, // This object supports only SVG files.

      highlightedDates: [
        // { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
        // { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' },
        // { date: new Date('2019-09-14'), color: '#f2ef50', fontColor: '#fff' },
        // { date: new Date('2019-09-16'), color: '#ee99bf', fontColor: '#fff' },
        // { date: new Date('2019-09-18'), color: '#5000b1', fontColor: '#fff' },
        // { date: new Date('2019-09-20'), color: '#f21250', fontColor: '#fff' },
        // { date: new Date('2019-08-10'), color: '#ee88bf', fontColor: '#fff' },
        // { date: new Date('2019-08-12'), color: '#50f2b1', fontColor: '#fff' },
        // { date: new Date('2019-08-14'), color: '#f2ef50', fontColor: '#fff' },
        // { date: new Date('2019-08-16'), color: '#ee99bf', fontColor: '#fff' },
        // { date: new Date('2019-08-18'), color: '#5000b1', fontColor: '#fff' },
        // { date: new Date('2019-08-20'), color: '#f21250', fontColor: '#fff' },
        // { date: new Date('2019-07-10'), color: '#ee88bf', fontColor: '#fff' },
        // { date: new Date('2019-07-12'), color: '#50f2b1', fontColor: '#fff' },
        // { date: new Date('2019-07-14'), color: '#f2ef50', fontColor: '#fff' },
        // { date: new Date('2019-07-16'), color: '#ee99bf', fontColor: '#fff' },
        // { date: new Date('2019-07-18'), color: '#5000b1', fontColor: '#fff' },
        // { date: new Date('2019-09-01'), color: '#5000b1', fontColor: '#fff' },
      ],

      isSundayHighlighted: {
        fontColor: 'grey'
      }
    };
  }
}
