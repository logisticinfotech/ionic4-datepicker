import { Component, OnInit } from '@angular/core';
import { Ionic4DatepickerModalComponent } from 'ionic4-datepicker';
import { ModalController } from '@ionic/angular';

import * as moment_ from 'moment';
const moment = moment_;

export class MyTemplateDriverForm {
  public name: string;
  public email: string;
  public date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  mydate = '11-12-2018';

  datePickerObj: any = {};
  datePickerObjPtBr: any = {};
  mydatePtBr = '06 Fev 2019';
  mydatePtBrFormat = '13/05/1991';

  isDisableDatePicker: false;
  monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  selectedDate;

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018') // Short format
    ];

    // EXAMPLE OBJECT
    this.datePickerObj = {
      // inputDate: new Date('12'), // If you want to set month in date-picker
      // inputDate: new Date('2018'), // If you want to set year in date-picker
      // inputDate: new Date('2018-12'), // If you want to set year & month in date-picker
      // inputDate: new Date('2018-12-01'), // If you want to set date in date-picker

      // inputDate: this.mydate,
      // dateFormat: 'yyyy-MM-DD',
      dateFormat: 'DD-MM-YYYY',
      fromDate: new Date('1500-01-01'), // default null
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
      // weeksList: this.weeksList,
      // momentLocale: 'pt-BR',
      yearInAscending: true
    };

    this.datePickerObjPtBr = {
      dateFormat: 'DD MMM YYYY',
      closeOnSelect: true,
      setLabel: 'OK',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      titleLabel: 'Selecione uma data',
      monthsList: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      clearButton: false
      // momentLocale: 'pt-BR'
    };
  }

  get datePickerObjDDMMYYY() {
    const betweenYear = [5, 80];
    moment.locale('es');
    const monthsList = moment.monthsShort();
    const weeksList = moment.weekdaysShort();
    return {
      inputDate: moment().subtract(betweenYear[0], 'year'),
      fromDate: moment().subtract(betweenYear[1], 'year'),
      toDate: moment().subtract(betweenYear[0], 'year'),
      closeOnSelect: true,
      btnCloseSetInReverse: true,
      dateFormat: 'DD/MM/YYYY',
      titleLabel: 'Seleccionar fecha',
      setLabel: 'Aceptar',
      closeLabel: 'Cancelar',
      showTodayButton: false,
      clearButton: false,
      monthsList,
      weeksList
    };
  }

  onChangeDate() {
    console.log('onChangeDate date ', this.mydate);
  }

  onClickSubmit() {
    // console.log('onClickSubmit', this.dataForm.value);
  }

  async openDatePicker() {
    const datePickerObj = {
      inputdate: moment(new Date('2019-02')),
      closeOnSelect: true,
      titleLabel: 'Datum',
      closeLabel: 'Schließen',
      monthsList: [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'
      ],
      showTodayButton: false,
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dateFormat: 'DD.MM.YYYY',
      clearButton: true
    };

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: datePickerObj }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      if (data && data.data) {
        console.log(data);
        this.selectedDate = data.data.date;
      }
    });
  }
}
