import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Ionic4DatepickerModalComponent } from 'ionic4-datepicker';

@Component({
  selector: 'app-datepicker-button',
  templateUrl: './datepicker-button.page.html',
  styleUrls: ['./datepicker-button.page.scss'],
})
export class DatepickerButtonPage implements OnInit {

  datePickerObj: any = {};
  selectedDate;

  monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  constructor(
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018'), // Short format
    ];

    this.datePickerObj = {
      // inputDate: new Date('12'), // If you want to set month in dateObject of date-picker
      // inputDate: new Date('2018'), // If you want to set year in dateObject of date-picker
      // inputDate: new Date('2018-12'), // If you want to set year & month in dateObject of date-picker
      // inputDate: new Date('2018-12-01'), // If you want to set date in dateObject of date-picker
      // inputDate: '12', // If you want to set date as a string in date-picker
      // inputDate: '2018', // If you want to set date as a string in date-picker
      // inputDate: '2018-12', // If you want to set date as a string in date-picker
      // inputDate: '2018-12-12', // If you want to set date as a string in date-picker
      // inputDate: moment(new Date('12')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018-12')), // If you want to set date as a moment object in date-picker
      // inputDate: moment(new Date('2018-12-12')), // If you want to set date as a moment object in date-picker

      // fromDate: new Date('2019-03-05'), // need this in order to have toDate
      // toDate: new Date('2019-03-28'),
      // showTodayButton: false,
      // closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
      // setLabel: 'Select a Date',
      // todayLabel: 'Today',
      // closeLabel: 'Close',
      // disabledDates: [],
      // titleLabel: 'Select a Date',
      // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      // weeksList: ['S', 'S', 'M', 'T', 'W', 'T', 'F'],
      dateFormat: 'YYYY-MM-DD',
      // clearButton: false,
      // momentLocale: 'pt-BR',
      // yearInAscending: true,
      // btnCloseSetInReverse: true,

      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: ''
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      }
    };
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 'objConfig': this.datePickerObj }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        // this.isModalOpen = false;
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

}
