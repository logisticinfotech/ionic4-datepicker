import { __awaiter } from 'tslib';
import { Injectable, Component, NgModule, defineInjectable, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavParams, ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ionic4DatepickerService {
    constructor() { }
}
Ionic4DatepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
Ionic4DatepickerService.ctorParameters = () => [];
/** @nocollapse */ Ionic4DatepickerService.ngInjectableDef = defineInjectable({ factory: function Ionic4DatepickerService_Factory() { return new Ionic4DatepickerService(); }, token: Ionic4DatepickerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ionic4DatepickerModalComponent {
    //
    /**
     * @param {?} navParams
     * @param {?} modalCtrl
     */
    constructor(navParams, modalCtrl) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        // default config
        this.config = {
            titleLabel: null,
            setLabel: 'Set',
            todayLabel: 'Today',
            closeLabel: 'Close',
            inputDate: new Date(),
            mondayFirst: true,
            weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            templateType: 'popup',
            showTodayButton: false,
            closeOnSelect: false,
            disableWeekdays: []
        };
        // inputs
        this.mainObj = {
        // inputDate: new Date(),
        // monthsList: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        // closeOnSelect: false,
        // templateType: 'popup',
        // from: '',
        // to: '',
        // disableWeekDays: [],
        // mondayFirst: 1,
        // weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        // showTodayButton: true,
        };
        this.disabledDates = [];
        this.disableWeekdays = [];
        this.data = {
            currentMonth: '',
            currentYear: '',
            currentMonthSelected: ''
        };
        this.rows = [0, 7, 14, 21, 28, 35];
        this.cols = [0, 1, 2, 3, 4, 5, 6];
        this.monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.yearsList = [];
        this.daysList = [];
        this.today = this.resetHMSM(new Date()).getTime();
        this.mainObj = this.navParams.get('mainObj');
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initDatePicker(this.mainObj);
    }
    // Reset the hours, minutes, seconds and milli seconds
    /**
     * @param {?} currentDate
     * @return {?}
     */
    resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
    }
    // Previous month
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    changeDaySelected() {
        // console.log('changeDaySelected');
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let newSelectedDate = new Date(this.selctedDateEpoch);
        newSelectedDate.setMonth(this.currentDate.getMonth());
        newSelectedDate.setYear(this.currentDate.getFullYear());
        this.selctedDateEpoch = newSelectedDate.getTime();
        this.selectedDateString = this.formatDate();
        // this.closeModal(this.selctedDateEpoch);
    }
    // Date selected
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    dateSelected(selectedDate) {
        // console.log('dateSelected =>', selectedDate);
        if (!selectedDate.disabled) {
            if (!selectedDate || Object.keys(selectedDate).length === 0) {
                return;
            }
            this.selctedDateEpoch = selectedDate.epoch;
            this.selectedDateString = this.formatDate();
            if (this.mainObj.closeOnSelect) {
                // $scope.mainObj.callback(this.selctedDateEpoch);
                if (this.mainObj.templateType.toLowerCase() === 'popup') ;
                else {
                    this.closeModal(this.selctedDateEpoch);
                }
            }
        }
    }
    // Set today as date for the modal
    /**
     * @return {?}
     */
    setIonicDatePickerTodayDate() {
        // console.log('setIonicDatePickerTodayDate');
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let today = new Date(this.today);
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
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
    /**
     * @return {?}
     */
    setIonicDatePickerDate() {
        // console.log('setIonicDatePickerDate');
        this.closeModal(this.selctedDateEpoch);
    }
    // Setting the disabled dates list.
    /**
     * @param {?} obj
     * @return {?}
     */
    setDisabledDates(obj) {
        // console.log('setDisabledDates =>', obj);
        if (!obj.disabledDates || obj.disabledDates.length === 0) {
            this.disabledDates = [];
        }
        else {
            this.disabledDates = [];
            for (let i = 0; i < obj.disabledDates.length; i++) {
                // val = resetHMSM(new Date(val));
                this.disabledDates.push(this.resetHMSM(new Date(obj.disabledDates[i])).getTime());
            }
        }
    }
    // Refresh the list of the dates of a month
    /**
     * @param {?} currentDate
     * @return {?}
     */
    refreshDateList(currentDate) {
        // console.log('refreshDateList =>', currentDate);
        currentDate = this.resetHMSM(currentDate);
        this.currentDate = currentDate;
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        this.monthsList = [];
        if (this.mainObj.monthsList && this.mainObj.monthsList.length === 12) {
            this.monthsList = this.mainObj.monthsList;
        }
        else {
            this.monthsList = this.monthsList;
        }
        this.yearsList = this.getYearsList(this.mainObj.from, this.mainObj.to);
        this.daysList = [];
        /** @type {?} */
        let tempDate;
        /** @type {?} */
        let disabled;
        this.firstDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
        this.lastDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();
        for (let i = firstDay; i <= lastDay; i++) {
            tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            if (this.fromDate && this.toDate) {
                // tslint:disable-next-line:max-line-length
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
        /** @type {?} */
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
    /**
     * @param {?} event
     * @return {?}
     */
    monthChanged(event) {
        // console.log('monthChanged =>', event);
        if (event && event.target && event.target.value) {
            this.data.currentMonth = event.target.value;
        }
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let monthNumber = this.monthsList.indexOf(this.data.currentMonth);
        this.currentDate.setMonth(monthNumber);
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    }
    // Year changed
    /**
     * @param {?} event
     * @return {?}
     */
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
    /**
     * @param {?} ipObj
     * @return {?}
     */
    setInitialObj(ipObj) {
        // console.log('setInitialObj =>', ipObj);
        this.mainObj = ipObj;
        this.selctedDateEpoch = this.resetHMSM(this.mainObj.inputDate).getTime();
        this.selectedDateString = this.formatDate();
        if (this.mainObj.weeksList && this.mainObj.weeksList.length === 7) {
            this.weeksList = this.mainObj.weeksList;
        }
        else {
            this.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        if (this.mainObj.mondayFirst) {
            this.weeksList.push(this.mainObj.weeksList.shift());
        }
        this.disableWeekdays = this.mainObj.disableWeekDays;
        this.refreshDateList(this.mainObj.inputDate);
        this.setDisabledDates(this.mainObj);
    }
    // for dismiss modal
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    closeModal(selectedDate) {
        // console.log('closeModal => ', selectedDate);
        this.modalCtrl.getTop();
        this.modalCtrl.dismiss({ 'date': selectedDate });
    }
    // close modal button
    /**
     * @return {?}
     */
    closeIonicDatePickerModal() {
        // console.log('closeIonicDatePickerModal');
        this.closeModal(null);
    }
    // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    getYearsList(from, to) {
        // console.log('getYearsList =>', from, to);
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let yearsList = [];
        /** @type {?} */
        let minYear = 1900;
        // let maxYear = 2100;
        // let minYear = 2000;
        /** @type {?} */
        let maxYear = new Date().getFullYear() + 1;
        minYear = from ? new Date(from).getFullYear() : minYear;
        maxYear = to ? new Date(to).getFullYear() : maxYear;
        for (let i = minYear; i <= maxYear; i++) {
            yearsList.push(i);
        }
        return yearsList;
    }
    // Init Date-Picker
    /**
     * @param {?} ipObj
     * @return {?}
     */
    initDatePicker(ipObj) {
        this.fromDate = '';
        this.toDate = '';
        // $scope.mainObj = angular.extend({}, config, ipObj);
        if (this.mainObj.from) {
            this.fromDate = this.resetHMSM(new Date(this.mainObj.from)).getTime();
        }
        if (this.mainObj.to) {
            this.toDate = this.resetHMSM(new Date(this.mainObj.to)).getTime();
        }
        if (ipObj.disableWeekdays && this.config.disableWeekdays) {
            this.mainObj.disableWeekDays = ipObj.disableWeekdays.concat(this.config.disableWeekdays);
        }
        this.setInitialObj(this.mainObj);
    }
    /**
     * @return {?}
     */
    formatDate() {
        /** @type {?} */
        let dd = new Date(this.selctedDateEpoch).getDate();
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        let yyyy = new Date(this.selctedDateEpoch).getFullYear();
        // let mm: any = new Date(this.selctedDateEpoch).getMonth() + 1; // January is 0!
        if (dd < 10) {
            dd = '0' + dd;
        }
        // if (mm < 10) {
        //   mm = '0' + mm;
        // }
        // yyyy-MM-dd
        return yyyy + ' ' + this.config.monthsList[new Date(this.selctedDateEpoch).getMonth()] + ' ' + dd;
    }
}
Ionic4DatepickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'ionic4-ionic4-datepicker-modal',
                template: "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{selectedDateString}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-padding class=\"ionic_datepicker_modal_content\">\n\n  <ion-grid class=\"dp-month-year-container\">\n    <ion-row>\n\n      <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"prevMonth()\">\n        <ion-button [ngClass]=\"{'pointer_events_none':((firstDayEpoch - 86400000) < fromDate)}\">\n          <ion-icon name=\"arrow-back\"></ion-icon>\n        </ion-button>\n      </ion-col>\n\n      <ion-col size=\"9\">\n        <ion-grid>\n          <ion-row>\n            <ion-col size=\"5.5\" no-padding>\n              <select class=\"dp-select\" (change)=\"monthChanged($event)\">\n                <option *ngFor=\"let month of mainObj?.monthsList;\" [selected]=\"data.currentMonth == month\" value=\"{{month}}\">\n                  {{month}}\n                </option>\n              </select>\n              <ion-icon name=\"md-arrow-dropdown\" class=\"dp-down-arrow\"></ion-icon>\n            </ion-col>\n            <ion-col size=\"1\"></ion-col>\n            <ion-col size=\"5.5\" no-padding>\n              <select class=\"dp-select\" (change)=\"yearChanged($event)\">\n                <option *ngFor=\"let year of yearsList;\" [selected]=\"data.currentYear == year\" value=\"{{year}}\">\n                  {{year}}\n                </option>\n              </select>\n              <ion-icon name=\"md-arrow-dropdown\" class=\"dp-down-arrow\"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-col>\n\n      <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"nextMonth()\">\n        <ion-button [ngClass]=\"{'pointer_events_none':((lastDayEpoch + 86400000)> toDate)}\">\n          <ion-icon name=\"arrow-forward\"></ion-icon>\n        </ion-button>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid class=\"dp-weeks-container\" *ngIf=\"daysList\">\n    <ion-row class=\"dp-weeks-name\">\n      <ion-col *ngFor=\"let weekName of mainObj?.weeksList;\">\n        <div class=\"weeks\">{{weekName}}</div>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngFor=\"let row of rows;\" class=\"dp-days-list\">\n      <ion-col *ngFor=\"let col of cols; let i = index ;\" (click)=\"dateSelected(daysList[row + i])\" no-padding [ngClass]=\"{'dp-selecteddate': (daysList[row + i]?.epoch === selctedDateEpoch),\n                                'dp-today' : (daysList[row + i]?.epoch == today),\n                                'disabled' : (daysList[row + i]?.disabled),\n                                'dp-pointer-events-none':((disabledDates.indexOf(daysList[row + i]?.epoch) >= 0) || (daysList[row + i]?.disabled))}\">\n        <div class=\"days\">{{daysList[row + col]?.date}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid no-padding>\n      <ion-row no-padding>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" (click)=\"closeIonicDatePickerModal()\">\n            {{config?.closeLabel}}\n          </ion-button>\n        </ion-col>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" *ngIf=\"mainObj?.showTodayButton\" (click)=\"setIonicDatePickerTodayDate()\">\n            {{config?.todayLabel}}\n          </ion-button>\n        </ion-col>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" *ngIf=\"!mainObj?.closeOnSelect\" (click)=\"setIonicDatePickerDate()\">\n            {{config?.setLabel}}\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>",
                styles: [":host ion-header{height:60px}:host ion-header ion-toolbar{--background:#f9a200!important;height:100%;align-items:center;display:flex;color:#fff}:host ion-header ion-toolbar ion-title{font-size:20px;font-weight:700;text-align:center}:host .ionic_datepicker_modal_content .dp-month-year-container{height:15%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col{display:flex;justify-content:center;align-items:center}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid{width:100%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select{padding:8px 4px;width:100%;border:0;border-radius:0;border-bottom:1.5px solid #f9a200!important;background:0 0;position:relative;text-align:center;text-align-last:center;z-index:1;-webkit-appearance:none}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-down-arrow{position:absolute;width:20%;right:0;height:45%;color:#f9a200!important}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button{--background:transparent!important;--box-shadow:unset!important;color:#f9a200!important}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button.activated{--ion-color-primary-shade:transparent!important;--ion-color-primary-contrast:#737373!important}:host .ionic_datepicker_modal_content .dp-weeks-container{margin:6% 0}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col{display:flex;justify-content:center;padding:15px}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col .weeks{width:14%;display:flex;justify-content:center;font-weight:700}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col{display:flex;justify-content:center;padding:10px}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col .days{width:14%;display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-selecteddate{background:#f9a200!important;color:#fff!important;border-radius:4px;font-weight:500!important}:host .ionic_datepicker_modal_content .dp-today{border-radius:4px;font-weight:500!important;border:1px solid #f9a200!important}:host .ionic_datepicker_modal_content .dp-pointer-events-none{background:0 0;border-radius:4px;font-weight:300}:host .disabled{color:#aaa}:host ion-footer{height:55px!important}:host ion-footer ion-toolbar{height:100%!important;--border-width:0;--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px}:host ion-footer ion-toolbar .toolbar-container{height:100%!important}:host ion-footer ion-toolbar ion-grid{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-grid ion-row{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-grid ion-row ion-col{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-button{--background:#f9a200!important;--border-radius:0;width:100%;height:55px;font-size:16px;font-weight:500!important;color:#fff!important;margin:0}:host ion-footer ion-toolbar ion-button:focus{outline:0}:host ion-footer ion-toolbar ion-button.activated{--background-activated:#e69602!important;--color-activated:white!important}"]
            }] }
];
/** @nocollapse */
Ionic4DatepickerModalComponent.ctorParameters = () => [
    { type: NavParams },
    { type: ModalController }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = () => {
};
/** @type {?} */
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Ionic4DatepickerComponent),
    multi: true
};
class Ionic4DatepickerComponent {
    /**
     * @param {?} modalCtrl
     */
    constructor(modalCtrl) {
        this.modalCtrl = modalCtrl;
        this.selectedDate = {};
        this.innerValue = '';
        // Placeholders for the callbacks which are later provided
        // by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    openDatePicker(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.selectedDate.date = value;
            if (this.inputDate.from) {
                this.selectedDate.from = this.inputDate.from;
            }
            if (this.inputDate.to) {
                this.selectedDate.to = this.inputDate.to;
            }
            // console.log('selectedDate', this.selectedDate);
            // tslint:disable-next-line:prefer-const
            /** @type {?} */
            let objConfig = {};
            objConfig.monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            objConfig.closeOnSelect = false;
            objConfig.templateType = 'popup';
            objConfig.from = this.selectedDate.from ? this.selectedDate.from : '';
            objConfig.to = this.selectedDate.to ? this.selectedDate.to : '';
            objConfig.disableWeekDays = [];
            objConfig.mondayFirst = 1;
            objConfig.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            objConfig.showTodayButton = true;
            // tslint:disable-next-line:triple-equals
            this.selectedDate.date ? objConfig.inputDate = new Date(this.selectedDate.date) : objConfig.inputDate = new Date();
            // console.log('config =>', objConfig);
            // tslint:disable-next-line:prefer-const
            /** @type {?} */
            let datePickerModal = yield this.modalCtrl.create({
                component: Ionic4DatepickerModalComponent,
                cssClass: 'ionic4-datePicker',
                componentProps: { 'mainObj': objConfig }
            });
            yield datePickerModal.present();
            datePickerModal.onDidDismiss()
                .then((data) => {
                // console.log(data);
                if (data.data && data.data.date) {
                    this.selectedDate.date = data.data.date;
                    /** @type {?} */
                    let dd = new Date(data.data.date).getDate();
                    // tslint:disable-next-line:prefer-const
                    /** @type {?} */
                    let yyyy = new Date(data.data.date).getFullYear();
                    /** @type {?} */
                    let mm = new Date(data.data.date).getMonth() + 1;
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    this.value = yyyy + '-' + mm + '-' + dd;
                }
            });
        });
    }
    // get accessor
    /**
     * @return {?}
     */
    get value() {
        return this.innerValue;
    }
    // set accessor including call the onchange callback
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }
    // Set touched on blur
    /**
     * @return {?}
     */
    onBlur() {
        this.onTouchedCallback();
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
}
Ionic4DatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ionic4-datepicker',
                template: "<ion-item (click)=\"openDatePicker(value)\">\n    <input type=\"text\" (focus)=\"$event.preventDefault()\" readonly [(ngModel)]=\"value\" start />\n    <ion-icon name=\"calendar\" end></ion-icon>\n</ion-item>",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [":host ion-item{--background:#d7d7d7;--inner-border-width:0;--border-width:0;--border-radius:4px;margin:8px 0}:host ion-item input{font-size:16px;margin:6px 0;background:#d7d7d7;border:none;width:100%}@media (min-width:768px){:host ion-item input{font-size:18px}}:host ion-item input.has-focus,:host ion-item input:focus{outline:0;box-shadow:unset}:host ion-item ion-icon{color:#737373;margin-right:8px}"]
            }] }
];
/** @nocollapse */
Ionic4DatepickerComponent.ctorParameters = () => [
    { type: ModalController }
];
Ionic4DatepickerComponent.propDecorators = {
    inputDate: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ionic4DatepickerModule {
}
Ionic4DatepickerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Ionic4DatepickerComponent,
                    Ionic4DatepickerModalComponent
                ],
                imports: [
                    FormsModule,
                    ReactiveFormsModule,
                    CommonModule,
                    IonicModule
                ],
                exports: [
                    Ionic4DatepickerComponent,
                    Ionic4DatepickerModalComponent
                ],
                entryComponents: [
                    Ionic4DatepickerModalComponent
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ionic4DatepickerService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, Ionic4DatepickerComponent, Ionic4DatepickerModule, Ionic4DatepickerModalComponent as ɵa };

//# sourceMappingURL=ionic4-datepicker.js.map