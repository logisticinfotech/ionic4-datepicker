/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
var Ionic4DatepickerModalComponent = /** @class */ (function () {
    //
    function Ionic4DatepickerModalComponent(navParams, modalCtrl) {
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
    Ionic4DatepickerModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initDatePicker(this.mainObj);
    };
    // Reset the hours, minutes, seconds and milli seconds
    // Reset the hours, minutes, seconds and milli seconds
    /**
     * @param {?} currentDate
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.resetHMSM = 
    // Reset the hours, minutes, seconds and milli seconds
    /**
     * @param {?} currentDate
     * @return {?}
     */
    function (currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
    };
    // Previous month
    // Previous month
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.prevMonth = 
    // Previous month
    /**
     * @return {?}
     */
    function () {
        // console.log('prevNext', this.currentDate);
        if (this.currentDate.getMonth() === 1) {
            this.currentDate.setFullYear(this.currentDate.getFullYear());
        }
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.data.currentMonth = this.mainObj.monthsList[this.currentDate.getMonth()];
        this.data.currentYear = this.currentDate.getFullYear();
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    };
    // Next month
    // Next month
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.nextMonth = 
    // Next month
    /**
     * @return {?}
     */
    function () {
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
    };
    // changeDaySelected ( day selection changes )
    // changeDaySelected ( day selection changes )
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.changeDaySelected = 
    // changeDaySelected ( day selection changes )
    /**
     * @return {?}
     */
    function () {
        // console.log('changeDaySelected');
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var newSelectedDate = new Date(this.selctedDateEpoch);
        newSelectedDate.setMonth(this.currentDate.getMonth());
        newSelectedDate.setYear(this.currentDate.getFullYear());
        this.selctedDateEpoch = newSelectedDate.getTime();
        this.selectedDateString = this.formatDate();
        // this.closeModal(this.selctedDateEpoch);
    };
    // Date selected
    // Date selected
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.dateSelected = 
    // Date selected
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    function (selectedDate) {
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
    };
    // Set today as date for the modal
    // Set today as date for the modal
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.setIonicDatePickerTodayDate = 
    // Set today as date for the modal
    /**
     * @return {?}
     */
    function () {
        // console.log('setIonicDatePickerTodayDate');
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var today = new Date(this.today);
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var today_obj = {
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
    };
    // Set date for the modal
    // Set date for the modal
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.setIonicDatePickerDate = 
    // Set date for the modal
    /**
     * @return {?}
     */
    function () {
        // console.log('setIonicDatePickerDate');
        this.closeModal(this.selctedDateEpoch);
    };
    // Setting the disabled dates list.
    // Setting the disabled dates list.
    /**
     * @param {?} obj
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.setDisabledDates = 
    // Setting the disabled dates list.
    /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        // console.log('setDisabledDates =>', obj);
        if (!obj.disabledDates || obj.disabledDates.length === 0) {
            this.disabledDates = [];
        }
        else {
            this.disabledDates = [];
            for (var i = 0; i < obj.disabledDates.length; i++) {
                // val = resetHMSM(new Date(val));
                this.disabledDates.push(this.resetHMSM(new Date(obj.disabledDates[i])).getTime());
            }
        }
    };
    // Refresh the list of the dates of a month
    // Refresh the list of the dates of a month
    /**
     * @param {?} currentDate
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.refreshDateList = 
    // Refresh the list of the dates of a month
    /**
     * @param {?} currentDate
     * @return {?}
     */
    function (currentDate) {
        // console.log('refreshDateList =>', currentDate);
        currentDate = this.resetHMSM(currentDate);
        this.currentDate = currentDate;
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
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
        var tempDate;
        /** @type {?} */
        var disabled;
        this.firstDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
        this.lastDayEpoch = this.resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();
        for (var i = firstDay; i <= lastDay; i++) {
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
        var firstDayMonday = this.daysList[0].day - this.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;
        for (var j = 0; j < firstDayMonday; j++) {
            this.daysList.unshift({});
        }
        this.rows = [0, 7, 14, 21, 28, 35];
        this.cols = [0, 1, 2, 3, 4, 5, 6];
        this.data.currentMonth = this.mainObj.monthsList[currentDate.getMonth()];
        this.data.currentYear = currentDate.getFullYear();
        this.data.currentMonthSelected = this.data.currentMonth;
        this.currentYearSelected = this.data.currentYear;
        this.numColumns = 7;
    };
    // Month changed
    // Month changed
    /**
     * @param {?} event
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.monthChanged = 
    // Month changed
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('monthChanged =>', event);
        if (event && event.target && event.target.value) {
            this.data.currentMonth = event.target.value;
        }
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var monthNumber = this.monthsList.indexOf(this.data.currentMonth);
        this.currentDate.setMonth(monthNumber);
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    };
    // Year changed
    // Year changed
    /**
     * @param {?} event
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.yearChanged = 
    // Year changed
    /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // console.log('yearChanged =>', event);
        if (event && event.target && event.target.value) {
            this.data.currentYear = event.target.value;
        }
        this.currentDate.setFullYear(this.data.currentYear);
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    };
    // Setting up the initial object
    // Setting up the initial object
    /**
     * @param {?} ipObj
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.setInitialObj = 
    // Setting up the initial object
    /**
     * @param {?} ipObj
     * @return {?}
     */
    function (ipObj) {
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
    };
    // for dismiss modal
    // for dismiss modal
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.closeModal = 
    // for dismiss modal
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    function (selectedDate) {
        // console.log('closeModal => ', selectedDate);
        this.modalCtrl.getTop();
        this.modalCtrl.dismiss({ 'date': selectedDate });
    };
    // close modal button
    // close modal button
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.closeIonicDatePickerModal = 
    // close modal button
    /**
     * @return {?}
     */
    function () {
        // console.log('closeIonicDatePickerModal');
        this.closeModal(null);
    };
    // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
    // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.getYearsList = 
    // get years list  ( GIVE HERE MIN OR MAX YEAR IN DATE_PICKER )
    /**
     * @param {?} from
     * @param {?} to
     * @return {?}
     */
    function (from, to) {
        // console.log('getYearsList =>', from, to);
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var yearsList = [];
        /** @type {?} */
        var minYear = 1900;
        // let maxYear = 2100;
        // let minYear = 2000;
        /** @type {?} */
        var maxYear = new Date().getFullYear() + 1;
        minYear = from ? new Date(from).getFullYear() : minYear;
        maxYear = to ? new Date(to).getFullYear() : maxYear;
        for (var i = minYear; i <= maxYear; i++) {
            yearsList.push(i);
        }
        return yearsList;
    };
    // Init Date-Picker
    // Init Date-Picker
    /**
     * @param {?} ipObj
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.initDatePicker = 
    // Init Date-Picker
    /**
     * @param {?} ipObj
     * @return {?}
     */
    function (ipObj) {
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
    };
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.formatDate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var dd = new Date(this.selctedDateEpoch).getDate();
        // tslint:disable-next-line:prefer-const
        /** @type {?} */
        var yyyy = new Date(this.selctedDateEpoch).getFullYear();
        // let mm: any = new Date(this.selctedDateEpoch).getMonth() + 1; // January is 0!
        if (dd < 10) {
            dd = '0' + dd;
        }
        // if (mm < 10) {
        //   mm = '0' + mm;
        // }
        // yyyy-MM-dd
        return yyyy + ' ' + this.config.monthsList[new Date(this.selctedDateEpoch).getMonth()] + ' ' + dd;
    };
    Ionic4DatepickerModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ionic4-ionic4-datepicker-modal',
                    template: "<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      {{selectedDateString}}\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-padding class=\"ionic_datepicker_modal_content\">\n\n  <ion-grid class=\"dp-month-year-container\">\n    <ion-row>\n\n      <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"prevMonth()\">\n        <ion-button [ngClass]=\"{'pointer_events_none':((firstDayEpoch - 86400000) < fromDate)}\">\n          <ion-icon name=\"arrow-back\"></ion-icon>\n        </ion-button>\n      </ion-col>\n\n      <ion-col size=\"9\">\n        <ion-grid>\n          <ion-row>\n            <ion-col size=\"5.5\" no-padding>\n              <select class=\"dp-select\" (change)=\"monthChanged($event)\">\n                <option *ngFor=\"let month of mainObj?.monthsList;\" [selected]=\"data.currentMonth == month\" value=\"{{month}}\">\n                  {{month}}\n                </option>\n              </select>\n              <ion-icon name=\"md-arrow-dropdown\" class=\"dp-down-arrow\"></ion-icon>\n            </ion-col>\n            <ion-col size=\"1\"></ion-col>\n            <ion-col size=\"5.5\" no-padding>\n              <select class=\"dp-select\" (change)=\"yearChanged($event)\">\n                <option *ngFor=\"let year of yearsList;\" [selected]=\"data.currentYear == year\" value=\"{{year}}\">\n                  {{year}}\n                </option>\n              </select>\n              <ion-icon name=\"md-arrow-dropdown\" class=\"dp-down-arrow\"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-col>\n\n      <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"nextMonth()\">\n        <ion-button [ngClass]=\"{'pointer_events_none':((lastDayEpoch + 86400000)> toDate)}\">\n          <ion-icon name=\"arrow-forward\"></ion-icon>\n        </ion-button>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid class=\"dp-weeks-container\" *ngIf=\"daysList\">\n    <ion-row class=\"dp-weeks-name\">\n      <ion-col *ngFor=\"let weekName of mainObj?.weeksList;\">\n        <div class=\"weeks\">{{weekName}}</div>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngFor=\"let row of rows;\" class=\"dp-days-list\">\n      <ion-col *ngFor=\"let col of cols; let i = index ;\" (click)=\"dateSelected(daysList[row + i])\" no-padding [ngClass]=\"{'dp-selecteddate': (daysList[row + i]?.epoch === selctedDateEpoch),\n                                'dp-today' : (daysList[row + i]?.epoch == today),\n                                'disabled' : (daysList[row + i]?.disabled),\n                                'dp-pointer-events-none':((disabledDates.indexOf(daysList[row + i]?.epoch) >= 0) || (daysList[row + i]?.disabled))}\">\n        <div class=\"days\">{{daysList[row + col]?.date}}</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid no-padding>\n      <ion-row no-padding>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" (click)=\"closeIonicDatePickerModal()\">\n            {{config?.closeLabel}}\n          </ion-button>\n        </ion-col>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" *ngIf=\"mainObj?.showTodayButton\" (click)=\"setIonicDatePickerTodayDate()\">\n            {{config?.todayLabel}}\n          </ion-button>\n        </ion-col>\n        <ion-col size=\"4\" no-padding>\n          <ion-button class=\"ion-button dp-buttons\" *ngIf=\"!mainObj?.closeOnSelect\" (click)=\"setIonicDatePickerDate()\">\n            {{config?.setLabel}}\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>",
                    styles: [":host ion-header{height:60px}:host ion-header ion-toolbar{--background:#f9a200!important;height:100%;align-items:center;display:flex;color:#fff}:host ion-header ion-toolbar ion-title{font-size:20px;font-weight:700;text-align:center}:host .ionic_datepicker_modal_content .dp-month-year-container{height:15%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col{display:flex;justify-content:center;align-items:center}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid{width:100%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select{padding:8px 4px;width:100%;border:0;border-radius:0;border-bottom:1.5px solid #f9a200!important;background:0 0;position:relative;text-align:center;text-align-last:center;z-index:1;-webkit-appearance:none}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-down-arrow{position:absolute;width:20%;right:0;height:45%;color:#f9a200!important}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button{--background:transparent!important;--box-shadow:unset!important;color:#f9a200!important}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button.activated{--ion-color-primary-shade:transparent!important;--ion-color-primary-contrast:#737373!important}:host .ionic_datepicker_modal_content .dp-weeks-container{margin:6% 0}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col{display:flex;justify-content:center;padding:15px}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col .weeks{width:14%;display:flex;justify-content:center;font-weight:700}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col{display:flex;justify-content:center;padding:10px}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col .days{width:14%;display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-selecteddate{background:#f9a200!important;color:#fff!important;border-radius:4px;font-weight:500!important}:host .ionic_datepicker_modal_content .dp-today{border-radius:4px;font-weight:500!important;border:1px solid #f9a200!important}:host .ionic_datepicker_modal_content .dp-pointer-events-none{background:0 0;border-radius:4px;font-weight:300}:host .disabled{color:#aaa}:host ion-footer{height:55px!important}:host ion-footer ion-toolbar{height:100%!important;--border-width:0;--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px}:host ion-footer ion-toolbar .toolbar-container{height:100%!important}:host ion-footer ion-toolbar ion-grid{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-grid ion-row{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-grid ion-row ion-col{height:-webkit-fill-available!important}:host ion-footer ion-toolbar ion-button{--background:#f9a200!important;--border-radius:0;width:100%;height:55px;font-size:16px;font-weight:500!important;color:#fff!important;margin:0}:host ion-footer ion-toolbar ion-button:focus{outline:0}:host ion-footer ion-toolbar ion-button.activated{--background-activated:#e69602!important;--color-activated:white!important}"]
                }] }
    ];
    /** @nocollapse */
    Ionic4DatepickerModalComponent.ctorParameters = function () { return [
        { type: NavParams },
        { type: ModalController }
    ]; };
    return Ionic4DatepickerModalComponent;
}());
export { Ionic4DatepickerModalComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFNUQ7SUFpRUUsRUFBRTtJQUVGLHdDQUNVLFNBQW9CLEVBQ3BCLFNBQTBCO1FBRDFCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7O1FBN0RwQyxXQUFNLEdBQUc7WUFDUCxVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsS0FBSztZQUNmLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFVBQVUsRUFBRSxPQUFPO1lBQ25CLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtZQUNyQixXQUFXLEVBQUUsSUFBSTtZQUNqQixTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7WUFDOUMsVUFBVSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDdkcsWUFBWSxFQUFFLE9BQU87WUFDckIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsZUFBZSxFQUFFLEVBQUU7U0FDcEIsQ0FBQzs7UUFNRixZQUFPLEdBQVE7UUFDYix5QkFB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SUFDYix1REFBbUI7O0lBQ25CLGtEQUFTOztJQUNULGdEQUFPOztJQUNQLHlEQUFxQjs7SUFDckIsOENBSUU7O0lBQ0YsNkRBQW9COztJQUNwQixvREFBVzs7SUFFWCw4Q0FBOEI7O0lBQzlCLDhDQUE2Qjs7SUFDN0Isb0RBQXdJOztJQUN4SSxtREFBZ0Q7O0lBQ2hELG1EQUFlOztJQUNmLGtEQUFjOztJQUdkLDREQUFtQjs7Ozs7SUFJakIsbURBQTRCOzs7OztJQUM1QixtREFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2UGFyYW1zLCBNb2RhbENvbnRyb2xsZXIgfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbmljNC1pb25pYzQtZGF0ZXBpY2tlci1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgSW9uaWM0RGF0ZXBpY2tlck1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAvLyBkZWZhdWx0IGNvbmZpZ1xuICBjb25maWcgPSB7XG4gICAgdGl0bGVMYWJlbDogbnVsbCxcbiAgICBzZXRMYWJlbDogJ1NldCcsXG4gICAgdG9kYXlMYWJlbDogJ1RvZGF5JyxcbiAgICBjbG9zZUxhYmVsOiAnQ2xvc2UnLFxuICAgIGlucHV0RGF0ZTogbmV3IERhdGUoKSxcbiAgICBtb25kYXlGaXJzdDogdHJ1ZSxcbiAgICB3ZWVrc0xpc3Q6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICAgIG1vbnRoc0xpc3Q6IFsnSmFuJywgJ0ZlYicsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gICAgdGVtcGxhdGVUeXBlOiAncG9wdXAnLFxuICAgIHNob3dUb2RheUJ1dHRvbjogZmFsc2UsXG4gICAgY2xvc2VPblNlbGVjdDogZmFsc2UsXG4gICAgZGlzYWJsZVdlZWtkYXlzOiBbXVxuICB9O1xuXG4gIGN1cnJlbnREYXRlO1xuICB0b2RheTtcblxuICAvLyBpbnB1dHNcbiAgbWFpbk9iajogYW55ID0ge1xuICAgIC8vIGlucHV0RGF0ZTogbmV3IERhdGUoKSxcbiAgICAvLyBtb250aHNMaXN0OiBbJ0phbicsICdGZWInLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWcnLCAnU2VwdCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICAgIC8vIGNsb3NlT25TZWxlY3Q6IGZhbHNlLFxuICAgIC8vIHRlbXBsYXRlVHlwZTogJ3BvcHVwJyxcbiAgICAvLyBmcm9tOiAnJyxcbiAgICAvLyB0bzogJycsXG4gICAgLy8gZGlzYWJsZVdlZWtEYXlzOiBbXSxcbiAgICAvLyBtb25kYXlGaXJzdDogMSxcbiAgICAvLyB3ZWVrc0xpc3Q6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICAgIC8vIHNob3dUb2RheUJ1dHRvbjogdHJ1ZSxcbiAgfTtcblxuICAvLyBjb21wb25lbnQgdmFyaWFibGVzXG4gIHNlbGN0ZWREYXRlRXBvY2g7XG4gIGZpcnN0RGF5RXBvY2g7XG4gIGxhc3REYXlFcG9jaDtcbiAgZGlzYWJsZWREYXRlcyA9IFtdO1xuICBmcm9tRGF0ZTtcbiAgdG9EYXRlO1xuICBkaXNhYmxlV2Vla2RheXMgPSBbXTtcbiAgZGF0YTogYW55ID0ge1xuICAgIGN1cnJlbnRNb250aDogJycsXG4gICAgY3VycmVudFllYXI6ICcnLFxuICAgIGN1cnJlbnRNb250aFNlbGVjdGVkOiAnJ1xuICB9O1xuICBjdXJyZW50WWVhclNlbGVjdGVkO1xuICBudW1Db2x1bW5zO1xuXG4gIHJvd3MgPSBbMCwgNywgMTQsIDIxLCAyOCwgMzVdO1xuICBjb2xzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDZdO1xuICBtb250aHNMaXN0ID0gWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ107XG4gIHdlZWtzTGlzdCA9IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddO1xuICB5ZWFyc0xpc3QgPSBbXTtcbiAgZGF5c0xpc3QgPSBbXTtcblxuICAvL1xuICBzZWxlY3RlZERhdGVTdHJpbmc7XG4gIC8vXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuYXZQYXJhbXM6IE5hdlBhcmFtcyxcbiAgICBwcml2YXRlIG1vZGFsQ3RybDogTW9kYWxDb250cm9sbGVyXG4gICkge1xuICAgIHRoaXMudG9kYXkgPSB0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5tYWluT2JqID0gdGhpcy5uYXZQYXJhbXMuZ2V0KCdtYWluT2JqJyk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXREYXRlUGlja2VyKHRoaXMubWFpbk9iaik7XG4gIH1cblxuICAvLyBSZXNldCB0aGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgYW5kIG1pbGxpIHNlY29uZHNcbiAgcmVzZXRITVNNKGN1cnJlbnREYXRlKSB7XG4gICAgY3VycmVudERhdGUuc2V0SG91cnMoMCk7XG4gICAgY3VycmVudERhdGUuc2V0TWludXRlcygwKTtcbiAgICBjdXJyZW50RGF0ZS5zZXRTZWNvbmRzKDApO1xuICAgIGN1cnJlbnREYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcbiAgICByZXR1cm4gY3VycmVudERhdGU7XG4gIH1cblxuICAvLyBQcmV2aW91cyBtb250aFxuICBwcmV2TW9udGgoKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ3ByZXZOZXh0JywgdGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgaWYgKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSA9PT0gMSkge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRGdWxsWWVhcih0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldE1vbnRoKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSAtIDEpO1xuICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGggPSB0aGlzLm1haW5PYmoubW9udGhzTGlzdFt0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCldO1xuICAgIHRoaXMuZGF0YS5jdXJyZW50WWVhciA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB0aGlzLnJlZnJlc2hEYXRlTGlzdCh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAvLyB0aGlzLmNoYW5nZURheVNlbGVjdGVkKCk7XG4gIH1cblxuICAvLyBOZXh0IG1vbnRoXG4gIG5leHRNb250aCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnbmV4dE5leHQnLCB0aGlzLmN1cnJlbnREYXRlKTtcbiAgICBpZiAodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpID09PSAxMSkge1xuICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRGdWxsWWVhcih0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCkpO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUoMSk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRNb250aCh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgKyAxKTtcbiAgICB0aGlzLmRhdGEuY3VycmVudE1vbnRoID0gdGhpcy5tYWluT2JqLm1vbnRoc0xpc3RbdGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpXTtcbiAgICB0aGlzLmRhdGEuY3VycmVudFllYXIgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5tb250aENoYW5nZWQodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKTtcbiAgICB0aGlzLnJlZnJlc2hEYXRlTGlzdCh0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAvLyB0aGlzLmNoYW5nZURheVNlbGVjdGVkKCk7XG4gIH1cblxuICAvLyBjaGFuZ2VEYXlTZWxlY3RlZCAoIGRheSBzZWxlY3Rpb24gY2hhbmdlcyApXG4gIGNoYW5nZURheVNlbGVjdGVkKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2VEYXlTZWxlY3RlZCcpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgbmV3U2VsZWN0ZWREYXRlOiBhbnkgPSBuZXcgRGF0ZSh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICAgIG5ld1NlbGVjdGVkRGF0ZS5zZXRNb250aCh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkpO1xuICAgIG5ld1NlbGVjdGVkRGF0ZS5zZXRZZWFyKHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSk7XG5cbiAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSBuZXdTZWxlY3RlZERhdGUuZ2V0VGltZSgpO1xuICAgIHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nID0gdGhpcy5mb3JtYXREYXRlKCk7XG4gICAgLy8gdGhpcy5jbG9zZU1vZGFsKHRoaXMuc2VsY3RlZERhdGVFcG9jaCk7XG4gIH1cblxuICAvLyBEYXRlIHNlbGVjdGVkXG4gIGRhdGVTZWxlY3RlZChzZWxlY3RlZERhdGUpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnZGF0ZVNlbGVjdGVkID0+Jywgc2VsZWN0ZWREYXRlKTtcbiAgICBpZiAoIXNlbGVjdGVkRGF0ZS5kaXNhYmxlZCkge1xuICAgICAgaWYgKCFzZWxlY3RlZERhdGUgfHwgT2JqZWN0LmtleXMoc2VsZWN0ZWREYXRlKS5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSBzZWxlY3RlZERhdGUuZXBvY2g7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZVN0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZSgpO1xuICAgICAgaWYgKHRoaXMubWFpbk9iai5jbG9zZU9uU2VsZWN0KSB7XG4gICAgICAgIC8vICRzY29wZS5tYWluT2JqLmNhbGxiYWNrKHRoaXMuc2VsY3RlZERhdGVFcG9jaCk7XG4gICAgICAgIGlmICh0aGlzLm1haW5PYmoudGVtcGxhdGVUeXBlLnRvTG93ZXJDYXNlKCkgPT09ICdwb3B1cCcpIHtcbiAgICAgICAgICAvLyB0aGlzLnBvcHVwLmNsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jbG9zZU1vZGFsKHRoaXMuc2VsY3RlZERhdGVFcG9jaCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTZXQgdG9kYXkgYXMgZGF0ZSBmb3IgdGhlIG1vZGFsXG4gIHNldElvbmljRGF0ZVBpY2tlclRvZGF5RGF0ZSgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0SW9uaWNEYXRlUGlja2VyVG9kYXlEYXRlJyk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCB0b2RheSA9IG5ldyBEYXRlKHRoaXMudG9kYXkpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgdG9kYXlfb2JqID0ge1xuICAgICAgZGF0ZTogdG9kYXkuZ2V0RGF0ZSgpLFxuICAgICAgbW9udGg6IHRvZGF5LmdldE1vbnRoKCksXG4gICAgICB5ZWFyOiB0b2RheS5nZXRGdWxsWWVhcigpLFxuICAgICAgZGF5OiB0b2RheS5nZXREYXkoKSxcbiAgICAgIGVwb2NoOiB0b2RheS5nZXRUaW1lKCksXG4gICAgICBkaXNhYmxlZDogZmFsc2VcbiAgICB9O1xuICAgIHRoaXMuZGF0ZVNlbGVjdGVkKHRvZGF5X29iaik7XG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QobmV3IERhdGUoKSk7XG4gICAgdGhpcy5zZWxjdGVkRGF0ZUVwb2NoID0gdGhpcy5yZXNldEhNU00odG9kYXkpLmdldFRpbWUoKTtcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZVN0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZSgpO1xuICAgIC8vIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xuICB9XG5cbiAgLy8gU2V0IGRhdGUgZm9yIHRoZSBtb2RhbFxuICBzZXRJb25pY0RhdGVQaWNrZXJEYXRlKCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzZXRJb25pY0RhdGVQaWNrZXJEYXRlJyk7XG4gICAgdGhpcy5jbG9zZU1vZGFsKHRoaXMuc2VsY3RlZERhdGVFcG9jaCk7XG4gIH1cblxuICAvLyBTZXR0aW5nIHRoZSBkaXNhYmxlZCBkYXRlcyBsaXN0LlxuICBzZXREaXNhYmxlZERhdGVzKG9iaikge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzZXREaXNhYmxlZERhdGVzID0+Jywgb2JqKTtcbiAgICBpZiAoIW9iai5kaXNhYmxlZERhdGVzIHx8IG9iai5kaXNhYmxlZERhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5kaXNhYmxlZERhdGVzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGlzYWJsZWREYXRlcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmouZGlzYWJsZWREYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyB2YWwgPSByZXNldEhNU00obmV3IERhdGUodmFsKSk7XG4gICAgICAgIHRoaXMuZGlzYWJsZWREYXRlcy5wdXNoKHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKG9iai5kaXNhYmxlZERhdGVzW2ldKSkuZ2V0VGltZSgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZWZyZXNoIHRoZSBsaXN0IG9mIHRoZSBkYXRlcyBvZiBhIG1vbnRoXG4gIHJlZnJlc2hEYXRlTGlzdChjdXJyZW50RGF0ZSkge1xuICAgIC8vIGNvbnNvbGUubG9nKCdyZWZyZXNoRGF0ZUxpc3QgPT4nLCBjdXJyZW50RGF0ZSk7XG4gICAgY3VycmVudERhdGUgPSB0aGlzLnJlc2V0SE1TTShjdXJyZW50RGF0ZSk7XG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIDEpLmdldERhdGUoKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgbGV0IGxhc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xuXG4gICAgdGhpcy5tb250aHNMaXN0ID0gW107XG4gICAgaWYgKHRoaXMubWFpbk9iai5tb250aHNMaXN0ICYmIHRoaXMubWFpbk9iai5tb250aHNMaXN0Lmxlbmd0aCA9PT0gMTIpIHtcbiAgICAgIHRoaXMubW9udGhzTGlzdCA9IHRoaXMubWFpbk9iai5tb250aHNMaXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1vbnRoc0xpc3QgPSB0aGlzLm1vbnRoc0xpc3Q7XG4gICAgfVxuXG4gICAgdGhpcy55ZWFyc0xpc3QgPSB0aGlzLmdldFllYXJzTGlzdCh0aGlzLm1haW5PYmouZnJvbSwgdGhpcy5tYWluT2JqLnRvKTtcblxuICAgIHRoaXMuZGF5c0xpc3QgPSBbXTtcblxuICAgIGxldCB0ZW1wRGF0ZSwgZGlzYWJsZWQ7XG5cbiAgICB0aGlzLmZpcnN0RGF5RXBvY2ggPSB0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBmaXJzdERheSkpLmdldFRpbWUoKTtcbiAgICB0aGlzLmxhc3REYXlFcG9jaCA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGxhc3REYXkpKS5nZXRUaW1lKCk7XG5cbiAgICBmb3IgKGxldCBpID0gZmlyc3REYXk7IGkgPD0gbGFzdERheTsgaSsrKSB7XG4gICAgICB0ZW1wRGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGkpO1xuXG4gICAgICBpZiAodGhpcy5mcm9tRGF0ZSAmJiB0aGlzLnRvRGF0ZSkge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICAgIGRpc2FibGVkID0gKHRlbXBEYXRlLmdldFRpbWUoKSA8IHRoaXMuZnJvbURhdGUpIHx8ICh0ZW1wRGF0ZS5nZXRUaW1lKCkgPiB0aGlzLnRvRGF0ZSkgfHwgdGhpcy5tYWluT2JqLmRpc2FibGVXZWVrRGF5cy5pbmRleE9mKHRlbXBEYXRlLmdldERheSgpKSA+PSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRheXNMaXN0LnB1c2goe1xuICAgICAgICBkYXRlOiB0ZW1wRGF0ZS5nZXREYXRlKCksXG4gICAgICAgIG1vbnRoOiB0ZW1wRGF0ZS5nZXRNb250aCgpLFxuICAgICAgICB5ZWFyOiB0ZW1wRGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBkYXk6IHRlbXBEYXRlLmdldERheSgpLFxuICAgICAgICBlcG9jaDogdGVtcERhdGUuZ2V0VGltZSgpLFxuICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWRcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFRvIHNldCBNb25kYXkgYXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICBsZXQgZmlyc3REYXlNb25kYXkgPSB0aGlzLmRheXNMaXN0WzBdLmRheSAtIHRoaXMubWFpbk9iai5tb25kYXlGaXJzdDtcbiAgICBmaXJzdERheU1vbmRheSA9IChmaXJzdERheU1vbmRheSA8IDApID8gNiA6IGZpcnN0RGF5TW9uZGF5O1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBmaXJzdERheU1vbmRheTsgaisrKSB7XG4gICAgICB0aGlzLmRheXNMaXN0LnVuc2hpZnQoe30pO1xuICAgIH1cblxuICAgIHRoaXMucm93cyA9IFswLCA3LCAxNCwgMjEsIDI4LCAzNV07XG4gICAgdGhpcy5jb2xzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDZdO1xuXG4gICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IHRoaXMubWFpbk9iai5tb250aHNMaXN0W2N1cnJlbnREYXRlLmdldE1vbnRoKCldO1xuICAgIHRoaXMuZGF0YS5jdXJyZW50WWVhciA9IGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aFNlbGVjdGVkID0gdGhpcy5kYXRhLmN1cnJlbnRNb250aDtcbiAgICB0aGlzLmN1cnJlbnRZZWFyU2VsZWN0ZWQgPSB0aGlzLmRhdGEuY3VycmVudFllYXI7XG4gICAgdGhpcy5udW1Db2x1bW5zID0gNztcbiAgfVxuXG4gIC8vIE1vbnRoIGNoYW5nZWRcbiAgbW9udGhDaGFuZ2VkKGV2ZW50KSB7XG4gICAgLy8gY29uc29sZS5sb2coJ21vbnRoQ2hhbmdlZCA9PicsIGV2ZW50KTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICB9XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCBtb250aE51bWJlciA9IHRoaXMubW9udGhzTGlzdC5pbmRleE9mKHRoaXMuZGF0YS5jdXJyZW50TW9udGgpO1xuICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgobW9udGhOdW1iZXIpO1xuICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KHRoaXMuY3VycmVudERhdGUpO1xuICAgIC8vIHRoaXMuY2hhbmdlRGF5U2VsZWN0ZWQoKTtcbiAgfVxuXG4gIC8vIFllYXIgY2hhbmdlZFxuICB5ZWFyQ2hhbmdlZChldmVudCkge1xuICAgIC8vIGNvbnNvbGUubG9nKCd5ZWFyQ2hhbmdlZCA9PicsIGV2ZW50KTtcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgdGhpcy5kYXRhLmN1cnJlbnRZZWFyID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldEZ1bGxZZWFyKHRoaXMuZGF0YS5jdXJyZW50WWVhcik7XG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QodGhpcy5jdXJyZW50RGF0ZSk7XG4gICAgLy8gdGhpcy5jaGFuZ2VEYXlTZWxlY3RlZCgpO1xuICB9XG5cbiAgLy8gU2V0dGluZyB1cCB0aGUgaW5pdGlhbCBvYmplY3RcbiAgc2V0SW5pdGlhbE9iaihpcE9iaikge1xuICAgIC8vIGNvbnNvbGUubG9nKCdzZXRJbml0aWFsT2JqID0+JywgaXBPYmopO1xuICAgIHRoaXMubWFpbk9iaiA9IGlwT2JqO1xuICAgIHRoaXMuc2VsY3RlZERhdGVFcG9jaCA9IHRoaXMucmVzZXRITVNNKHRoaXMubWFpbk9iai5pbnB1dERhdGUpLmdldFRpbWUoKTtcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZVN0cmluZyA9IHRoaXMuZm9ybWF0RGF0ZSgpO1xuXG4gICAgaWYgKHRoaXMubWFpbk9iai53ZWVrc0xpc3QgJiYgdGhpcy5tYWluT2JqLndlZWtzTGlzdC5sZW5ndGggPT09IDcpIHtcbiAgICAgIHRoaXMud2Vla3NMaXN0ID0gdGhpcy5tYWluT2JqLndlZWtzTGlzdDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53ZWVrc0xpc3QgPSBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXTtcbiAgICB9XG4gICAgaWYgKHRoaXMubWFpbk9iai5tb25kYXlGaXJzdCkge1xuICAgICAgdGhpcy53ZWVrc0xpc3QucHVzaCh0aGlzLm1haW5PYmoud2Vla3NMaXN0LnNoaWZ0KCkpO1xuICAgIH1cbiAgICB0aGlzLmRpc2FibGVXZWVrZGF5cyA9IHRoaXMubWFpbk9iai5kaXNhYmxlV2Vla0RheXM7XG5cbiAgICB0aGlzLnJlZnJlc2hEYXRlTGlzdCh0aGlzLm1haW5PYmouaW5wdXREYXRlKTtcbiAgICB0aGlzLnNldERpc2FibGVkRGF0ZXModGhpcy5tYWluT2JqKTtcbiAgfVxuXG4gIC8vIGZvciBkaXNtaXNzIG1vZGFsXG4gIGNsb3NlTW9kYWwoc2VsZWN0ZWREYXRlKSB7XG4gICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlTW9kYWwgPT4gJywgc2VsZWN0ZWREYXRlKTtcbiAgICB0aGlzLm1vZGFsQ3RybC5nZXRUb3AoKTtcbiAgICB0aGlzLm1vZGFsQ3RybC5kaXNtaXNzKHsgJ2RhdGUnOiBzZWxlY3RlZERhdGUgfSk7XG4gIH1cblxuICAvLyBjbG9zZSBtb2RhbCBidXR0b25cbiAgY2xvc2VJb25pY0RhdGVQaWNrZXJNb2RhbCgpIHtcbiAgICAvLyBjb25zb2xlLmxvZygnY2xvc2VJb25pY0RhdGVQaWNrZXJNb2RhbCcpO1xuICAgIHRoaXMuY2xvc2VNb2RhbChudWxsKTtcbiAgfVxuXG4gIC8vIGdldCB5ZWFycyBsaXN0ICAoIEdJVkUgSEVSRSBNSU4gT1IgTUFYIFlFQVIgSU4gREFURV9QSUNLRVIgKVxuICBnZXRZZWFyc0xpc3QoZnJvbSwgdG8pIHtcbiAgICAvLyBjb25zb2xlLmxvZygnZ2V0WWVhcnNMaXN0ID0+JywgZnJvbSwgdG8pO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgeWVhcnNMaXN0ID0gW107XG4gICAgbGV0IG1pblllYXIgPSAxOTAwO1xuICAgIC8vIGxldCBtYXhZZWFyID0gMjEwMDtcbiAgICAvLyBsZXQgbWluWWVhciA9IDIwMDA7XG4gICAgbGV0IG1heFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxO1xuICAgIG1pblllYXIgPSBmcm9tID8gbmV3IERhdGUoZnJvbSkuZ2V0RnVsbFllYXIoKSA6IG1pblllYXI7XG4gICAgbWF4WWVhciA9IHRvID8gbmV3IERhdGUodG8pLmdldEZ1bGxZZWFyKCkgOiBtYXhZZWFyO1xuICAgIGZvciAobGV0IGkgPSBtaW5ZZWFyOyBpIDw9IG1heFllYXI7IGkrKykge1xuICAgICAgeWVhcnNMaXN0LnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiB5ZWFyc0xpc3Q7XG4gIH1cblxuICAvLyBJbml0IERhdGUtUGlja2VyXG4gIGluaXREYXRlUGlja2VyKGlwT2JqKSB7XG4gICAgdGhpcy5mcm9tRGF0ZSA9ICcnO1xuICAgIHRoaXMudG9EYXRlID0gJyc7XG4gICAgLy8gJHNjb3BlLm1haW5PYmogPSBhbmd1bGFyLmV4dGVuZCh7fSwgY29uZmlnLCBpcE9iaik7XG4gICAgaWYgKHRoaXMubWFpbk9iai5mcm9tKSB7XG4gICAgICB0aGlzLmZyb21EYXRlID0gdGhpcy5yZXNldEhNU00obmV3IERhdGUodGhpcy5tYWluT2JqLmZyb20pKS5nZXRUaW1lKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLm1haW5PYmoudG8pIHtcbiAgICAgIHRoaXMudG9EYXRlID0gdGhpcy5yZXNldEhNU00obmV3IERhdGUodGhpcy5tYWluT2JqLnRvKSkuZ2V0VGltZSgpO1xuICAgIH1cbiAgICBpZiAoaXBPYmouZGlzYWJsZVdlZWtkYXlzICYmIHRoaXMuY29uZmlnLmRpc2FibGVXZWVrZGF5cykge1xuICAgICAgdGhpcy5tYWluT2JqLmRpc2FibGVXZWVrRGF5cyA9IGlwT2JqLmRpc2FibGVXZWVrZGF5cy5jb25jYXQodGhpcy5jb25maWcuZGlzYWJsZVdlZWtkYXlzKTtcbiAgICB9XG4gICAgdGhpcy5zZXRJbml0aWFsT2JqKHRoaXMubWFpbk9iaik7XG4gIH1cblxuICBmb3JtYXREYXRlKCkge1xuICAgIGxldCBkZDogYW55ID0gbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKS5nZXREYXRlKCk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCB5eXl5ID0gbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKS5nZXRGdWxsWWVhcigpO1xuICAgIC8vIGxldCBtbTogYW55ID0gbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKS5nZXRNb250aCgpICsgMTsgLy8gSmFudWFyeSBpcyAwIVxuICAgIGlmIChkZCA8IDEwKSB7XG4gICAgICBkZCA9ICcwJyArIGRkO1xuICAgIH1cbiAgICAvLyBpZiAobW0gPCAxMCkge1xuICAgIC8vICAgbW0gPSAnMCcgKyBtbTtcbiAgICAvLyB9XG4gICAgLy8geXl5eS1NTS1kZFxuICAgIHJldHVybiB5eXl5ICsgJyAnICsgdGhpcy5jb25maWcubW9udGhzTGlzdFtuZXcgRGF0ZSh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpLmdldE1vbnRoKCldICsgJyAnICsgZGQ7XG4gIH1cbn1cbiJdfQ==