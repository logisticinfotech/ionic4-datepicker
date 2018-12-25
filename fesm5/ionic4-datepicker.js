import { __awaiter, __generator } from 'tslib';
import { Injectable, Component, NgModule, defineInjectable, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavParams, ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Ionic4DatepickerService = /** @class */ (function () {
    function Ionic4DatepickerService() {
    }
    Ionic4DatepickerService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    Ionic4DatepickerService.ctorParameters = function () { return []; };
    /** @nocollapse */ Ionic4DatepickerService.ngInjectableDef = defineInjectable({ factory: function Ionic4DatepickerService_Factory() { return new Ionic4DatepickerService(); }, token: Ionic4DatepickerService, providedIn: "root" });
    return Ionic4DatepickerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                if (this.mainObj.templateType.toLowerCase() === 'popup') ;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var noop = function () {
};
/** @type {?} */
var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Ionic4DatepickerComponent; }),
    multi: true
};
var Ionic4DatepickerComponent = /** @class */ (function () {
    function Ionic4DatepickerComponent(modalCtrl) {
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
    Ionic4DatepickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.openDatePicker = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var objConfig, datePickerModal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.selectedDate.date = value;
                        if (this.inputDate.from) {
                            this.selectedDate.from = this.inputDate.from;
                        }
                        if (this.inputDate.to) {
                            this.selectedDate.to = this.inputDate.to;
                        }
                        // console.log('selectedDate', this.selectedDate);
                        // tslint:disable-next-line:prefer-const
                        objConfig = {};
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
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: Ionic4DatepickerModalComponent,
                                cssClass: 'ionic4-datePicker',
                                componentProps: { 'mainObj': objConfig }
                            })];
                    case 1:
                        datePickerModal = _a.sent();
                        return [4 /*yield*/, datePickerModal.present()];
                    case 2:
                        _a.sent();
                        datePickerModal.onDidDismiss()
                            .then(function (data) {
                            // console.log(data);
                            if (data.data && data.data.date) {
                                _this.selectedDate.date = data.data.date;
                                /** @type {?} */
                                var dd = new Date(data.data.date).getDate();
                                // tslint:disable-next-line:prefer-const
                                /** @type {?} */
                                var yyyy = new Date(data.data.date).getFullYear();
                                /** @type {?} */
                                var mm = new Date(data.data.date).getMonth() + 1;
                                if (dd < 10) {
                                    dd = '0' + dd;
                                }
                                if (mm < 10) {
                                    mm = '0' + mm;
                                }
                                _this.value = yyyy + '-' + mm + '-' + dd;
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Ionic4DatepickerComponent.prototype, "value", {
        // get accessor
        get: 
        // get accessor
        /**
         * @return {?}
         */
        function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: 
        // set accessor including call the onchange callback
        /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // Set touched on blur
    // Set touched on blur
    /**
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.onBlur = 
    // Set touched on blur
    /**
     * @return {?}
     */
    function () {
        this.onTouchedCallback();
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.writeValue = 
    // From ControlValueAccessor interface
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.registerOnChange = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.registerOnTouched = 
    // From ControlValueAccessor interface
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouchedCallback = fn;
    };
    Ionic4DatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ionic4-datepicker',
                    template: "<ion-item (click)=\"openDatePicker(value)\">\n    <input type=\"text\" (focus)=\"$event.preventDefault()\" readonly [(ngModel)]=\"value\" start />\n    <ion-icon name=\"calendar\" end></ion-icon>\n</ion-item>",
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                    styles: [":host ion-item{--background:#d7d7d7;--inner-border-width:0;--border-width:0;--border-radius:4px;margin:8px 0}:host ion-item input{font-size:16px;margin:6px 0;background:#d7d7d7;border:none;width:100%}@media (min-width:768px){:host ion-item input{font-size:18px}}:host ion-item input.has-focus,:host ion-item input:focus{outline:0;box-shadow:unset}:host ion-item ion-icon{color:#737373;margin-right:8px}"]
                }] }
    ];
    /** @nocollapse */
    Ionic4DatepickerComponent.ctorParameters = function () { return [
        { type: ModalController }
    ]; };
    Ionic4DatepickerComponent.propDecorators = {
        inputDate: [{ type: Input }]
    };
    return Ionic4DatepickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Ionic4DatepickerModule = /** @class */ (function () {
    function Ionic4DatepickerModule() {
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
    return Ionic4DatepickerModule;
}());

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