import * as moment_ from 'moment';
import { CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';
import { Injectable, Component, ViewChild, Directive, ElementRef, Renderer2, Input, HostListener, ɵɵdefineInjectable, NgModule, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, NgControl, FormsModule } from '@angular/forms';
import { NavParams, ModalController, IonContent, IonicModule } from '@ionic/angular';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ionic4DatepickerService {
    constructor() {
        this.isModalOpen = false;
    }
}
Ionic4DatepickerService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
Ionic4DatepickerService.ctorParameters = () => [];
/** @nocollapse */ Ionic4DatepickerService.ngInjectableDef = ɵɵdefineInjectable({ factory: function Ionic4DatepickerService_Factory() { return new Ionic4DatepickerService(); }, token: Ionic4DatepickerService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker-modal/ionic4-datepicker-modal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = moment_;
class Ionic4DatepickerModalComponent {
    /**
     * @param {?} navParams
     * @param {?} modalCtrl
     * @param {?} datePickerService
     */
    constructor(navParams, modalCtrl, datePickerService) {
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.datePickerService = datePickerService;
        // inputs
        this.mainObj = {};
        this.selectedDate = {};
        // component variables
        this.selctedDateEpoch = 0;
        this.disabledDates = [];
        this.highlightedDates = {};
        this.disableWeekdays = [];
        this.data = {
            currentMonth: '',
            currentYear: '',
            currentMonthSelected: ''
        };
        this.rows = [0, 7, 14, 21, 28, 35];
        this.cols = [0, 1, 2, 3, 4, 5, 6];
        this.monthsList = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        this.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.yearsList = [];
        this.daysList = [];
        this.yearInAscending = false;
        this.momentLocale = 'en-US';
        // month year scroll variables
        this.isMonthYearSelectorOpen = false;
        this.scrollingMonthOrYearArray = [];
        this.isSelectedDateFound = false;
        this.today = this.resetHMSM(new Date()).getTime();
        if (this.navParams.get('selectedDate')) {
            // console.log('Selected date =>', this.navParams.get('selectedDate'));
            this.selectedDate.date = this.navParams.get('selectedDate');
            this.isSelectedDateFound = true;
        }
        this.mainObj = this.initDatePickerObj(this.navParams.get('objConfig'));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.datePickerService.isModalOpen = true;
        this.initDatePicker();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.datePickerService.isModalOpen = false;
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
    // this method change month or year list to dateList
    /**
     * @return {?}
     */
    changeToDateList() {
        // console.log('changeToDateList');
        this.isMonthYearSelectorOpen = false;
    }
    // Virtual scroll create for select year and month
    /**
     * @param {?} isMonthSelect
     * @return {?}
     */
    selectMonthYear(isMonthSelect) {
        // console.log('selectMonthYear', i);
        this.isMonthYearSelectorOpen = true;
        this.isMonthSelect = isMonthSelect;
        this.scrollingMonthOrYearArray = isMonthSelect ? this.mainObj.monthsList : this.yearsList;
        this.selectedYearOrMonth = isMonthSelect ? this.data.currentMonth : this.data.currentYear;
        /** @type {?} */
        const index = this.scrollingMonthOrYearArray.indexOf(this.selectedYearOrMonth);
        /** @type {?} */
        const iditem = index + 'list';
        setTimeout((/**
         * @return {?}
         */
        () => {
            document.getElementById(iditem).scrollIntoView();
        }), 100);
    }
    // select month or year
    /**
     * @param {?} monthYear
     * @return {?}
     */
    onChangeMonthYear(monthYear) {
        // console.log('onChangeMonthYear', monthYear);
        if (monthYear) {
            if (this.isMonthSelect) {
                this.data.currentMonth = monthYear;
                this.selectedYearOrMonth = this.data.currentMonth;
                /** @type {?} */
                const monthNumber = this.monthsList.indexOf(this.data.currentMonth);
                this.currentDate.setDate(1);
                this.currentDate.setMonth(monthNumber);
            }
            else {
                this.data.currentYear = monthYear;
                this.selectedYearOrMonth = this.data.currentYear;
                this.currentDate.setFullYear(this.data.currentYear);
                this.refreshDateList(this.currentDate);
            }
            this.refreshDateList(this.currentDate);
        }
        this.isMonthYearSelectorOpen = false;
    }
    // Previous month
    /**
     * @return {?}
     */
    prevMonth() {
        // console.log('prevNext', this.currentDate);
        /** @type {?} */
        const currentMonth = this.currentDate.getMonth();
        /** @type {?} */
        const currentYear = this.currentDate.getFullYear();
        if (currentYear <= this.yearsList[(this.yearsList.length - 1)] && currentMonth === 0) {
            return;
        }
        if (currentMonth === 1) {
            this.currentDate.setFullYear(currentYear);
        }
        this.currentDate.setMonth(currentMonth - 1);
        this.data.currentMonth = this.mainObj.monthsList[currentMonth];
        this.data.currentYear = currentYear;
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    }
    // Next month
    /**
     * @return {?}
     */
    nextMonth() {
        // console.log('nextNext', this.currentDate);
        /** @type {?} */
        const currentMonth = this.currentDate.getMonth();
        /** @type {?} */
        const currentYear = this.currentDate.getFullYear();
        if (currentYear >= this.yearsList[0] && currentMonth === 11) {
            return;
        }
        if (currentMonth === 11) {
            this.currentDate.setFullYear(currentYear);
        }
        this.currentDate.setDate(1);
        this.currentDate.setMonth(currentMonth + 1);
        this.data.currentMonth = this.mainObj.monthsList[currentMonth];
        this.data.currentYear = currentYear;
        this.refreshDateList(this.currentDate);
        // this.changeDaySelected();
    }
    // changeDaySelected ( day selection changes )
    /**
     * @return {?}
     */
    changeDaySelected() {
        // console.log('changeDaySelected');
        /** @type {?} */
        const newSelectedDate = new Date(this.selctedDateEpoch);
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
        if (selectedDate && !selectedDate.disabled) {
            if (!selectedDate || Object.keys(selectedDate).length === 0) {
                return;
            }
            this.isSelectedDateFound = true;
            this.selctedDateEpoch = selectedDate.epoch;
            this.selectedDateString = this.formatDate();
            if (this.mainObj.closeOnSelect) {
                this.closeModal(this.selctedDateEpoch);
            }
        }
    }
    // Set today as date for the modal
    /**
     * @return {?}
     */
    setIonicDatePickerTodayDate() {
        // console.log('setIonicDatePickerTodayDate');
        /** @type {?} */
        const today = new Date(this.today);
        /** @type {?} */
        const today_obj = {
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
    // Set hightlighted dates
    /**
     * @param {?} obj
     * @return {?}
     */
    setHightlightedDates(obj) {
        if (!obj.highlightedDates || obj.highlightedDates.length === 0) {
            this.highlightedDates = {};
        }
        else {
            this.highlightedDates = {};
            for (let i = 0; i < obj.highlightedDates.length; i++) {
                /** @type {?} */
                const hDate = obj.highlightedDates[i].date;
                /** @type {?} */
                const hColor = obj.highlightedDates[i].color;
                /** @type {?} */
                const hFontColor = obj.highlightedDates[i].fontColor;
                /** @type {?} */
                const hDateTime = this.resetHMSM(new Date(hDate)).getTime();
                this.highlightedDates[hDateTime] = { color: hColor, fontColor: hFontColor };
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
        /** @type {?} */
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        /** @type {?} */
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
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
            disabled = false;
            /** @type {?} */
            const day = tempDate.getDay();
            if (this.disableWeekdays.length > 0) {
                if (this.disableWeekdays.indexOf(day) >= 0) {
                    disabled = this.disableWeekdays.indexOf(day) >= 0;
                }
                else {
                    disabled = false;
                }
            }
            if (this.disabledDates.length > 0) {
                if (this.disabledDates.indexOf(tempDate.getTime()) >= 0) {
                    disabled = true;
                }
            }
            if (this.fromDate && !disabled) {
                disabled = (tempDate.getTime() < this.fromDate)
                    || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
            }
            if (this.toDate && !disabled) {
                disabled = (tempDate.getTime() > this.toDate)
                    || this.mainObj.disableWeekDays.indexOf(tempDate.getDay()) >= 0;
            }
            /** @type {?} */
            const hightLightDate = this.highlightedDates[tempDate.getTime()];
            /** @type {?} */
            let fontColor = null;
            if (tempDate.getDay() === 0 && this.mainObj.isSundayHighlighted && this.mainObj.isSundayHighlighted.fontColor) {
                fontColor = this.mainObj.isSundayHighlighted.fontColor;
            }
            else if (hightLightDate && hightLightDate.fontColor) {
                fontColor = hightLightDate.fontColor;
            }
            this.daysList.push({
                date: tempDate.getDate(),
                month: tempDate.getMonth(),
                year: tempDate.getFullYear(),
                day: tempDate.getDay(),
                epoch: tempDate.getTime(),
                disabled: disabled,
                color: hightLightDate && hightLightDate.color ? hightLightDate.color : null,
                fontColor: fontColor
                // fontColor: hightLightDate && hightLightDate.fontColor ? hightLightDate.fontColor : null
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
    // Setting up the initial object
    /**
     * @param {?} ipObj
     * @return {?}
     */
    setInitialObj(ipObj) {
        // console.log('setInitialObj =>', ipObj);
        this.mainObj = ipObj;
        if (this.isSelectedDateFound) {
            this.isSelectedDateFound = true;
            this.selctedDateEpoch = this.resetHMSM(this.mainObj.inputDate).getTime();
        }
        this.selectedDateString = this.formatDate();
        if (this.mainObj.weeksList && this.mainObj.weeksList.length === 7) {
            this.weeksList = this.mainObj.weeksList;
        }
        if (this.mainObj.mondayFirst) {
            this.weeksList.push(this.mainObj.weeksList.shift());
        }
        if (this.mainObj.yearInAscending) {
            this.yearInAscending = this.mainObj.yearInAscending;
        }
        if (this.mainObj.momentLocale) {
            this.momentLocale = this.mainObj.momentLocale;
        }
        this.disableWeekdays = this.mainObj.disableWeekDays;
        this.setDisabledDates(this.mainObj);
        this.refreshDateList(this.mainObj.inputDate);
    }
    // for dismiss modal
    /**
     * @param {?} selectedDate
     * @return {?}
     */
    closeModal(selectedDate) {
        // console.log('closeModal => ', selectedDate);
        this.modalCtrl.getTop();
        /** @type {?} */
        const formattedDate = moment(selectedDate).format(this.mainObj.dateFormat);
        this.modalCtrl.dismiss({ 'date': formattedDate });
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
        /** @type {?} */
        const yearsList = [];
        /** @type {?} */
        let minYear = 1950;
        /** @type {?} */
        let maxYear = new Date().getFullYear() + 1;
        minYear = from ? new Date(from).getFullYear() : minYear;
        maxYear = to ? new Date(to).getFullYear() : maxYear;
        // console.log('getYearsList: ', this.yearInAscending);
        if (this.yearInAscending) {
            for (let i = minYear; i <= maxYear; i++) {
                yearsList.push(i);
            }
        }
        else {
            for (let i = maxYear; i >= minYear; i--) {
                yearsList.push(i);
            }
        }
        return yearsList;
    }
    // Init Date-Picker
    /**
     * @return {?}
     */
    initDatePicker() {
        this.fromDate = '';
        this.toDate = '';
        // $scope.mainObj = angular.extend({}, config, ipObj);
        if (this.mainObj.from) {
            this.fromDate = this.resetHMSM(new Date(this.mainObj.from)).getTime();
        }
        if (this.mainObj.to) {
            this.toDate = this.resetHMSM(new Date(this.mainObj.to)).getTime();
        }
        // if (ipObj.disableWeekdays && this.config.disableWeekdays) {
        //   this.mainObj.disableWeekDays = ipObj.disableWeekdays.concat(this.config.disableWeekdays);
        // }
        this.setInitialObj(this.mainObj);
    }
    // Init DatePicker Object
    /**
     * @param {?} config
     * @return {?}
     */
    initDatePickerObj(config) {
        // const config = this.mainObj;
        if (config.inputDate && !this.selectedDate.date) {
            this.isSelectedDateFound = true;
            this.selectedDate.date = config.inputDate;
        }
        /** @type {?} */
        const objConfig = {};
        objConfig.from = config.fromDate ? config.fromDate : '';
        objConfig.to = config.toDate ? config.toDate : '';
        objConfig.showTodayButton = config.showTodayButton === undefined ? true : config.showTodayButton;
        objConfig.closeOnSelect = config.closeOnSelect ? config.closeOnSelect : false;
        objConfig.disableWeekDays = config.disableWeekDays ? config.disableWeekDays : [];
        objConfig.mondayFirst = config.mondayFirst ? config.mondayFirst : false;
        objConfig.setLabel = config.setLabel ? config.setLabel : 'Set';
        objConfig.todayLabel = config.todayLabel ? config.todayLabel : 'Today';
        objConfig.closeLabel = config.closeLabel ? config.closeLabel : 'Close';
        objConfig.disabledDates = config.disabledDates ? config.disabledDates : [];
        objConfig.titleLabel = config.titleLabel ? config.titleLabel : null;
        objConfig.monthsList = config.monthsList ? config.monthsList : this.monthsList;
        objConfig.monthsList = [...objConfig.monthsList];
        objConfig.weeksList = config.weeksList ? config.weeksList : this.weeksList;
        objConfig.weeksList = [...objConfig.weeksList];
        objConfig.dateFormat = config.dateFormat ? config.dateFormat : 'DD MMM YYYY';
        // console.log(this.selectedDate.date, objConfig.dateFormat, moment.locale());
        objConfig.clearButton = config.clearButton ? config.clearButton : false;
        objConfig.yearInAscending = config.yearInAscending ? config.yearInAscending : false;
        objConfig.momentLocale = config.momentLocale ? config.momentLocale : 'en-US';
        moment.locale(objConfig.momentLocale);
        objConfig.inputDate = this.selectedDate.date ? moment(this.selectedDate.date, objConfig.dateFormat).toDate() : new Date();
        objConfig.btnCloseSetInReverse = config.btnCloseSetInReverse ? config.btnCloseSetInReverse : false;
        objConfig.btnProperties = {};
        if (config.btnProperties) {
            /** @type {?} */
            const btnProperties = config.btnProperties;
            objConfig.btnProperties.expand = btnProperties.expand ? btnProperties.expand : 'block';
            objConfig.btnProperties.fill = btnProperties.fill ? btnProperties.fill : 'solid';
            objConfig.btnProperties.size = btnProperties.size ? btnProperties.size : 'default';
            objConfig.btnProperties.color = btnProperties.color ? btnProperties.color : '';
            objConfig.btnProperties.disabled = btnProperties.disabled ? btnProperties.disabled : false;
            objConfig.btnProperties.strong = btnProperties.strong ? btnProperties.strong : false;
        }
        else {
            objConfig.btnProperties.expand = 'block';
            objConfig.btnProperties.fill = 'solid';
            objConfig.btnProperties.size = 'default';
            objConfig.btnProperties.disabled = false;
            objConfig.btnProperties.strong = false;
        }
        objConfig.arrowNextPrev = {};
        if (config.arrowNextPrev) {
            /** @type {?} */
            const arrowNextPrev = config.arrowNextPrev;
            objConfig.arrowNextPrev.nextArrowSrc = arrowNextPrev.nextArrowSrc ? arrowNextPrev.nextArrowSrc : false;
            objConfig.arrowNextPrev.prevArrowSrc = arrowNextPrev.prevArrowSrc ? arrowNextPrev.prevArrowSrc : false;
        }
        objConfig.highlightedDates = [];
        if (config.highlightedDates && config.highlightedDates.length > 0) {
            objConfig.highlightedDates = config.highlightedDates;
            this.setHightlightedDates(objConfig);
        }
        objConfig.isSundayHighlighted = {};
        if (config.isSundayHighlighted) {
            /** @type {?} */
            const isSundayHighlighted = config.isSundayHighlighted;
            objConfig.isSundayHighlighted.fontColor = isSundayHighlighted.fontColor ? isSundayHighlighted.fontColor : null;
        }
        // console.log('config =>', objConfig);
        return objConfig;
    }
    // Format date
    /**
     * @return {?}
     */
    formatDate() {
        // console.log('formatDate: ', this.selctedDateEpoch, new Date(this.selctedDateEpoch));
        return moment(this.selctedDateEpoch).format(this.mainObj.dateFormat);
    }
}
Ionic4DatepickerModalComponent.decorators = [
    { type: Component, args: [{
                selector: 'li-ionic4-datepicker-modal',
                template: "<ion-header>\r\n    <ion-toolbar (click)=\"changeToDateList()\">\r\n        <ion-title>\r\n            <h1 *ngIf=\"mainObj?.titleLabel\">{{mainObj?.titleLabel}}</h1>\r\n            {{selectedDateString}}\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content forceOverscroll=\"false\" class=\"ion-no-padding ionic_datepicker_modal_content\">\r\n    <ion-grid class=\"ion-no-padding dp-month-year-container\"\r\n              [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-hide' : 'dp-virual-scroller-show'\">\r\n        <ion-row>\r\n            <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"prevMonth()\">\r\n                <ion-button [ngClass]=\"{'pointer_events_none':((firstDayEpoch - 86400000) < fromDate)}\">\r\n                    <ion-icon *ngIf=\"!mainObj?.arrowNextPrev?.prevArrowSrc\" name=\"arrow-back\"></ion-icon>\r\n                    <ion-icon *ngIf=\"mainObj?.arrowNextPrev?.prevArrowSrc\"\r\n                              src=\"{{mainObj?.arrowNextPrev?.prevArrowSrc}}\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"9\">\r\n                <ion-grid>\r\n                    <ion-row>\r\n                        <ion-col class=\"dp-select-month-year ion-no-padding\" size=\"5.5\" (click)=\"selectMonthYear(true)\">\r\n                            <ion-button class=\"dp-buttons\">\r\n                                {{ data.currentMonth }}\r\n                                <ion-icon name=\"caret-down\" class=\"dp-down-arrow\"></ion-icon>\r\n                            </ion-button>\r\n                        </ion-col>\r\n                        <ion-col size=\"1\"></ion-col>\r\n                        <ion-col class=\"dp-select-month-year ion-no-padding\" size=\"5.5\"\r\n                                 (click)=\"selectMonthYear(false)\">\r\n                            <ion-button class=\"dp-buttons\">\r\n                                {{ data.currentYear }}\r\n                                <ion-icon name=\"caret-down\" class=\"dp-down-arrow\"></ion-icon>\r\n                            </ion-button>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"nextMonth()\">\r\n                <ion-button [ngClass]=\"{'pointer_events_none':((lastDayEpoch + 86400000)> toDate)}\">\r\n                    <ion-icon *ngIf=\"!mainObj?.arrowNextPrev?.nextArrowSrc\" name=\"arrow-forward\"></ion-icon>\r\n                    <ion-icon *ngIf=\"mainObj?.arrowNextPrev?.nextArrowSrc\"\r\n                              src=\"{{mainObj?.arrowNextPrev?.nextArrowSrc}}\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n            <ion-col>\r\n                <ion-grid class=\"dp-weeks-container\" *ngIf=\"daysList\"\r\n                          [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-hide' : 'dp-virual-scroller-show'\">\r\n                    <ion-row class=\" dp-weeks-name\">\r\n                        <ion-col *ngFor=\"let weekName of mainObj?.weeksList; let i = index\">\r\n                            <!-- <div class=\"weeks\">{{weekName}} {{i}}</div> -->\r\n                            <div class=\"weeks\" *ngIf=\"mainObj?.mondayFirst\"\r\n                                 [style.color]=\"mainObj?.isSundayHighlighted && i === 6 ? mainObj?.isSundayHighlighted.fontColor : ''\">\r\n                                {{weekName}}</div>\r\n                            <div class=\"weeks\" *ngIf=\"!mainObj?.mondayFirst\"\r\n                                 [style.color]=\"mainObj?.isSundayHighlighted && i === 0 ? mainObj?.isSundayHighlighted.fontColor : ''\">\r\n                                {{weekName}}</div>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngFor=\"let row of rows;\" class=\"dp-days-list\">\r\n                        <ion-col\r\n                                class=\"ion-no-padding\"\r\n                                *ngFor=\"let col of cols; let i = index ;\" (click)=\"dateSelected(daysList[row + i])\"\r\n                                [style.background-color]=\"(daysList[row + i]?.color) ? (daysList[row + i]?.color) : ''\"\r\n                                [style.border-radius]=\"(daysList[row + i]?.color) ? '4px' : ''\" [ngClass]=\"{\r\n                                'dp-selecteddate': (daysList[row + i]?.epoch === selctedDateEpoch),\r\n                                'dp-today' : (daysList[row + i]?.epoch == today),\r\n                                'disabled' : (daysList[row + i]?.disabled)}\">\r\n                                    <div class=\"days\"\r\n                                         [style.color]=\"(daysList[row + i]?.fontColor) ? (daysList[row + i]?.fontColor) : ''\">\r\n                                        {{daysList[row + col]?.date}}\r\n                                    </div>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-list class=\"dp-month-year-scroll-container\"\r\n              [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-show' : 'dp-virual-scroller-hide'\">\r\n        <ion-item *ngFor=\"let monthYear of scrollingMonthOrYearArray;let i=index;\" id=\"{{i +'list'}}\"\r\n                  (click)=\"onChangeMonthYear(monthYear)\">\r\n            <ion-label [ngClass]=\"selectedYearOrMonth === monthYear ? 'dp-selected' : ''\">{{ monthYear }}</ion-label>\r\n        </ion-item>\r\n    </ion-list>\r\n</ion-content>\r\n\r\n<ion-footer>\r\n    <ion-toolbar>\r\n        <ion-grid class=\"ion-no-padding\">\r\n            <ion-row class=\"ion-no-padding\"\r\n                     [ngClass]=\"mainObj?.btnCloseSetInReverse ? 'dp-btn-set-close-in-reverse' : ''\">\r\n                <ion-col class=\"ion-no-padding\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\"\r\n                                size=\"{{mainObj?.btnProperties?.size}}\" color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"closeIonicDatePickerModal()\">\r\n                        {{mainObj?.closeLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col class=\"ion-no-padding\" *ngIf=\"mainObj?.showTodayButton\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\"\r\n                                size=\"{{mainObj?.btnProperties?.size}}\" color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"setIonicDatePickerTodayDate()\">\r\n                        {{mainObj?.todayLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col class=\"ion-no-padding\" *ngIf=\"!mainObj?.closeOnSelect\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\" size=\"{{mainObj?.btnProperties?.size}}\"\r\n                                color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled || !isSelectedDateFound}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"setIonicDatePickerDate()\">\r\n                        {{mainObj?.setLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    </ion-toolbar>\r\n</ion-footer>\r\n",
                styles: [":host ion-header{height:60px}:host ion-header ion-toolbar{--background:var(--ion-color-primary);height:100%;align-items:center;display:flex;color:var(--ion-color-primary-contrast)}:host ion-header ion-toolbar ion-title{font-size:20px;font-weight:700;text-align:center;padding:0;display:flex;align-items:center;justify-content:center;height:100%;cursor:pointer}:host ion-header ion-toolbar ion-title h1{font-size:14px;margin:0 0 4px}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col{display:flex;justify-content:center;align-items:center}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid{width:100%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year{border-bottom:1.5px solid;border-bottom-color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-buttons{width:100%;height:40px;margin:0;padding:0;color:var(--ion-color-primary);--background:transparent;--box-shadow:none}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-buttons.activated{--background-activated:transparent;--color-activated:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-down-arrow{position:absolute;width:16px;right:0;top:10px;color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button{--background:transparent;--box-shadow:0;color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button.activated{--ion-color-primary-shade:transparent;--ion-color-primary-contrast:var(--ion-color-primary-tint)}:host .ionic_datepicker_modal_content .dp-weeks-container{margin:8px 0}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col{display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col .weeks{width:14%;display:flex;justify-content:center;font-weight:700}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col{display:flex;justify-content:center;padding:10px;cursor:pointer}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col .days{width:14%;display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-selecteddate{background:var(--ion-color-primary);color:var(--ion-color-primary-contrast);border-radius:4px;font-weight:500}:host .ionic_datepicker_modal_content .dp-today{border-radius:4px;font-weight:500;border:1px solid;border-color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container{position:absolute;top:0;bottom:0;left:0;right:0;margin:0;overflow-y:scroll}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item{--padding-start:0;--inner-padding-end:0;--inner-border-width:0}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item ion-label{text-align:center;margin:0;font-size:16px}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item ion-label.dp-selected{color:var(--ion-color-primary);font-size:20px;font-weight:500}:host .disabled{color:#aaa}:host .dp-virual-scroller-show{transition:opacity .3s ease-in;opacity:1;visibility:visible}:host .dp-virual-scroller-hide{opacity:0;visibility:hidden;height:auto}:host ion-footer{height:55px}:host ion-footer ion-toolbar{height:100%;--border-width:0;--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px}:host ion-footer ion-toolbar .toolbar-container{height:100%}:host ion-footer ion-toolbar .dp-btn-set-close-in-reverse{flex-direction:row-reverse}:host ion-footer ion-toolbar ion-button{--border-radius:0;height:55px;margin:0}:host ion-footer ion-toolbar ion-button:focus{outline:0}:host ion-footer ion-toolbar ion-button.activated{--background-activated:var(--ion-color-primary-tint);--color-activated:var(--ion-color-primary-contrast)}"]
            }] }
];
/** @nocollapse */
Ionic4DatepickerModalComponent.ctorParameters = () => [
    { type: NavParams },
    { type: ModalController },
    { type: Ionic4DatepickerService }
];
Ionic4DatepickerModalComponent.propDecorators = {
    content: [{ type: ViewChild, args: [IonContent, { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => {
});
/** @type {?} */
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => Ionic4DatepickerComponent)),
    multi: true
};
class Ionic4DatepickerComponent {
    /**
     * @param {?} modalCtrl
     * @param {?} el
     * @param {?} renderer2
     */
    constructor(modalCtrl, el, renderer2) {
        this.modalCtrl = modalCtrl;
        this.el = el;
        this.renderer2 = renderer2;
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
        if (this.inputDateConfig.clearButton !== false) {
            this.closeIcon = document.createElement('ion-icon');
            this.closeIcon.name = 'close-circle';
            this.closeIcon.className = 'clearButton';
            this.closeIcon.style.position = 'absolute';
            this.closeIcon.style.right = '8px';
            this.closeIcon.style.bottom = '0px';
            this.closeIcon.style.fontSize = '18px';
            this.closeIcon.style.color = '#A9A9A9';
            this.closeIcon.style.zIndex = '5';
            if (this.el.nativeElement.parentNode.nodeName === 'ION-ITEM') {
                this.closeIcon.style.bottom = '30%';
            }
            this.el.nativeElement.setAttribute('style', 'position: relative; width: 100%;');
            this.el.nativeElement.appendChild(this.closeIcon);
            this.renderer2.listen(this.closeIcon, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // Do something with 'event'
                // console.log('button clicks');
                this.selectedDate = new Date();
                this.value = '';
            }));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    onChangeValue(value) {
        // console.log('onChangeValue =>' , value);
        if (this.inputDateConfig.clearButton !== false) {
            if (!value) {
                this.closeIcon.style.visibility = 'hidden';
            }
            else {
                this.closeIcon.style.visibility = 'visible';
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    openDatePicker(value) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('openDatePicker');
            if (value) {
                this.selectedDate.date = value;
            }
            /** @type {?} */
            const datePickerModal = yield this.modalCtrl.create({
                component: Ionic4DatepickerModalComponent,
                cssClass: 'li-ionic4-datePicker',
                componentProps: { 'objConfig': this.inputDateConfig, 'selectedDate': this.selectedDate.date }
            });
            yield datePickerModal.present();
            datePickerModal.onDidDismiss()
                .then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                // console.log(data);
                if (data.data && data.data.date && data.data.date !== 'Invalid date') {
                    this.selectedDate.date = data.data.date;
                    this.value = data.data.date;
                }
            }));
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
        this.onChangeValue(v);
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
        this.onChangeValue(value);
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
                selector: 'li-ionic4-datepicker',
                template: "<input type=\"text\" class=\"li-dp-input\" (focus)=\"$event.preventDefault()\" (click)=\"openDatePicker(value)\" readonly\r\n    [(ngModel)]=\"value\" start />",
                providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                styles: [":host input{font-size:16px;margin:6px 0;border:0;border-bottom:1px solid #ccc;width:100%;padding:12px}@media (min-width:768px){:host input{font-size:18px}}:host input.has-focus,:host input:focus{outline:0;box-shadow:unset}"]
            }] }
];
/** @nocollapse */
Ionic4DatepickerComponent.ctorParameters = () => [
    { type: ModalController },
    { type: ElementRef },
    { type: Renderer2 }
];
Ionic4DatepickerComponent.propDecorators = {
    inputDateConfig: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/li-ionic4-datepicker.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LiIonic4DatepickerDirective {
    /**
     * @param {?} modalCtrl
     * @param {?} ngModel
     * @param {?} control
     * @param {?} el
     * @param {?} renderer2
     * @param {?} datePickerService
     */
    constructor(modalCtrl, ngModel, control, el, renderer2, datePickerService) {
        this.modalCtrl = modalCtrl;
        this.ngModel = ngModel;
        this.control = control;
        this.el = el;
        this.renderer2 = renderer2;
        this.datePickerService = datePickerService;
        this.selectedDate = {};
        this.isModalOpen = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // console.log('config.yearInAscending : ' + this.inputDateConfig.yearInAscending);
        if (this.inputDateConfig.clearButton !== false) {
            this.closeIcon = document.createElement('ion-icon');
            this.closeIcon.name = 'close-circle';
            this.closeIcon.className = 'clearButton';
            this.closeIcon.style.position = 'absolute';
            this.closeIcon.style.right = '8px';
            this.closeIcon.style.bottom = '30%';
            this.closeIcon.style.fontSize = '18px';
            this.closeIcon.style.color = '#A9A9A9';
            this.closeIcon.style.zIndex = '5';
            if (this.el.nativeElement.parentNode.nodeName === 'ION-ITEM') {
                this.closeIcon.style.bottom = '12px';
            }
            this.el.nativeElement.parentNode.appendChild(this.closeIcon);
            this.renderer2.listen(this.closeIcon, 'click', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                // Do something with 'event'
                // console.log('button clicks');
                this.selectedDate.date = new Date();
                this.control.control.setValue('');
                this.ngModel.update.emit('');
            }));
        }
        /** @type {?} */
        const self = this;
        this.ngModel.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            // console.log('ngModel value =>', value);
            self.selectedDate.date = value;
            if (this.inputDateConfig.clearButton !== false) {
                if (!value) {
                    this.closeIcon.style.visibility = 'hidden';
                }
                else {
                    this.closeIcon.style.visibility = 'visible';
                }
            }
        }));
        this.control.control.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        (value) => {
            // console.log('formcontrol value =>', value);
            self.selectedDate.date = value;
            if (this.inputDateConfig.clearButton !== false) {
                if (!value) {
                    this.closeIcon.style.visibility = 'hidden';
                }
                else {
                    this.closeIcon.style.visibility = 'visible';
                }
            }
        }));
        if (this.control.control.value) {
            this.selectedDate.date = this.control.control.value;
        }
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.datePickerService.isModalOpen) {
            return;
        }
        this.openDatePicker();
    }
    /**
     * @return {?}
     */
    openDatePicker() {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('openDatePicker');
            // console.log('openDatePicker');
            /** @type {?} */
            const datePickerModal = yield this.modalCtrl.create({
                component: Ionic4DatepickerModalComponent,
                cssClass: 'li-ionic4-datePicker',
                componentProps: { 'objConfig': this.inputDateConfig, 'selectedDate': this.selectedDate.date }
            });
            yield datePickerModal.present();
            datePickerModal.onDidDismiss()
                .then((/**
             * @param {?} data
             * @return {?}
             */
            (data) => {
                if (data.data && data.data.date && data.data.date !== 'Invalid date') {
                    this.selectedDate.date = data.data.date;
                    this.control.control.setValue(data.data.date);
                    this.ngModel.update.emit(data.data.date);
                }
            }));
        });
    }
}
LiIonic4DatepickerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[liIonic4Datepicker]',
                exportAs: 'liIonic4Datepicker',
                providers: [NgModel],
            },] }
];
/** @nocollapse */
LiIonic4DatepickerDirective.ctorParameters = () => [
    { type: ModalController },
    { type: NgModel },
    { type: NgControl },
    { type: ElementRef },
    { type: Renderer2 },
    { type: Ionic4DatepickerService }
];
LiIonic4DatepickerDirective.propDecorators = {
    inputDateConfig: [{ type: Input, args: ['liIonic4Datepicker',] }],
    onFocus: [{ type: HostListener, args: ['ionFocus',] }]
};

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ionic4DatepickerModule {
}
Ionic4DatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    IonicModule
                ],
                declarations: [
                    Ionic4DatepickerComponent,
                    LiIonic4DatepickerDirective,
                    Ionic4DatepickerModalComponent
                ],
                exports: [
                    Ionic4DatepickerComponent,
                    LiIonic4DatepickerDirective,
                    Ionic4DatepickerModalComponent,
                    CommonModule,
                    FormsModule
                ],
                entryComponents: [
                    // Ionic4DatepickerComponent,
                    Ionic4DatepickerModalComponent
                ],
                providers: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: logisticinfotech-ionic4-datepicker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ionic4DatepickerService, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, Ionic4DatepickerComponent, Ionic4DatepickerModule, Ionic4DatepickerModalComponent, LiIonic4DatepickerDirective as ɵa };

//# sourceMappingURL=logisticinfotech-ionic4-datepicker.js.map