/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
export class Ionic4DatepickerModalComponent {
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
                if (this.mainObj.templateType.toLowerCase() === 'popup') {
                    // this.popup.close();
                }
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
if (false) {
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.config;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.currentDate;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.today;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.mainObj;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selctedDateEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.firstDayEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.lastDayEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.disabledDates;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.fromDate;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.toDate;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.disableWeekdays;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.data;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.currentYearSelected;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.numColumns;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.rows;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.cols;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.monthsList;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.weeksList;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.yearsList;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.daysList;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selectedDateString;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerModalComponent.prototype.navParams;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerModalComponent.prototype.modalCtrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPNUQsTUFBTSxPQUFPLDhCQUE4Qjs7Ozs7O0lBOER6QyxZQUNVLFNBQW9CLEVBQ3BCLFNBQTBCO1FBRDFCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7O1FBN0RwQyxXQUFNLEdBQUc7WUFDUCxVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixXQUFXLEVBQUUsSUFBSTtZQUNqQixTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDOUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDdkcsWUFBWSxFQUFFLE9BQU87WUFDckIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsZUFBZSxFQUFFLEVBQUU7U0FDcEIsQ0FBQzs7UUFNRixZQUFPLEdB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QUFDLENBQUMsV0FBVyxFQUFFO1FBQ3hELGlGQUFpRjtRQUNqRixJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDWCxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNmO1FBQ0QsaUJBQWlCO1FBQ2pCLG1CQUFtQjtRQUNuQixJQUFJO1FBQ0osYUFBYTtRQUNiLE9BQU8sSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDcEcsQ0FBQzs7O1lBcFdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0NBQWdDO2dCQUMxQyxtckhBQXVEOzthQUV4RDs7OztZQU5RLFNBQVM7WUFBRSxlQUFlOzs7O0lBVWpDLGdEQWFFOztJQUVGLHFEQUFZOztJQUNaLCtDQUFNOztJQUdOLGlEQVdFOztJQUdGLDBEQUFpQjs7SUFDakIsdURBQWM7O0lBQ2Qsc0RBQWE7O0lBQ2IsdURBQW1COztJQUNuQixrREFBUzs7SUFDVCxnREFBTzs7SUFDUCx5REFBcUI7O0lBQ3JCLDhDQUlFOztJQUNGLDZEQUFvQjs7SUFDcEIsb0RBQVc7O0lBRVgsOENBQThCOztJQUM5Qiw4Q0FBNkI7O0lBQzdCLG9EQUF3STs7SUFDeEksbURBQWdEOztJQUNoRCxtREFBZTs7SUFDZixrREFBYzs7SUFHZCw0REFBbUI7Ozs7O0lBSWpCLG1EQUE0Qjs7Ozs7SUFDNUIsbURBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdlBhcmFtcywgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb25pYzQtaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIElvbmljNERhdGVwaWNrZXJNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLy8gZGVmYXVsdCBjb25maWdcbiAgY29uZmlnID0ge1xuICAgIHRpdGxlTGFiZWw6IG51bGwsXG4gICAgc2V0TGFiZWw6ICdTZXQnLFxuICAgIHRvZGF5TGFiZWw6ICdUb2RheScsXG4gICAgY2xvc2VMYWJlbDogJ0Nsb3NlJyxcbiAgICBpbnB1dERhdGU6IG5ldyBEYXRlKCksXG4gICAgbW9uZGF5Rmlyc3Q6IHRydWUsXG4gICAgd2Vla3NMaXN0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgICBtb250aHNMaXN0OiBbJ0phbicsICdGZWInLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICAgIHRlbXBsYXRlVHlwZTogJ3BvcHVwJyxcbiAgICBzaG93VG9kYXlCdXR0b246IGZhbHNlLFxuICAgIGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxuICAgIGRpc2FibGVXZWVrZGF5czogW11cbiAgfTtcblxuICBjdXJyZW50RGF0ZTtcbiAgdG9kYXk7XG5cbiAgLy8gaW5wdXRzXG4gIG1haW5PYmo6IGFueSA9IHtcbiAgICAvLyBpbnB1dERhdGU6IG5ldyBEYXRlKCksXG4gICAgLy8gbW9udGhzTGlzdDogWydKYW4nLCAnRmViJywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgICAvLyBjbG9zZU9uU2VsZWN0OiBmYWxzZSxcbiAgICAvLyB0ZW1wbGF0ZVR5cGU6ICdwb3B1cCcsXG4gICAgLy8gZnJvbTogJycsXG4gICAgLy8gdG86ICcnLFxuICAgIC8vIGRpc2FibGVXZWVrRGF5czogW10sXG4gICAgLy8gbW9uZGF5Rmlyc3Q6IDEsXG4gICAgLy8gd2Vla3NMaXN0OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgICAvLyBzaG93VG9kYXlCdXR0b246IHRydWUsXG4gIH07XG5cbiAgLy8gY29tcG9uZW50IHZhcmlhYmxlc1xuICBzZWxjdGVkRGF0ZUVwb2NoO1xuICBmaXJzdERheUVwb2NoO1xuICBsYXN0RGF5RXBvY2g7XG4gIGRpc2FibGVkRGF0ZXMgPSBbXTtcbiAgZnJvbURhdGU7XG4gIHRvRGF0ZTtcbiAgZGlzYWJsZVdlZWtkYXlzID0gW107XG4gIGRhdGE6IGFueSA9IHtcbiAgICBjdXJyZW50TW9udGg6ICcnLFxuICAgIGN1cnJlbnRZZWFyOiAnJyxcbiAgICBjdXJyZW50TW9udGhTZWxlY3RlZDogJydcbiAgfTtcbiAgY3VycmVudFllYXJTZWxlY3RlZDtcbiAgbnVtQ29sdW1ucztcblxuICByb3dzID0gWzAsIDcsIDE0LCAyMSwgMjgsIDM1XTtcbiAgY29scyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2XTtcbiAgbW9udGhzTGlzdCA9IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddO1xuICB3ZWVrc0xpc3QgPSBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXTtcbiAgeWVhcnNMaXN0ID0gW107XG4gIGRheXNMaXN0ID0gW107XG5cbiAgLy9cbiAgc2VsZWN0ZWREYXRlU3RyaW5nO1xuICAvL1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmF2UGFyYW1zOiBOYXZQYXJhbXMsXG4gICAgcHJpdmF0ZSBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlclxuICApIHtcbiAgICB0aGlzLnRvZGF5ID0gdGhpcy5yZXNldEhNU00obmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgIHRoaXMubWFpbk9iaiA9IHRoaXMubmF2UGFyYW1zLmdldCgnbWFpbk9iaicpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5pbml0RGF0ZVBpY2tlcih0aGlzLm1haW5PYmopO1xuICB9XG5cbiAgLy8gUmVzZXQgdGhlIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzIGFuZCBtaWxsaSBzZWNvbmRzXG4gIHJlc2V0SE1TTShjdXJyZW50RGF0ZSkge1xuICAgIGN1cnJlbnREYXRlLnNldEhvdXJzKDApO1xuICAgIGN1cnJlbnREYXRlLnNldE1pbnV0ZXMoMCk7XG4gICAgY3VycmVudERhdGUuc2V0U2Vjb25kcygwKTtcbiAgICBjdXJyZW50RGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XG4gICAgcmV0dXJuIGN1cnJlbnREYXRlO1xuICB9XG5cbiAgLy8gUHJldmlvdXMgbW9udGhcbiAgcHJldk1vbnRoKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdwcmV2TmV4dCcsIHRoaXMuY3VycmVudERhdGUpO1xuICAgIGlmICh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgPT09IDEpIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RnVsbFllYXIodGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRNb250aCh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgLSAxKTtcbiAgICB0aGlzLmRhdGEuY3VycmVudE1vbnRoID0gdGhpcy5tYWluT2JqLm1vbnRoc0xpc3RbdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpXTtcbiAgICB0aGlzLmRhdGEuY3VycmVudFllYXIgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgLy8gdGhpcy5jaGFuZ2VEYXlTZWxlY3RlZCgpO1xuICB9XG5cbiAgLy8gTmV4dCBtb250aFxuICBuZXh0TW9udGgoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ25leHROZXh0JywgdGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgaWYgKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSA9PT0gMTEpIHtcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RnVsbFllYXIodGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKDEpO1xuICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSk7XG4gICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IHRoaXMubWFpbk9iai5tb250aHNMaXN0W3RoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKV07XG4gICAgdGhpcy5kYXRhLmN1cnJlbnRZZWFyID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMubW9udGhDaGFuZ2VkKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSk7XG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgLy8gdGhpcy5jaGFuZ2VEYXlTZWxlY3RlZCgpO1xuICB9XG5cbiAgLy8gY2hhbmdlRGF5U2VsZWN0ZWQgKCBkYXkgc2VsZWN0aW9uIGNoYW5nZXMgKVxuICBjaGFuZ2VEYXlTZWxlY3RlZCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnY2hhbmdlRGF5U2VsZWN0ZWQnKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgbGV0IG5ld1NlbGVjdGVkRGF0ZTogYW55ID0gbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKTtcbiAgICBuZXdTZWxlY3RlZERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKTtcbiAgICBuZXdTZWxlY3RlZERhdGUuc2V0WWVhcih0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xuXG4gICAgdGhpcy5zZWxjdGVkRGF0ZUVwb2NoID0gbmV3U2VsZWN0ZWREYXRlLmdldFRpbWUoKTtcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZVN0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZSgpO1xuICAgIC8vIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICB9XG5cbiAgLy8gRGF0ZSBzZWxlY3RlZFxuICBkYXRlU2VsZWN0ZWQoc2VsZWN0ZWREYXRlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2RhdGVTZWxlY3RlZCA9PicsIHNlbGVjdGVkRGF0ZSk7XG4gICAgaWYgKCFzZWxlY3RlZERhdGUuZGlzYWJsZWQpIHtcbiAgICAgIGlmICghc2VsZWN0ZWREYXRlIHx8IE9iamVjdC5rZXlzKHNlbGVjdGVkRGF0ZSkubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgdGhpcy5zZWxjdGVkRGF0ZUVwb2NoID0gc2VsZWN0ZWREYXRlLmVwb2NoO1xuICAgICAgdGhpcy5zZWxlY3RlZERhdGVTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGUoKTtcbiAgICAgIGlmICh0aGlzLm1haW5PYmouY2xvc2VPblNlbGVjdCkge1xuICAgICAgICAvLyAkc2NvcGUubWFpbk9iai5jYWxsYmFjayh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICAgICAgICBpZiAodGhpcy5tYWluT2JqLnRlbXBsYXRlVHlwZS50b0xvd2VyQ2FzZSgpID09PSAncG9wdXAnKSB7XG4gICAgICAgICAgLy8gdGhpcy5wb3B1cC5jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gU2V0IHRvZGF5IGFzIGRhdGUgZm9yIHRoZSBtb2RhbFxuICBzZXRJb25pY0RhdGVQaWNrZXJUb2RheURhdGUoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3NldElvbmljRGF0ZVBpY2tlclRvZGF5RGF0ZScpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSh0aGlzLnRvZGF5KTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgbGV0IHRvZGF5X29iaiA9IHtcbiAgICAgIGRhdGU6IHRvZGF5LmdldERhdGUoKSxcbiAgICAgIG1vbnRoOiB0b2RheS5nZXRNb250aCgpLFxuICAgICAgeWVhcjogdG9kYXkuZ2V0RnVsbFllYXIoKSxcbiAgICAgIGRheTogdG9kYXkuZ2V0RGF5KCksXG4gICAgICBlcG9jaDogdG9kYXkuZ2V0VGltZSgpLFxuICAgICAgZGlzYWJsZWQ6IGZhbHNlXG4gICAgfTtcbiAgICB0aGlzLmRhdGVTZWxlY3RlZCh0b2RheV9vYmopO1xuICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KG5ldyBEYXRlKCkpO1xuICAgIHRoaXMuc2VsY3RlZERhdGVFcG9jaCA9IHRoaXMucmVzZXRITVNNKHRvZGF5KS5nZXRUaW1lKCk7XG4gICAgdGhpcy5zZWxlY3RlZERhdGVTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGUoKTtcbiAgICAvLyB0aGlzLmNsb3NlTW9kYWwodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKTtcbiAgfVxuXG4gIC8vIFNldCBkYXRlIGZvciB0aGUgbW9kYWxcbiAgc2V0SW9uaWNEYXRlUGlja2VyRGF0ZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0SW9uaWNEYXRlUGlja2VyRGF0ZScpO1xuICAgIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICB9XG5cbiAgLy8gU2V0dGluZyB0aGUgZGlzYWJsZWQgZGF0ZXMgbGlzdC5cbiAgc2V0RGlzYWJsZWREYXRlcyhvYmopIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0RGlzYWJsZWREYXRlcyA9PicsIG9iaik7XG4gICAgaWYgKCFvYmouZGlzYWJsZWREYXRlcyB8fCBvYmouZGlzYWJsZWREYXRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuZGlzYWJsZWREYXRlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRpc2FibGVkRGF0ZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRpc2FibGVkRGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gdmFsID0gcmVzZXRITVNNKG5ldyBEYXRlKHZhbCkpO1xuICAgICAgICB0aGlzLmRpc2FibGVkRGF0ZXMucHVzaCh0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZShvYmouZGlzYWJsZWREYXRlc1tpXSkpLmdldFRpbWUoKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmVmcmVzaCB0aGUgbGlzdCBvZiB0aGUgZGF0ZXMgb2YgYSBtb250aFxuICByZWZyZXNoRGF0ZUxpc3QoY3VycmVudERhdGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygncmVmcmVzaERhdGVMaXN0ID0+JywgY3VycmVudERhdGUpO1xuICAgIGN1cnJlbnREYXRlID0gdGhpcy5yZXNldEhNU00oY3VycmVudERhdGUpO1xuICAgIHRoaXMuY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCAxKS5nZXREYXRlKCk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCBsYXN0RGF5ID0gbmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcblxuICAgIHRoaXMubW9udGhzTGlzdCA9IFtdO1xuICAgIGlmICh0aGlzLm1haW5PYmoubW9udGhzTGlzdCAmJiB0aGlzLm1haW5PYmoubW9udGhzTGlzdC5sZW5ndGggPT09IDEyKSB7XG4gICAgICB0aGlzLm1vbnRoc0xpc3QgPSB0aGlzLm1haW5PYmoubW9udGhzTGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb250aHNMaXN0ID0gdGhpcy5tb250aHNMaXN0O1xuICAgIH1cblxuICAgIHRoaXMueWVhcnNMaXN0ID0gdGhpcy5nZXRZZWFyc0xpc3QodGhpcy5tYWluT2JqLmZyb20sIHRoaXMubWFpbk9iai50byk7XG5cbiAgICB0aGlzLmRheXNMaXN0ID0gW107XG5cbiAgICBsZXQgdGVtcERhdGUsIGRpc2FibGVkO1xuXG4gICAgdGhpcy5maXJzdERheUVwb2NoID0gdGhpcy5yZXNldEhNU00obmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgZmlyc3REYXkpKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5sYXN0RGF5RXBvY2ggPSB0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBsYXN0RGF5KSkuZ2V0VGltZSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0RGF5OyBpIDw9IGxhc3REYXk7IGkrKykge1xuICAgICAgdGVtcERhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBpKTtcblxuICAgICAgaWYgKHRoaXMuZnJvbURhdGUgJiYgdGhpcy50b0RhdGUpIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgICBkaXNhYmxlZCA9ICh0ZW1wRGF0ZS5nZXRUaW1lKCkgPCB0aGlzLmZyb21EYXRlKSB8fCAodGVtcERhdGUuZ2V0VGltZSgpID4gdGhpcy50b0RhdGUpIHx8IHRoaXMubWFpbk9iai5kaXNhYmxlV2Vla0RheXMuaW5kZXhPZih0ZW1wRGF0ZS5nZXREYXkoKSkgPj0gMDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kYXlzTGlzdC5wdXNoKHtcbiAgICAgICAgZGF0ZTogdGVtcERhdGUuZ2V0RGF0ZSgpLFxuICAgICAgICBtb250aDogdGVtcERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgeWVhcjogdGVtcERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgZGF5OiB0ZW1wRGF0ZS5nZXREYXkoKSxcbiAgICAgICAgZXBvY2g6IHRlbXBEYXRlLmdldFRpbWUoKSxcbiAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBUbyBzZXQgTW9uZGF5IGFzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgbGV0IGZpcnN0RGF5TW9uZGF5ID0gdGhpcy5kYXlzTGlzdFswXS5kYXkgLSB0aGlzLm1haW5PYmoubW9uZGF5Rmlyc3Q7XG4gICAgZmlyc3REYXlNb25kYXkgPSAoZmlyc3REYXlNb25kYXkgPCAwKSA/IDYgOiBmaXJzdERheU1vbmRheTtcblxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZmlyc3REYXlNb25kYXk7IGorKykge1xuICAgICAgdGhpcy5kYXlzTGlzdC51bnNoaWZ0KHt9KTtcbiAgICB9XG5cbiAgICB0aGlzLnJvd3MgPSBbMCwgNywgMTQsIDIxLCAyOCwgMzVdO1xuICAgIHRoaXMuY29scyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2XTtcblxuICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGggPSB0aGlzLm1haW5PYmoubW9udGhzTGlzdFtjdXJyZW50RGF0ZS5nZXRNb250aCgpXTtcbiAgICB0aGlzLmRhdGEuY3VycmVudFllYXIgPSBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGhTZWxlY3RlZCA9IHRoaXMuZGF0YS5jdXJyZW50TW9udGg7XG4gICAgdGhpcy5jdXJyZW50WWVhclNlbGVjdGVkID0gdGhpcy5kYXRhLmN1cnJlbnRZZWFyO1xuICAgIHRoaXMubnVtQ29sdW1ucyA9IDc7XG4gIH1cblxuICAvLyBNb250aCBjaGFuZ2VkXG4gIG1vbnRoQ2hhbmdlZChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdtb250aENoYW5nZWQgPT4nLCBldmVudCk7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGggPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgfVxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgbW9udGhOdW1iZXIgPSB0aGlzLm1vbnRoc0xpc3QuaW5kZXhPZih0aGlzLmRhdGEuY3VycmVudE1vbnRoKTtcbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldE1vbnRoKG1vbnRoTnVtYmVyKTtcbiAgICB0aGlzLnJlZnJlc2hEYXRlTGlzdCh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAvLyB0aGlzLmNoYW5nZURheVNlbGVjdGVkKCk7XG4gIH1cblxuICAvLyBZZWFyIGNoYW5nZWRcbiAgeWVhckNoYW5nZWQoZXZlbnQpIHtcbiAgICAvLyBjb25zb2xlLmxvZygneWVhckNoYW5nZWQgPT4nLCBldmVudCk7XG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgIHRoaXMuZGF0YS5jdXJyZW50WWVhciA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRGdWxsWWVhcih0aGlzLmRhdGEuY3VycmVudFllYXIpO1xuICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIC8vIHRoaXMuY2hhbmdlRGF5U2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8vIFNldHRpbmcgdXAgdGhlIGluaXRpYWwgb2JqZWN0XG4gIHNldEluaXRpYWxPYmooaXBPYmopIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0SW5pdGlhbE9iaiA9PicsIGlwT2JqKTtcbiAgICB0aGlzLm1haW5PYmogPSBpcE9iajtcbiAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSB0aGlzLnJlc2V0SE1TTSh0aGlzLm1haW5PYmouaW5wdXREYXRlKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5zZWxlY3RlZERhdGVTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGUoKTtcblxuICAgIGlmICh0aGlzLm1haW5PYmoud2Vla3NMaXN0ICYmIHRoaXMubWFpbk9iai53ZWVrc0xpc3QubGVuZ3RoID09PSA3KSB7XG4gICAgICB0aGlzLndlZWtzTGlzdCA9IHRoaXMubWFpbk9iai53ZWVrc0xpc3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2Vla3NMaXN0ID0gWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ107XG4gICAgfVxuICAgIGlmICh0aGlzLm1haW5PYmoubW9uZGF5Rmlyc3QpIHtcbiAgICAgIHRoaXMud2Vla3NMaXN0LnB1c2godGhpcy5tYWluT2JqLndlZWtzTGlzdC5zaGlmdCgpKTtcbiAgICB9XG4gICAgdGhpcy5kaXNhYmxlV2Vla2RheXMgPSB0aGlzLm1haW5PYmouZGlzYWJsZVdlZWtEYXlzO1xuXG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QodGhpcy5tYWluT2JqLmlucHV0RGF0ZSk7XG4gICAgdGhpcy5zZXREaXNhYmxlZERhdGVzKHRoaXMubWFpbk9iaik7XG4gIH1cblxuICAvLyBmb3IgZGlzbWlzcyBtb2RhbFxuICBjbG9zZU1vZGFsKHNlbGVjdGVkRGF0ZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdjbG9zZU1vZGFsID0+ICcsIHNlbGVjdGVkRGF0ZSk7XG4gICAgdGhpcy5tb2RhbEN0cmwuZ2V0VG9wKCk7XG4gICAgdGhpcy5tb2RhbEN0cmwuZGlzbWlzcyh7ICdkYXRlJzogc2VsZWN0ZWREYXRlIH0pO1xuICB9XG5cbiAgLy8gY2xvc2UgbW9kYWwgYnV0dG9uXG4gIGNsb3NlSW9uaWNEYXRlUGlja2VyTW9kYWwoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlSW9uaWNEYXRlUGlja2VyTW9kYWwnKTtcbiAgICB0aGlzLmNsb3NlTW9kYWwobnVsbCk7XG4gIH1cblxuICAvLyBnZXQgeWVhcnMgbGlzdCAgKCBHSVZFIEhFUkUgTUlOIE9SIE1BWCBZRUFSIElOIERBVEVfUElDS0VSIClcbiAgZ2V0WWVhcnNMaXN0KGZyb20sIHRvKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2dldFllYXJzTGlzdCA9PicsIGZyb20sIHRvKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgbGV0IHllYXJzTGlzdCA9IFtdO1xuICAgIGxldCBtaW5ZZWFyID0gMTkwMDtcbiAgICAvLyBsZXQgbWF4WWVhciA9IDIxMDA7XG4gICAgLy8gbGV0IG1pblllYXIgPSAyMDAwO1xuICAgIGxldCBtYXhZZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpICsgMTtcbiAgICBtaW5ZZWFyID0gZnJvbSA/IG5ldyBEYXRlKGZyb20pLmdldEZ1bGxZZWFyKCkgOiBtaW5ZZWFyO1xuICAgIG1heFllYXIgPSB0byA/IG5ldyBEYXRlKHRvKS5nZXRGdWxsWWVhcigpIDogbWF4WWVhcjtcbiAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcbiAgICAgIHllYXJzTGlzdC5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4geWVhcnNMaXN0O1xuICB9XG5cbiAgLy8gSW5pdCBEYXRlLVBpY2tlclxuICBpbml0RGF0ZVBpY2tlcihpcE9iaikge1xuICAgIHRoaXMuZnJvbURhdGUgPSAnJztcbiAgICB0aGlzLnRvRGF0ZSA9ICcnO1xuICAgIC8vICRzY29wZS5tYWluT2JqID0gYW5ndWxhci5leHRlbmQoe30sIGNvbmZpZywgaXBPYmopO1xuICAgIGlmICh0aGlzLm1haW5PYmouZnJvbSkge1xuICAgICAgdGhpcy5mcm9tRGF0ZSA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKHRoaXMubWFpbk9iai5mcm9tKSkuZ2V0VGltZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5tYWluT2JqLnRvKSB7XG4gICAgICB0aGlzLnRvRGF0ZSA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKHRoaXMubWFpbk9iai50bykpLmdldFRpbWUoKTtcbiAgICB9XG4gICAgaWYgKGlwT2JqLmRpc2FibGVXZWVrZGF5cyAmJiB0aGlzLmNvbmZpZy5kaXNhYmxlV2Vla2RheXMpIHtcbiAgICAgIHRoaXMubWFpbk9iai5kaXNhYmxlV2Vla0RheXMgPSBpcE9iai5kaXNhYmxlV2Vla2RheXMuY29uY2F0KHRoaXMuY29uZmlnLmRpc2FibGVXZWVrZGF5cyk7XG4gICAgfVxuICAgIHRoaXMuc2V0SW5pdGlhbE9iaih0aGlzLm1haW5PYmopO1xuICB9XG5cbiAgZm9ybWF0RGF0ZSgpIHtcbiAgICBsZXQgZGQ6IGFueSA9IG5ldyBEYXRlKHRoaXMuc2VsY3RlZERhdGVFcG9jaCkuZ2V0RGF0ZSgpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgeXl5eSA9IG5ldyBEYXRlKHRoaXMuc2VsY3RlZERhdGVFcG9jaCkuZ2V0RnVsbFllYXIoKTtcbiAgICAvLyBsZXQgbW06IGFueSA9IG5ldyBEYXRlKHRoaXMuc2VsY3RlZERhdGVFcG9jaCkuZ2V0TW9udGgoKSArIDE7IC8vIEphbnVhcnkgaXMgMCFcbiAgICBpZiAoZGQgPCAxMCkge1xuICAgICAgZGQgPSAnMCcgKyBkZDtcbiAgICB9XG4gICAgLy8gaWYgKG1tIDwgMTApIHtcbiAgICAvLyAgIG1tID0gJzAnICsgbW07XG4gICAgLy8gfVxuICAgIC8vIHl5eXktTU0tZGRcbiAgICByZXR1cm4geXl5eSArICcgJyArIHRoaXMuY29uZmlnLm1vbnRoc0xpc3RbbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKS5nZXRNb250aCgpXSArICcgJyArIGRkO1xuICB9XG59XG4iXX0=