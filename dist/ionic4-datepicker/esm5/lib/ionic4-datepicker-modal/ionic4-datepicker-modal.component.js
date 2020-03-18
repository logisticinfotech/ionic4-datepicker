/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker-modal/ionic4-datepicker-modal.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { NavParams, ModalController, IonContent } from '@ionic/angular';
import * as moment_ from 'moment';
import { Ionic4DatepickerService } from '../ionic4-datepicker.service';
/** @type {?} */
var moment = moment_;
var Ionic4DatepickerModalComponent = /** @class */ (function () {
    function Ionic4DatepickerModalComponent(navParams, modalCtrl, datePickerService) {
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
    Ionic4DatepickerModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.datePickerService.isModalOpen = true;
        this.initDatePicker();
    };
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.datePickerService.isModalOpen = false;
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
    // this method change month or year list to dateList
    // this method change month or year list to dateList
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.changeToDateList = 
    // this method change month or year list to dateList
    /**
     * @return {?}
     */
    function () {
        // console.log('changeToDateList');
        this.isMonthYearSelectorOpen = false;
    };
    // Virtual scroll create for select year and month
    // Virtual scroll create for select year and month
    /**
     * @param {?} isMonthSelect
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.selectMonthYear = 
    // Virtual scroll create for select year and month
    /**
     * @param {?} isMonthSelect
     * @return {?}
     */
    function (isMonthSelect) {
        // console.log('selectMonthYear', i);
        this.isMonthYearSelectorOpen = true;
        this.isMonthSelect = isMonthSelect;
        this.scrollingMonthOrYearArray = isMonthSelect ? this.mainObj.monthsList : this.yearsList;
        this.selectedYearOrMonth = isMonthSelect ? this.data.currentMonth : this.data.currentYear;
        /** @type {?} */
        var index = this.scrollingMonthOrYearArray.indexOf(this.selectedYearOrMonth);
        /** @type {?} */
        var iditem = index + 'list';
        setTimeout((/**
         * @return {?}
         */
        function () {
            document.getElementById(iditem).scrollIntoView();
        }), 100);
    };
    // select month or year
    // select month or year
    /**
     * @param {?} monthYear
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.onChangeMonthYear = 
    // select month or year
    /**
     * @param {?} monthYear
     * @return {?}
     */
    function (monthYear) {
        // console.log('onChangeMonthYear', monthYear);
        if (monthYear) {
            if (this.isMonthSelect) {
                this.data.currentMonth = monthYear;
                this.selectedYearOrMonth = this.data.currentMonth;
                /** @type {?} */
                var monthNumber = this.monthsList.indexOf(this.data.currentMonth);
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
        /** @type {?} */
        var currentMonth = this.currentDate.getMonth();
        /** @type {?} */
        var currentYear = this.currentDate.getFullYear();
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
        /** @type {?} */
        var currentMonth = this.currentDate.getMonth();
        /** @type {?} */
        var currentYear = this.currentDate.getFullYear();
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
        /** @type {?} */
        var today = new Date(this.today);
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
    // Set hightlighted dates
    // Set hightlighted dates
    /**
     * @param {?} obj
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.setHightlightedDates = 
    // Set hightlighted dates
    /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        if (!obj.highlightedDates || obj.highlightedDates.length === 0) {
            this.highlightedDates = {};
        }
        else {
            this.highlightedDates = {};
            for (var i = 0; i < obj.highlightedDates.length; i++) {
                /** @type {?} */
                var hDate = obj.highlightedDates[i].date;
                /** @type {?} */
                var hColor = obj.highlightedDates[i].color;
                /** @type {?} */
                var hFontColor = obj.highlightedDates[i].fontColor;
                /** @type {?} */
                var hDateTime = this.resetHMSM(new Date(hDate)).getTime();
                this.highlightedDates[hDateTime] = { color: hColor, fontColor: hFontColor };
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
        /** @type {?} */
        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
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
            disabled = false;
            /** @type {?} */
            var day = tempDate.getDay();
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
            var hightLightDate = this.highlightedDates[tempDate.getTime()];
            /** @type {?} */
            var fontColor = null;
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
        /** @type {?} */
        var formattedDate = moment(selectedDate).format(this.mainObj.dateFormat);
        this.modalCtrl.dismiss({ 'date': formattedDate });
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
        /** @type {?} */
        var yearsList = [];
        /** @type {?} */
        var minYear = 1950;
        /** @type {?} */
        var maxYear = new Date().getFullYear() + 1;
        minYear = from ? new Date(from).getFullYear() : minYear;
        maxYear = to ? new Date(to).getFullYear() : maxYear;
        // console.log('getYearsList: ', this.yearInAscending);
        if (this.yearInAscending) {
            for (var i = minYear; i <= maxYear; i++) {
                yearsList.push(i);
            }
        }
        else {
            for (var i = maxYear; i >= minYear; i--) {
                yearsList.push(i);
            }
        }
        return yearsList;
    };
    // Init Date-Picker
    // Init Date-Picker
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.initDatePicker = 
    // Init Date-Picker
    /**
     * @return {?}
     */
    function () {
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
    };
    // Init DatePicker Object
    // Init DatePicker Object
    /**
     * @param {?} config
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.initDatePickerObj = 
    // Init DatePicker Object
    /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        // const config = this.mainObj;
        if (config.inputDate && !this.selectedDate.date) {
            this.isSelectedDateFound = true;
            this.selectedDate.date = config.inputDate;
        }
        /** @type {?} */
        var objConfig = {};
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
        objConfig.monthsList = tslib_1.__spread(objConfig.monthsList);
        objConfig.weeksList = config.weeksList ? config.weeksList : this.weeksList;
        objConfig.weeksList = tslib_1.__spread(objConfig.weeksList);
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
            var btnProperties = config.btnProperties;
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
            var arrowNextPrev = config.arrowNextPrev;
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
            var isSundayHighlighted = config.isSundayHighlighted;
            objConfig.isSundayHighlighted.fontColor = isSundayHighlighted.fontColor ? isSundayHighlighted.fontColor : null;
        }
        // console.log('config =>', objConfig);
        return objConfig;
    };
    // Format date
    // Format date
    /**
     * @return {?}
     */
    Ionic4DatepickerModalComponent.prototype.formatDate = 
    // Format date
    /**
     * @return {?}
     */
    function () {
        // console.log('formatDate: ', this.selctedDateEpoch, new Date(this.selctedDateEpoch));
        return moment(this.selctedDateEpoch).format(this.mainObj.dateFormat);
    };
    Ionic4DatepickerModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'li-ionic4-datepicker-modal',
                    template: "<ion-header>\r\n    <ion-toolbar (click)=\"changeToDateList()\">\r\n        <ion-title>\r\n            <h1 *ngIf=\"mainObj?.titleLabel\">{{mainObj?.titleLabel}}</h1>\r\n            {{selectedDateString}}\r\n        </ion-title>\r\n    </ion-toolbar>\r\n</ion-header>\r\n\r\n\r\n<ion-content forceOverscroll=\"false\" class=\"ion-no-padding ionic_datepicker_modal_content\">\r\n    <ion-grid class=\"ion-no-padding dp-month-year-container\"\r\n              [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-hide' : 'dp-virual-scroller-show'\">\r\n        <ion-row>\r\n            <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"prevMonth()\">\r\n                <ion-button [ngClass]=\"{'pointer_events_none':((firstDayEpoch - 86400000) < fromDate)}\">\r\n                    <ion-icon *ngIf=\"!mainObj?.arrowNextPrev?.prevArrowSrc\" name=\"arrow-back\"></ion-icon>\r\n                    <ion-icon *ngIf=\"mainObj?.arrowNextPrev?.prevArrowSrc\"\r\n                              src=\"{{mainObj?.arrowNextPrev?.prevArrowSrc}}\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n            <ion-col size=\"9\">\r\n                <ion-grid>\r\n                    <ion-row>\r\n                        <ion-col class=\"dp-select-month-year ion-no-padding\" size=\"5.5\" (click)=\"selectMonthYear(true)\">\r\n                            <ion-button class=\"dp-buttons\">\r\n                                {{ data.currentMonth }}\r\n                                <ion-icon name=\"caret-down\" class=\"dp-down-arrow\"></ion-icon>\r\n                            </ion-button>\r\n                        </ion-col>\r\n                        <ion-col size=\"1\"></ion-col>\r\n                        <ion-col class=\"dp-select-month-year ion-no-padding\" size=\"5.5\"\r\n                                 (click)=\"selectMonthYear(false)\">\r\n                            <ion-button class=\"dp-buttons\">\r\n                                {{ data.currentYear }}\r\n                                <ion-icon name=\"caret-down\" class=\"dp-down-arrow\"></ion-icon>\r\n                            </ion-button>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n            <ion-col size=\"1.5\" class=\"dp-left-right-arrow\" (click)=\"nextMonth()\">\r\n                <ion-button [ngClass]=\"{'pointer_events_none':((lastDayEpoch + 86400000)> toDate)}\">\r\n                    <ion-icon *ngIf=\"!mainObj?.arrowNextPrev?.nextArrowSrc\" name=\"arrow-forward\"></ion-icon>\r\n                    <ion-icon *ngIf=\"mainObj?.arrowNextPrev?.nextArrowSrc\"\r\n                              src=\"{{mainObj?.arrowNextPrev?.nextArrowSrc}}\"></ion-icon>\r\n                </ion-button>\r\n            </ion-col>\r\n        </ion-row>\r\n        <ion-row>\r\n            <ion-col>\r\n                <ion-grid class=\"dp-weeks-container\" *ngIf=\"daysList\"\r\n                          [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-hide' : 'dp-virual-scroller-show'\">\r\n                    <ion-row class=\" dp-weeks-name\">\r\n                        <ion-col *ngFor=\"let weekName of mainObj?.weeksList; let i = index\">\r\n                            <!-- <div class=\"weeks\">{{weekName}} {{i}}</div> -->\r\n                            <div class=\"weeks\" *ngIf=\"mainObj?.mondayFirst\"\r\n                                 [style.color]=\"mainObj?.isSundayHighlighted && i === 6 ? mainObj?.isSundayHighlighted.fontColor : ''\">\r\n                                {{weekName}}</div>\r\n                            <div class=\"weeks\" *ngIf=\"!mainObj?.mondayFirst\"\r\n                                 [style.color]=\"mainObj?.isSundayHighlighted && i === 0 ? mainObj?.isSundayHighlighted.fontColor : ''\">\r\n                                {{weekName}}</div>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                    <ion-row *ngFor=\"let row of rows;\" class=\"dp-days-list\">\r\n                        <ion-col\r\n                                class=\"ion-no-padding\"\r\n                                *ngFor=\"let col of cols; let i = index ;\" (click)=\"dateSelected(daysList[row + i])\"\r\n                                [style.background-color]=\"(daysList[row + i]?.color) ? (daysList[row + i]?.color) : ''\"\r\n                                [style.border-radius]=\"(daysList[row + i]?.color) ? '4px' : ''\" [ngClass]=\"{\r\n                                'dp-selecteddate': (daysList[row + i]?.epoch === selctedDateEpoch),\r\n                                'dp-today' : (daysList[row + i]?.epoch == today),\r\n                                'disabled' : (daysList[row + i]?.disabled)}\">\r\n                                    <div class=\"days\"\r\n                                         [style.color]=\"(daysList[row + i]?.fontColor) ? (daysList[row + i]?.fontColor) : ''\">\r\n                                        {{daysList[row + col]?.date}}\r\n                                    </div>\r\n                        </ion-col>\r\n                    </ion-row>\r\n                </ion-grid>\r\n            </ion-col>\r\n        </ion-row>\r\n    </ion-grid>\r\n    <ion-list class=\"dp-month-year-scroll-container\"\r\n              [ngClass]=\"isMonthYearSelectorOpen ? 'dp-virual-scroller-show' : 'dp-virual-scroller-hide'\">\r\n        <ion-item *ngFor=\"let monthYear of scrollingMonthOrYearArray;let i=index;\" id=\"{{i +'list'}}\"\r\n                  (click)=\"onChangeMonthYear(monthYear)\">\r\n            <ion-label [ngClass]=\"selectedYearOrMonth === monthYear ? 'dp-selected' : ''\">{{ monthYear }}</ion-label>\r\n        </ion-item>\r\n    </ion-list>\r\n</ion-content>\r\n\r\n<ion-footer>\r\n    <ion-toolbar>\r\n        <ion-grid class=\"ion-no-padding\">\r\n            <ion-row class=\"ion-no-padding\"\r\n                     [ngClass]=\"mainObj?.btnCloseSetInReverse ? 'dp-btn-set-close-in-reverse' : ''\">\r\n                <ion-col class=\"ion-no-padding\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\"\r\n                                size=\"{{mainObj?.btnProperties?.size}}\" color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"closeIonicDatePickerModal()\">\r\n                        {{mainObj?.closeLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col class=\"ion-no-padding\" *ngIf=\"mainObj?.showTodayButton\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\"\r\n                                size=\"{{mainObj?.btnProperties?.size}}\" color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"setIonicDatePickerTodayDate()\">\r\n                        {{mainObj?.todayLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n                <ion-col class=\"ion-no-padding\" *ngIf=\"!mainObj?.closeOnSelect\">\r\n                    <ion-button class=\"ion-button\" expand=\"{{mainObj?.btnProperties?.expand}}\"\r\n                                fill=\"{{mainObj?.btnProperties?.fill}}\" size=\"{{mainObj?.btnProperties?.size}}\"\r\n                                color=\"{{mainObj?.btnProperties?.color}}\"\r\n                                disabled=\"{{mainObj?.btnProperties?.disabled || !isSelectedDateFound}}\"\r\n                                strong=\"{{mainObj?.btnProperties?.strong}}\" (click)=\"setIonicDatePickerDate()\">\r\n                        {{mainObj?.setLabel}}\r\n                    </ion-button>\r\n                </ion-col>\r\n            </ion-row>\r\n        </ion-grid>\r\n    </ion-toolbar>\r\n</ion-footer>\r\n",
                    styles: [":host ion-header{height:60px}:host ion-header ion-toolbar{--background:var(--ion-color-primary);height:100%;align-items:center;display:flex;color:var(--ion-color-primary-contrast)}:host ion-header ion-toolbar ion-title{font-size:20px;font-weight:700;text-align:center;padding:0;display:flex;align-items:center;justify-content:center;height:100%;cursor:pointer}:host ion-header ion-toolbar ion-title h1{font-size:14px;margin:0 0 4px}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col{display:flex;justify-content:center;align-items:center}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid{width:100%}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year{border-bottom:1.5px solid;border-bottom-color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-buttons{width:100%;height:40px;margin:0;padding:0;color:var(--ion-color-primary);--background:transparent;--box-shadow:none}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-buttons.activated{--background-activated:transparent;--color-activated:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container ion-col ion-grid .dp-select-month-year .dp-down-arrow{position:absolute;width:16px;right:0;top:10px;color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button{--background:transparent;--box-shadow:0;color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button:focus{outline:0}:host .ionic_datepicker_modal_content .dp-month-year-container .dp-left-right-arrow ion-button.activated{--ion-color-primary-shade:transparent;--ion-color-primary-contrast:var(--ion-color-primary-tint)}:host .ionic_datepicker_modal_content .dp-weeks-container{margin:8px 0}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col{display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-weeks-name ion-col .weeks{width:14%;display:flex;justify-content:center;font-weight:700}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col{display:flex;justify-content:center;padding:10px;cursor:pointer}:host .ionic_datepicker_modal_content .dp-weeks-container .dp-days-list ion-col .days{width:14%;display:flex;justify-content:center}:host .ionic_datepicker_modal_content .dp-selecteddate{background:var(--ion-color-primary);color:var(--ion-color-primary-contrast);border-radius:4px;font-weight:500}:host .ionic_datepicker_modal_content .dp-today{border-radius:4px;font-weight:500;border:1px solid;border-color:var(--ion-color-primary)}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container{position:absolute;top:0;bottom:0;left:0;right:0;margin:0;overflow-y:scroll}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item{--padding-start:0;--inner-padding-end:0;--inner-border-width:0}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item ion-label{text-align:center;margin:0;font-size:16px}:host .ionic_datepicker_modal_content .dp-month-year-scroll-container ion-item ion-label.dp-selected{color:var(--ion-color-primary);font-size:20px;font-weight:500}:host .disabled{color:#aaa}:host .dp-virual-scroller-show{transition:opacity .3s ease-in;opacity:1;visibility:visible}:host .dp-virual-scroller-hide{opacity:0;visibility:hidden;height:auto}:host ion-footer{height:55px}:host ion-footer ion-toolbar{height:100%;--border-width:0;--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px}:host ion-footer ion-toolbar .toolbar-container{height:100%}:host ion-footer ion-toolbar .dp-btn-set-close-in-reverse{flex-direction:row-reverse}:host ion-footer ion-toolbar ion-button{--border-radius:0;height:55px;margin:0}:host ion-footer ion-toolbar ion-button:focus{outline:0}:host ion-footer ion-toolbar ion-button.activated{--background-activated:var(--ion-color-primary-tint);--color-activated:var(--ion-color-primary-contrast)}"]
                }] }
    ];
    /** @nocollapse */
    Ionic4DatepickerModalComponent.ctorParameters = function () { return [
        { type: NavParams },
        { type: ModalController },
        { type: Ionic4DatepickerService }
    ]; };
    Ionic4DatepickerModalComponent.propDecorators = {
        content: [{ type: ViewChild, args: [IonContent, { static: false },] }]
    };
    return Ionic4DatepickerModalComponent;
}());
export { Ionic4DatepickerModalComponent };
if (false) {
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.content;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.currentDate;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.today;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.mainObj;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selectedDate;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selctedDateEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.firstDayEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.lastDayEpoch;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.disabledDates;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.highlightedDates;
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
    Ionic4DatepickerModalComponent.prototype.yearInAscending;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.momentLocale;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selectedDateString;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.isMonthYearSelectorOpen;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.selectedYearOrMonth;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.isMonthSelect;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.scrollingMonthOrYearArray;
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.isSelectedDateFound;
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
    /** @type {?} */
    Ionic4DatepickerModalComponent.prototype.datePickerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxvZ2lzdGljaW5mb3RlY2gvaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhFLE9BQU8sS0FBSyxPQUFPLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOztJQUNqRSxNQUFNLEdBQUcsT0FBTztBQUV0QjtJQXFERSx3Q0FDVSxTQUFvQixFQUNwQixTQUEwQixFQUMzQixpQkFBMEM7UUFGekMsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMzQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlCOztRQTNDbkQsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixpQkFBWSxHQUFRLEVBQUUsQ0FBQzs7UUFHdkIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBSXJCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQUkzQixvQkFBZSxHQUFHLEVBQUUsQ0FBQztRQUNyQixTQUFJLEdBQVE7WUFDVixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLG9CQUFvQixFQUFFLEVBQUU7U0FDekIsQ0FBQztRQUlGLFNBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUs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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7UUFDakcsU0FBUyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUUsU0FBUyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDakYsU0FBUyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDeEUsU0FBUyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDL0QsU0FBUyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdkUsU0FBUyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7UUFDdkUsU0FBUyxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDM0UsU0FBUyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFcEUsU0FBUyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENB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T25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5hdlBhcmFtcywgTW9kYWxDb250cm9sbGVyLCBJb25Db250ZW50IH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5cclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgeyBJb25pYzREYXRlcGlja2VyU2VydmljZSB9IGZyb20gJy4uL2lvbmljNC1kYXRlcGlja2VyLnNlcnZpY2UnO1xyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaS1pb25pYzQtZGF0ZXBpY2tlci1tb2RhbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJb25pYzREYXRlcGlja2VyTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoSW9uQ29udGVudCwge3N0YXRpYzogZmFsc2V9KSBjb250ZW50OiBJb25Db250ZW50O1xyXG5cclxuICBjdXJyZW50RGF0ZTtcclxuICB0b2RheTtcclxuXHJcbiAgLy8gaW5wdXRzXHJcbiAgbWFpbk9iajogYW55ID0ge307XHJcbiAgc2VsZWN0ZWREYXRlOiBhbnkgPSB7fTtcclxuXHJcbiAgLy8gY29tcG9uZW50IHZhcmlhYmxlc1xyXG4gIHNlbGN0ZWREYXRlRXBvY2ggPSAwO1xyXG4gIGZpcnN0RGF5RXBvY2g7XHJcbiAgbGFzdERheUVwb2NoO1xyXG5cclxuICBkaXNhYmxlZERhdGVzID0gW107XHJcbiAgaGlnaGxpZ2h0ZWREYXRlczogYW55ID0ge307XHJcblxyXG4gIGZyb21EYXRlO1xyXG4gIHRvRGF0ZTtcclxuICBkaXNhYmxlV2Vla2RheXMgPSBbXTtcclxuICBkYXRhOiBhbnkgPSB7XHJcbiAgICBjdXJyZW50TW9udGg6ICcnLFxyXG4gICAgY3VycmVudFllYXI6ICcnLFxyXG4gICAgY3VycmVudE1vbnRoU2VsZWN0ZWQ6ICcnXHJcbiAgfTtcclxuICBjdXJyZW50WWVhclNlbGVjdGVkO1xyXG4gIG51bUNvbHVtbnM7XHJcblxyXG4gIHJvd3MgPSBbMCwgNywgMTQsIDIxLCAyOCwgMzVdO1xyXG4gIGNvbHMgPSBbMCwgMSwgMiwgMywgNCwgNSwgNl07XHJcbiAgbW9udGhzTGlzdCA9IFsnSmFuJywgJ0ZlYicsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcbiAgd2Vla3NMaXN0ID0gWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ107XHJcbiAgeWVhcnNMaXN0ID0gW107XHJcbiAgZGF5c0xpc3QgPSBbXTtcclxuICB5ZWFySW5Bc2NlbmRpbmcgPSBmYWxzZTtcclxuICBtb21lbnRMb2NhbGUgPSAnZW4tVVMnO1xyXG4gIHNlbGVjdGVkRGF0ZVN0cmluZztcclxuXHJcbiAgLy8gbW9udGggeWVhciBzY3JvbGwgdmFyaWFibGVzXHJcbiAgaXNNb250aFllYXJTZWxlY3Rvck9wZW4gPSBmYWxzZTtcclxuICBzZWxlY3RlZFllYXJPck1vbnRoO1xyXG4gIGlzTW9udGhTZWxlY3Q7XHJcbiAgc2Nyb2xsaW5nTW9udGhPclllYXJBcnJheTogYW55ID0gW107XHJcblxyXG4gIGlzU2VsZWN0ZWREYXRlRm91bmQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG5hdlBhcmFtczogTmF2UGFyYW1zLFxyXG4gICAgcHJpdmF0ZSBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHB1YmxpYyBkYXRlUGlja2VyU2VydmljZTogSW9uaWM0RGF0ZXBpY2tlclNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMudG9kYXkgPSB0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcbiAgICBpZiAodGhpcy5uYXZQYXJhbXMuZ2V0KCdzZWxlY3RlZERhdGUnKSkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnU2VsZWN0ZWQgZGF0ZSA9PicsIHRoaXMubmF2UGFyYW1zLmdldCgnc2VsZWN0ZWREYXRlJykpO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID0gdGhpcy5uYXZQYXJhbXMuZ2V0KCdzZWxlY3RlZERhdGUnKTtcclxuICAgICAgdGhpcy5pc1NlbGVjdGVkRGF0ZUZvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMubWFpbk9iaiA9IHRoaXMuaW5pdERhdGVQaWNrZXJPYmoodGhpcy5uYXZQYXJhbXMuZ2V0KCdvYmpDb25maWcnKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaXNNb2RhbE9wZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5pbml0RGF0ZVBpY2tlcigpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRhdGVQaWNrZXJTZXJ2aWNlLmlzTW9kYWxPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyBSZXNldCB0aGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgYW5kIG1pbGxpIHNlY29uZHNcclxuICByZXNldEhNU00oY3VycmVudERhdGUpIHtcclxuICAgIGN1cnJlbnREYXRlLnNldEhvdXJzKDApO1xyXG4gICAgY3VycmVudERhdGUuc2V0TWludXRlcygwKTtcclxuICAgIGN1cnJlbnREYXRlLnNldFNlY29uZHMoMCk7XHJcbiAgICBjdXJyZW50RGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XHJcbiAgICByZXR1cm4gY3VycmVudERhdGU7XHJcbiAgfVxyXG5cclxuICAvLyB0aGlzIG1ldGhvZCBjaGFuZ2UgbW9udGggb3IgeWVhciBsaXN0IHRvIGRhdGVMaXN0XHJcbiAgY2hhbmdlVG9EYXRlTGlzdCgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdjaGFuZ2VUb0RhdGVMaXN0Jyk7XHJcbiAgICB0aGlzLmlzTW9udGhZZWFyU2VsZWN0b3JPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvLyBWaXJ0dWFsIHNjcm9sbCBjcmVhdGUgZm9yIHNlbGVjdCB5ZWFyIGFuZCBtb250aFxyXG4gIHNlbGVjdE1vbnRoWWVhcihpc01vbnRoU2VsZWN0KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2VsZWN0TW9udGhZZWFyJywgaSk7XHJcbiAgICB0aGlzLmlzTW9udGhZZWFyU2VsZWN0b3JPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmlzTW9udGhTZWxlY3QgPSBpc01vbnRoU2VsZWN0O1xyXG4gICAgdGhpcy5zY3JvbGxpbmdNb250aE9yWWVhckFycmF5ID0gaXNNb250aFNlbGVjdCA/IHRoaXMubWFpbk9iai5tb250aHNMaXN0IDogdGhpcy55ZWFyc0xpc3Q7XHJcbiAgICB0aGlzLnNlbGVjdGVkWWVhck9yTW9udGggPSBpc01vbnRoU2VsZWN0ID8gdGhpcy5kYXRhLmN1cnJlbnRNb250aCA6IHRoaXMuZGF0YS5jdXJyZW50WWVhcjtcclxuXHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc2Nyb2xsaW5nTW9udGhPclllYXJBcnJheS5pbmRleE9mKHRoaXMuc2VsZWN0ZWRZZWFyT3JNb250aCk7XHJcbiAgICBjb25zdCBpZGl0ZW0gPSBpbmRleCArICdsaXN0JztcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRpdGVtKS5zY3JvbGxJbnRvVmlldygpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9XHJcblxyXG4gIC8vIHNlbGVjdCBtb250aCBvciB5ZWFyXHJcbiAgb25DaGFuZ2VNb250aFllYXIobW9udGhZZWFyKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25DaGFuZ2VNb250aFllYXInLCBtb250aFllYXIpO1xyXG4gICAgaWYgKG1vbnRoWWVhcikge1xyXG4gICAgICBpZiAodGhpcy5pc01vbnRoU2VsZWN0KSB7XHJcbiAgICAgICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IG1vbnRoWWVhcjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkWWVhck9yTW9udGggPSB0aGlzLmRhdGEuY3VycmVudE1vbnRoO1xyXG4gICAgICAgIGNvbnN0IG1vbnRoTnVtYmVyID0gdGhpcy5tb250aHNMaXN0LmluZGV4T2YodGhpcy5kYXRhLmN1cnJlbnRNb250aCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXREYXRlKDEpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0TW9udGgobW9udGhOdW1iZXIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGF0YS5jdXJyZW50WWVhciA9IG1vbnRoWWVhcjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkWWVhck9yTW9udGggPSB0aGlzLmRhdGEuY3VycmVudFllYXI7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRGdWxsWWVhcih0aGlzLmRhdGEuY3VycmVudFllYXIpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pc01vbnRoWWVhclNlbGVjdG9yT3BlbiA9IGZhbHNlO1xyXG5cclxuICB9XHJcblxyXG4gIC8vIFByZXZpb3VzIG1vbnRoXHJcbiAgcHJldk1vbnRoKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3ByZXZOZXh0JywgdGhpcy5jdXJyZW50RGF0ZSk7XHJcbiAgICBjb25zdCBjdXJyZW50TW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XHJcbiAgICBjb25zdCBjdXJyZW50WWVhciA9IHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIGlmIChjdXJyZW50WWVhciA8PSB0aGlzLnllYXJzTGlzdFsodGhpcy55ZWFyc0xpc3QubGVuZ3RoIC0gMSldICYmIGN1cnJlbnRNb250aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudE1vbnRoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuY3VycmVudERhdGUuc2V0RnVsbFllYXIoY3VycmVudFllYXIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRNb250aChjdXJyZW50TW9udGggLSAxKTtcclxuICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGggPSB0aGlzLm1haW5PYmoubW9udGhzTGlzdFtjdXJyZW50TW9udGhdO1xyXG4gICAgdGhpcy5kYXRhLmN1cnJlbnRZZWFyID0gY3VycmVudFllYXI7XHJcbiAgICB0aGlzLnJlZnJlc2hEYXRlTGlzdCh0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgIC8vIHRoaXMuY2hhbmdlRGF5U2VsZWN0ZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIE5leHQgbW9udGhcclxuICBuZXh0TW9udGgoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnbmV4dE5leHQnLCB0aGlzLmN1cnJlbnREYXRlKTtcclxuICAgIGNvbnN0IGN1cnJlbnRNb250aCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcclxuICAgIGNvbnN0IGN1cnJlbnRZZWFyID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgaWYgKGN1cnJlbnRZZWFyID49IHRoaXMueWVhcnNMaXN0WzBdICYmIGN1cnJlbnRNb250aCA9PT0gMTEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRNb250aCA9PT0gMTEpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRGdWxsWWVhcihjdXJyZW50WWVhcik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldERhdGUoMSk7XHJcbiAgICB0aGlzLmN1cnJlbnREYXRlLnNldE1vbnRoKGN1cnJlbnRNb250aCArIDEpO1xyXG4gICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IHRoaXMubWFpbk9iai5tb250aHNMaXN0W2N1cnJlbnRNb250aF07XHJcbiAgICB0aGlzLmRhdGEuY3VycmVudFllYXIgPSBjdXJyZW50WWVhcjtcclxuICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KHRoaXMuY3VycmVudERhdGUpO1xyXG4gICAgLy8gdGhpcy5jaGFuZ2VEYXlTZWxlY3RlZCgpO1xyXG4gIH1cclxuXHJcbiAgLy8gY2hhbmdlRGF5U2VsZWN0ZWQgKCBkYXkgc2VsZWN0aW9uIGNoYW5nZXMgKVxyXG4gIGNoYW5nZURheVNlbGVjdGVkKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2NoYW5nZURheVNlbGVjdGVkJyk7XHJcbiAgICBjb25zdCBuZXdTZWxlY3RlZERhdGU6IGFueSA9IG5ldyBEYXRlKHRoaXMuc2VsY3RlZERhdGVFcG9jaCk7XHJcbiAgICBuZXdTZWxlY3RlZERhdGUuc2V0TW9udGgodGhpcy5jdXJyZW50RGF0ZS5nZXRNb250aCgpKTtcclxuICAgIG5ld1NlbGVjdGVkRGF0ZS5zZXRZZWFyKHRoaXMuY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSBuZXdTZWxlY3RlZERhdGUuZ2V0VGltZSgpO1xyXG4gICAgdGhpcy5zZWxlY3RlZERhdGVTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGUoKTtcclxuICAgIC8vIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xyXG4gIH1cclxuXHJcbiAgLy8gRGF0ZSBzZWxlY3RlZFxyXG4gIGRhdGVTZWxlY3RlZChzZWxlY3RlZERhdGUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdkYXRlU2VsZWN0ZWQgPT4nLCBzZWxlY3RlZERhdGUpO1xyXG4gICAgaWYgKHNlbGVjdGVkRGF0ZSAmJiAhc2VsZWN0ZWREYXRlLmRpc2FibGVkKSB7XHJcbiAgICAgIGlmICghc2VsZWN0ZWREYXRlIHx8IE9iamVjdC5rZXlzKHNlbGVjdGVkRGF0ZSkubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWREYXRlRm91bmQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSBzZWxlY3RlZERhdGUuZXBvY2g7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nID0gdGhpcy5mb3JtYXREYXRlKCk7XHJcbiAgICAgIGlmICh0aGlzLm1haW5PYmouY2xvc2VPblNlbGVjdCkge1xyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdG9kYXkgYXMgZGF0ZSBmb3IgdGhlIG1vZGFsXHJcbiAgc2V0SW9uaWNEYXRlUGlja2VyVG9kYXlEYXRlKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3NldElvbmljRGF0ZVBpY2tlclRvZGF5RGF0ZScpO1xyXG4gICAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSh0aGlzLnRvZGF5KTtcclxuICAgIGNvbnN0IHRvZGF5X29iaiA9IHtcclxuICAgICAgZGF0ZTogdG9kYXkuZ2V0RGF0ZSgpLFxyXG4gICAgICBtb250aDogdG9kYXkuZ2V0TW9udGgoKSxcclxuICAgICAgeWVhcjogdG9kYXkuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgZGF5OiB0b2RheS5nZXREYXkoKSxcclxuICAgICAgZXBvY2g6IHRvZGF5LmdldFRpbWUoKSxcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kYXRlU2VsZWN0ZWQodG9kYXlfb2JqKTtcclxuICAgIHRoaXMucmVmcmVzaERhdGVMaXN0KG5ldyBEYXRlKCkpO1xyXG4gICAgdGhpcy5zZWxjdGVkRGF0ZUVwb2NoID0gdGhpcy5yZXNldEhNU00odG9kYXkpLmdldFRpbWUoKTtcclxuICAgIHRoaXMuc2VsZWN0ZWREYXRlU3RyaW5nID0gdGhpcy5mb3JtYXREYXRlKCk7XHJcbiAgICAvLyB0aGlzLmNsb3NlTW9kYWwodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKTtcclxuICB9XHJcblxyXG4gIC8vIFNldCBkYXRlIGZvciB0aGUgbW9kYWxcclxuICBzZXRJb25pY0RhdGVQaWNrZXJEYXRlKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3NldElvbmljRGF0ZVBpY2tlckRhdGUnKTtcclxuICAgIHRoaXMuY2xvc2VNb2RhbCh0aGlzLnNlbGN0ZWREYXRlRXBvY2gpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0dGluZyB0aGUgZGlzYWJsZWQgZGF0ZXMgbGlzdC5cclxuICBzZXREaXNhYmxlZERhdGVzKG9iaikge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ3NldERpc2FibGVkRGF0ZXMgPT4nLCBvYmopO1xyXG4gICAgaWYgKCFvYmouZGlzYWJsZWREYXRlcyB8fCBvYmouZGlzYWJsZWREYXRlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5kaXNhYmxlZERhdGVzID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpc2FibGVkRGF0ZXMgPSBbXTtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmouZGlzYWJsZWREYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIHZhbCA9IHJlc2V0SE1TTShuZXcgRGF0ZSh2YWwpKTtcclxuICAgICAgICB0aGlzLmRpc2FibGVkRGF0ZXMucHVzaCh0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZShvYmouZGlzYWJsZWREYXRlc1tpXSkpLmdldFRpbWUoKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFNldCBoaWdodGxpZ2h0ZWQgZGF0ZXNcclxuICBzZXRIaWdodGxpZ2h0ZWREYXRlcyhvYmopIHtcclxuICAgIGlmICghb2JqLmhpZ2hsaWdodGVkRGF0ZXMgfHwgb2JqLmhpZ2hsaWdodGVkRGF0ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaGlnaGxpZ2h0ZWREYXRlcyA9IHt9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWdobGlnaHRlZERhdGVzID0ge307XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmhpZ2hsaWdodGVkRGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBoRGF0ZSA9IG9iai5oaWdobGlnaHRlZERhdGVzW2ldLmRhdGU7XHJcbiAgICAgICAgY29uc3QgaENvbG9yID0gb2JqLmhpZ2hsaWdodGVkRGF0ZXNbaV0uY29sb3I7XHJcbiAgICAgICAgY29uc3QgaEZvbnRDb2xvciA9IG9iai5oaWdobGlnaHRlZERhdGVzW2ldLmZvbnRDb2xvcjtcclxuICAgICAgICBjb25zdCBoRGF0ZVRpbWUgPSB0aGlzLnJlc2V0SE1TTShuZXcgRGF0ZShoRGF0ZSkpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRGF0ZXNbaERhdGVUaW1lXSA9IHsgY29sb3I6IGhDb2xvciwgZm9udENvbG9yOiBoRm9udENvbG9yIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFJlZnJlc2ggdGhlIGxpc3Qgb2YgdGhlIGRhdGVzIG9mIGEgbW9udGhcclxuICByZWZyZXNoRGF0ZUxpc3QoY3VycmVudERhdGUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdyZWZyZXNoRGF0ZUxpc3QgPT4nLCBjdXJyZW50RGF0ZSk7XHJcbiAgICBjdXJyZW50RGF0ZSA9IHRoaXMucmVzZXRITVNNKGN1cnJlbnREYXRlKTtcclxuICAgIHRoaXMuY3VycmVudERhdGUgPSBjdXJyZW50RGF0ZTtcclxuXHJcbiAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIDEpLmdldERhdGUoKTtcclxuICAgIGNvbnN0IGxhc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIHRoaXMubW9udGhzTGlzdCA9IFtdO1xyXG4gICAgaWYgKHRoaXMubWFpbk9iai5tb250aHNMaXN0ICYmIHRoaXMubWFpbk9iai5tb250aHNMaXN0Lmxlbmd0aCA9PT0gMTIpIHtcclxuICAgICAgdGhpcy5tb250aHNMaXN0ID0gdGhpcy5tYWluT2JqLm1vbnRoc0xpc3Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vbnRoc0xpc3QgPSB0aGlzLm1vbnRoc0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy55ZWFyc0xpc3QgPSB0aGlzLmdldFllYXJzTGlzdCh0aGlzLm1haW5PYmouZnJvbSwgdGhpcy5tYWluT2JqLnRvKTtcclxuXHJcbiAgICB0aGlzLmRheXNMaXN0ID0gW107XHJcbiAgICBsZXQgdGVtcERhdGUsIGRpc2FibGVkO1xyXG4gICAgdGhpcy5maXJzdERheUVwb2NoID0gdGhpcy5yZXNldEhNU00obmV3IERhdGUoY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSwgY3VycmVudERhdGUuZ2V0TW9udGgoKSwgZmlyc3REYXkpKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLmxhc3REYXlFcG9jaCA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGxhc3REYXkpKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IGZpcnN0RGF5OyBpIDw9IGxhc3REYXk7IGkrKykge1xyXG4gICAgICB0ZW1wRGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGkpO1xyXG4gICAgICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICBjb25zdCBkYXkgPSB0ZW1wRGF0ZS5nZXREYXkoKTtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZVdlZWtkYXlzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlV2Vla2RheXMuaW5kZXhPZihkYXkpID49IDApIHtcclxuICAgICAgICAgIGRpc2FibGVkID0gdGhpcy5kaXNhYmxlV2Vla2RheXMuaW5kZXhPZihkYXkpID49IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZERhdGVzLmluZGV4T2YodGVtcERhdGUuZ2V0VGltZSgpKSA+PSAwKSB7XHJcbiAgICAgICAgICBkaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5mcm9tRGF0ZSAmJiAhZGlzYWJsZWQpIHtcclxuICAgICAgICBkaXNhYmxlZCA9ICh0ZW1wRGF0ZS5nZXRUaW1lKCkgPCB0aGlzLmZyb21EYXRlKVxyXG4gICAgICAgICAgfHwgdGhpcy5tYWluT2JqLmRpc2FibGVXZWVrRGF5cy5pbmRleE9mKHRlbXBEYXRlLmdldERheSgpKSA+PSAwO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnRvRGF0ZSAmJiAhZGlzYWJsZWQpIHtcclxuICAgICAgICBkaXNhYmxlZCA9ICh0ZW1wRGF0ZS5nZXRUaW1lKCkgPiB0aGlzLnRvRGF0ZSlcclxuICAgICAgICAgIHx8IHRoaXMubWFpbk9iai5kaXNhYmxlV2Vla0RheXMuaW5kZXhPZih0ZW1wRGF0ZS5nZXREYXkoKSkgPj0gMDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgaGlnaHRMaWdodERhdGUgPSB0aGlzLmhpZ2hsaWdodGVkRGF0ZXNbdGVtcERhdGUuZ2V0VGltZSgpXTtcclxuXHJcbiAgICAgIGxldCBmb250Q29sb3IgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKHRlbXBEYXRlLmdldERheSgpID09PSAwICYmIHRoaXMubWFpbk9iai5pc1N1bmRheUhpZ2hsaWdodGVkICYmIHRoaXMubWFpbk9iai5pc1N1bmRheUhpZ2hsaWdodGVkLmZvbnRDb2xvcikge1xyXG4gICAgICAgIGZvbnRDb2xvciA9IHRoaXMubWFpbk9iai5pc1N1bmRheUhpZ2hsaWdodGVkLmZvbnRDb2xvcjtcclxuICAgICAgfSBlbHNlIGlmIChoaWdodExpZ2h0RGF0ZSAmJiBoaWdodExpZ2h0RGF0ZS5mb250Q29sb3IpIHtcclxuICAgICAgICBmb250Q29sb3IgPSBoaWdodExpZ2h0RGF0ZS5mb250Q29sb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZGF5c0xpc3QucHVzaCh7XHJcbiAgICAgICAgZGF0ZTogdGVtcERhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIG1vbnRoOiB0ZW1wRGF0ZS5nZXRNb250aCgpLFxyXG4gICAgICAgIHllYXI6IHRlbXBEYXRlLmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgZGF5OiB0ZW1wRGF0ZS5nZXREYXkoKSxcclxuICAgICAgICBlcG9jaDogdGVtcERhdGUuZ2V0VGltZSgpLFxyXG4gICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZCxcclxuICAgICAgICBjb2xvcjogaGlnaHRMaWdodERhdGUgJiYgaGlnaHRMaWdodERhdGUuY29sb3IgPyBoaWdodExpZ2h0RGF0ZS5jb2xvciA6IG51bGwsXHJcbiAgICAgICAgZm9udENvbG9yOiBmb250Q29sb3JcclxuICAgICAgICAvLyBmb250Q29sb3I6IGhpZ2h0TGlnaHREYXRlICYmIGhpZ2h0TGlnaHREYXRlLmZvbnRDb2xvciA/IGhpZ2h0TGlnaHREYXRlLmZvbnRDb2xvciA6IG51bGxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVG8gc2V0IE1vbmRheSBhcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgbGV0IGZpcnN0RGF5TW9uZGF5ID0gdGhpcy5kYXlzTGlzdFswXS5kYXkgLSB0aGlzLm1haW5PYmoubW9uZGF5Rmlyc3Q7XHJcbiAgICBmaXJzdERheU1vbmRheSA9IChmaXJzdERheU1vbmRheSA8IDApID8gNiA6IGZpcnN0RGF5TW9uZGF5O1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBmaXJzdERheU1vbmRheTsgaisrKSB7XHJcbiAgICAgIHRoaXMuZGF5c0xpc3QudW5zaGlmdCh7fSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJvd3MgPSBbMCwgNywgMTQsIDIxLCAyOCwgMzVdO1xyXG4gICAgdGhpcy5jb2xzID0gWzAsIDEsIDIsIDMsIDQsIDUsIDZdO1xyXG4gICAgdGhpcy5kYXRhLmN1cnJlbnRNb250aCA9IHRoaXMubWFpbk9iai5tb250aHNMaXN0W2N1cnJlbnREYXRlLmdldE1vbnRoKCldO1xyXG4gICAgdGhpcy5kYXRhLmN1cnJlbnRZZWFyID0gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHRoaXMuZGF0YS5jdXJyZW50TW9udGhTZWxlY3RlZCA9IHRoaXMuZGF0YS5jdXJyZW50TW9udGg7XHJcbiAgICB0aGlzLmN1cnJlbnRZZWFyU2VsZWN0ZWQgPSB0aGlzLmRhdGEuY3VycmVudFllYXI7XHJcbiAgICB0aGlzLm51bUNvbHVtbnMgPSA3O1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0dGluZyB1cCB0aGUgaW5pdGlhbCBvYmplY3RcclxuICBzZXRJbml0aWFsT2JqKGlwT2JqKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnc2V0SW5pdGlhbE9iaiA9PicsIGlwT2JqKTtcclxuICAgIHRoaXMubWFpbk9iaiA9IGlwT2JqO1xyXG4gICAgaWYgKHRoaXMuaXNTZWxlY3RlZERhdGVGb3VuZCkge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWREYXRlRm91bmQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlbGN0ZWREYXRlRXBvY2ggPSB0aGlzLnJlc2V0SE1TTSh0aGlzLm1haW5PYmouaW5wdXREYXRlKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZWxlY3RlZERhdGVTdHJpbmcgPSB0aGlzLmZvcm1hdERhdGUoKTtcclxuXHJcbiAgICBpZiAodGhpcy5tYWluT2JqLndlZWtzTGlzdCAmJiB0aGlzLm1haW5PYmoud2Vla3NMaXN0Lmxlbmd0aCA9PT0gNykge1xyXG4gICAgICB0aGlzLndlZWtzTGlzdCA9IHRoaXMubWFpbk9iai53ZWVrc0xpc3Q7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5tYWluT2JqLm1vbmRheUZpcnN0KSB7XHJcbiAgICAgIHRoaXMud2Vla3NMaXN0LnB1c2godGhpcy5tYWluT2JqLndlZWtzTGlzdC5zaGlmdCgpKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1haW5PYmoueWVhckluQXNjZW5kaW5nKSB7XHJcbiAgICAgIHRoaXMueWVhckluQXNjZW5kaW5nID0gdGhpcy5tYWluT2JqLnllYXJJbkFzY2VuZGluZztcclxuICAgIH1cclxuICAgIGlmICh0aGlzLm1haW5PYmoubW9tZW50TG9jYWxlKSB7XHJcbiAgICAgIHRoaXMubW9tZW50TG9jYWxlID0gdGhpcy5tYWluT2JqLm1vbWVudExvY2FsZTtcclxuICAgIH1cclxuICAgIHRoaXMuZGlzYWJsZVdlZWtkYXlzID0gdGhpcy5tYWluT2JqLmRpc2FibGVXZWVrRGF5cztcclxuICAgIHRoaXMuc2V0RGlzYWJsZWREYXRlcyh0aGlzLm1haW5PYmopO1xyXG4gICAgdGhpcy5yZWZyZXNoRGF0ZUxpc3QodGhpcy5tYWluT2JqLmlucHV0RGF0ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBmb3IgZGlzbWlzcyBtb2RhbFxyXG4gIGNsb3NlTW9kYWwoc2VsZWN0ZWREYXRlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnY2xvc2VNb2RhbCA9PiAnLCBzZWxlY3RlZERhdGUpO1xyXG4gICAgdGhpcy5tb2RhbEN0cmwuZ2V0VG9wKCk7XHJcbiAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gbW9tZW50KHNlbGVjdGVkRGF0ZSkuZm9ybWF0KHRoaXMubWFpbk9iai5kYXRlRm9ybWF0KTtcclxuICAgIHRoaXMubW9kYWxDdHJsLmRpc21pc3MoeyAnZGF0ZSc6IGZvcm1hdHRlZERhdGUgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBjbG9zZSBtb2RhbCBidXR0b25cclxuICBjbG9zZUlvbmljRGF0ZVBpY2tlck1vZGFsKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2Nsb3NlSW9uaWNEYXRlUGlja2VyTW9kYWwnKTtcclxuICAgIHRoaXMuY2xvc2VNb2RhbChudWxsKTtcclxuICB9XHJcblxyXG4gIC8vIGdldCB5ZWFycyBsaXN0ICAoIEdJVkUgSEVSRSBNSU4gT1IgTUFYIFlFQVIgSU4gREFURV9QSUNLRVIgKVxyXG4gIGdldFllYXJzTGlzdChmcm9tLCB0bykge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2dldFllYXJzTGlzdCA9PicsIGZyb20sIHRvKTtcclxuICAgIGNvbnN0IHllYXJzTGlzdCA9IFtdO1xyXG4gICAgbGV0IG1pblllYXIgPSAxOTUwO1xyXG4gICAgbGV0IG1heFllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxO1xyXG4gICAgbWluWWVhciA9IGZyb20gPyBuZXcgRGF0ZShmcm9tKS5nZXRGdWxsWWVhcigpIDogbWluWWVhcjtcclxuICAgIG1heFllYXIgPSB0byA/IG5ldyBEYXRlKHRvKS5nZXRGdWxsWWVhcigpIDogbWF4WWVhcjtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdnZXRZZWFyc0xpc3Q6ICcsIHRoaXMueWVhckluQXNjZW5kaW5nKTtcclxuICAgIGlmICh0aGlzLnllYXJJbkFzY2VuZGluZykge1xyXG4gICAgICBmb3IgKGxldCBpID0gbWluWWVhcjsgaSA8PSBtYXhZZWFyOyBpKyspIHtcclxuICAgICAgICB5ZWFyc0xpc3QucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZm9yIChsZXQgaSA9IG1heFllYXI7IGkgPj0gbWluWWVhcjsgaS0tKSB7XHJcbiAgICAgICAgeWVhcnNMaXN0LnB1c2goaSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB5ZWFyc0xpc3Q7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0IERhdGUtUGlja2VyXHJcbiAgaW5pdERhdGVQaWNrZXIoKSB7XHJcbiAgICB0aGlzLmZyb21EYXRlID0gJyc7XHJcbiAgICB0aGlzLnRvRGF0ZSA9ICcnO1xyXG4gICAgLy8gJHNjb3BlLm1haW5PYmogPSBhbmd1bGFyLmV4dGVuZCh7fSwgY29uZmlnLCBpcE9iaik7XHJcbiAgICBpZiAodGhpcy5tYWluT2JqLmZyb20pIHtcclxuICAgICAgdGhpcy5mcm9tRGF0ZSA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKHRoaXMubWFpbk9iai5mcm9tKSkuZ2V0VGltZSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubWFpbk9iai50bykge1xyXG4gICAgICB0aGlzLnRvRGF0ZSA9IHRoaXMucmVzZXRITVNNKG5ldyBEYXRlKHRoaXMubWFpbk9iai50bykpLmdldFRpbWUoKTtcclxuICAgIH1cclxuICAgIC8vIGlmIChpcE9iai5kaXNhYmxlV2Vla2RheXMgJiYgdGhpcy5jb25maWcuZGlzYWJsZVdlZWtkYXlzKSB7XHJcbiAgICAvLyAgIHRoaXMubWFpbk9iai5kaXNhYmxlV2Vla0RheXMgPSBpcE9iai5kaXNhYmxlV2Vla2RheXMuY29uY2F0KHRoaXMuY29uZmlnLmRpc2FibGVXZWVrZGF5cyk7XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLnNldEluaXRpYWxPYmoodGhpcy5tYWluT2JqKTtcclxuICB9XHJcblxyXG4gIC8vIEluaXQgRGF0ZVBpY2tlciBPYmplY3RcclxuICBpbml0RGF0ZVBpY2tlck9iaihjb25maWcpIHtcclxuICAgIC8vIGNvbnN0IGNvbmZpZyA9IHRoaXMubWFpbk9iajtcclxuXHJcbiAgICBpZiAoY29uZmlnLmlucHV0RGF0ZSAmJiAhdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSkge1xyXG4gICAgICB0aGlzLmlzU2VsZWN0ZWREYXRlRm91bmQgPSB0cnVlO1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID0gY29uZmlnLmlucHV0RGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvYmpDb25maWc6IGFueSA9IHt9O1xyXG4gICAgb2JqQ29uZmlnLmZyb20gPSBjb25maWcuZnJvbURhdGUgPyBjb25maWcuZnJvbURhdGUgOiAnJztcclxuICAgIG9iakNvbmZpZy50byA9IGNvbmZpZy50b0RhdGUgPyBjb25maWcudG9EYXRlIDogJyc7XHJcbiAgICBvYmpDb25maWcuc2hvd1RvZGF5QnV0dG9uID0gY29uZmlnLnNob3dUb2RheUJ1dHRvbiA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGNvbmZpZy5zaG93VG9kYXlCdXR0b247XHJcbiAgICBvYmpDb25maWcuY2xvc2VPblNlbGVjdCA9IGNvbmZpZy5jbG9zZU9uU2VsZWN0ID8gY29uZmlnLmNsb3NlT25TZWxlY3QgOiBmYWxzZTtcclxuICAgIG9iakNvbmZpZy5kaXNhYmxlV2Vla0RheXMgPSBjb25maWcuZGlzYWJsZVdlZWtEYXlzID8gY29uZmlnLmRpc2FibGVXZWVrRGF5cyA6IFtdO1xyXG4gICAgb2JqQ29uZmlnLm1vbmRheUZpcnN0ID0gY29uZmlnLm1vbmRheUZpcnN0ID8gY29uZmlnLm1vbmRheUZpcnN0IDogZmFsc2U7XHJcbiAgICBvYmpDb25maWcuc2V0TGFiZWwgPSBjb25maWcuc2V0TGFiZWwgPyBjb25maWcuc2V0TGFiZWwgOiAnU2V0JztcclxuICAgIG9iakNvbmZpZy50b2RheUxhYmVsID0gY29uZmlnLnRvZGF5TGFiZWwgPyBjb25maWcudG9kYXlMYWJlbCA6ICdUb2RheSc7XHJcbiAgICBvYmpDb25maWcuY2xvc2VMYWJlbCA9IGNvbmZpZy5jbG9zZUxhYmVsID8gY29uZmlnLmNsb3NlTGFiZWwgOiAnQ2xvc2UnO1xyXG4gICAgb2JqQ29uZmlnLmRpc2FibGVkRGF0ZXMgPSBjb25maWcuZGlzYWJsZWREYXRlcyA/IGNvbmZpZy5kaXNhYmxlZERhdGVzIDogW107XHJcbiAgICBvYmpDb25maWcudGl0bGVMYWJlbCA9IGNvbmZpZy50aXRsZUxhYmVsID8gY29uZmlnLnRpdGxlTGFiZWwgOiBudWxsO1xyXG5cclxuICAgIG9iakNvbmZpZy5tb250aHNMaXN0ID0gY29uZmlnLm1vbnRoc0xpc3QgPyBjb25maWcubW9udGhzTGlzdCA6IHRoaXMubW9udGhzTGlzdDtcclxuICAgIG9iakNvbmZpZy5tb250aHNMaXN0ID0gWy4uLm9iakNvbmZpZy5tb250aHNMaXN0XTtcclxuXHJcbiAgICBvYmpDb25maWcud2Vla3NMaXN0ID0gY29uZmlnLndlZWtzTGlzdCA/IGNvbmZpZy53ZWVrc0xpc3QgOiB0aGlzLndlZWtzTGlzdDtcclxuICAgIG9iakNvbmZpZy53ZWVrc0xpc3QgPSBbLi4ub2JqQ29uZmlnLndlZWtzTGlzdF07XHJcblxyXG4gICAgb2JqQ29uZmlnLmRhdGVGb3JtYXQgPSBjb25maWcuZGF0ZUZvcm1hdCA/IGNvbmZpZy5kYXRlRm9ybWF0IDogJ0REIE1NTSBZWVlZJztcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUsIG9iakNvbmZpZy5kYXRlRm9ybWF0LCBtb21lbnQubG9jYWxlKCkpO1xyXG5cclxuICAgIG9iakNvbmZpZy5jbGVhckJ1dHRvbiA9IGNvbmZpZy5jbGVhckJ1dHRvbiA/IGNvbmZpZy5jbGVhckJ1dHRvbiA6IGZhbHNlO1xyXG5cclxuICAgIG9iakNvbmZpZy55ZWFySW5Bc2NlbmRpbmcgPSBjb25maWcueWVhckluQXNjZW5kaW5nID8gY29uZmlnLnllYXJJbkFzY2VuZGluZyA6IGZhbHNlO1xyXG4gICAgb2JqQ29uZmlnLm1vbWVudExvY2FsZSA9IGNvbmZpZy5tb21lbnRMb2NhbGUgPyBjb25maWcubW9tZW50TG9jYWxlIDogJ2VuLVVTJztcclxuXHJcbiAgICBtb21lbnQubG9jYWxlKG9iakNvbmZpZy5tb21lbnRMb2NhbGUpO1xyXG4gICAgb2JqQ29uZmlnLmlucHV0RGF0ZSA9IHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgPyBtb21lbnQodGhpcy5zZWxlY3RlZERhdGUuZGF0ZSwgb2JqQ29uZmlnLmRhdGVGb3JtYXQpLnRvRGF0ZSgpIDogbmV3IERhdGUoKTtcclxuXHJcbiAgICBvYmpDb25maWcuYnRuQ2xvc2VTZXRJblJldmVyc2UgPSBjb25maWcuYnRuQ2xvc2VTZXRJblJldmVyc2UgPyBjb25maWcuYnRuQ2xvc2VTZXRJblJldmVyc2UgOiBmYWxzZTtcclxuXHJcbiAgICBvYmpDb25maWcuYnRuUHJvcGVydGllcyA9IHt9O1xyXG4gICAgaWYgKGNvbmZpZy5idG5Qcm9wZXJ0aWVzKSB7XHJcbiAgICAgIGNvbnN0IGJ0blByb3BlcnRpZXMgPSBjb25maWcuYnRuUHJvcGVydGllcztcclxuICAgICAgb2JqQ29uZmlnLmJ0blByb3BlcnRpZXMuZXhwYW5kID0gYnRuUHJvcGVydGllcy5leHBhbmQgPyBidG5Qcm9wZXJ0aWVzLmV4cGFuZCA6ICdibG9jayc7XHJcbiAgICAgIG9iakNvbmZpZy5idG5Qcm9wZXJ0aWVzLmZpbGwgPSBidG5Qcm9wZXJ0aWVzLmZpbGwgPyBidG5Qcm9wZXJ0aWVzLmZpbGwgOiAnc29saWQnO1xyXG4gICAgICBvYmpDb25maWcuYnRuUHJvcGVydGllcy5zaXplID0gYnRuUHJvcGVydGllcy5zaXplID8gYnRuUHJvcGVydGllcy5zaXplIDogJ2RlZmF1bHQnO1xyXG4gICAgICBvYmpDb25maWcuYnRuUHJvcGVydGllcy5jb2xvciA9IGJ0blByb3BlcnRpZXMuY29sb3IgPyBidG5Qcm9wZXJ0aWVzLmNvbG9yIDogJyc7XHJcbiAgICAgIG9iakNvbmZpZy5idG5Qcm9wZXJ0aWVzLmRpc2FibGVkID0gYnRuUHJvcGVydGllcy5kaXNhYmxlZCA/IGJ0blByb3BlcnRpZXMuZGlzYWJsZWQgOiBmYWxzZTtcclxuICAgICAgb2JqQ29uZmlnLmJ0blByb3BlcnRpZXMuc3Ryb25nID0gYnRuUHJvcGVydGllcy5zdHJvbmcgPyBidG5Qcm9wZXJ0aWVzLnN0cm9uZyA6IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgb2JqQ29uZmlnLmJ0blByb3BlcnRpZXMuZXhwYW5kID0gJ2Jsb2NrJztcclxuICAgICAgb2JqQ29uZmlnLmJ0blByb3BlcnRpZXMuZmlsbCA9ICdzb2xpZCc7XHJcbiAgICAgIG9iakNvbmZpZy5idG5Qcm9wZXJ0aWVzLnNpemUgPSAnZGVmYXVsdCc7XHJcbiAgICAgIG9iakNvbmZpZy5idG5Qcm9wZXJ0aWVzLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgIG9iakNvbmZpZy5idG5Qcm9wZXJ0aWVzLnN0cm9uZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIG9iakNvbmZpZy5hcnJvd05leHRQcmV2ID0ge307XHJcbiAgICBpZiAoY29uZmlnLmFycm93TmV4dFByZXYpIHtcclxuICAgICAgY29uc3QgYXJyb3dOZXh0UHJldiA9IGNvbmZpZy5hcnJvd05leHRQcmV2O1xyXG4gICAgICBvYmpDb25maWcuYXJyb3dOZXh0UHJldi5uZXh0QXJyb3dTcmMgPSBhcnJvd05leHRQcmV2Lm5leHRBcnJvd1NyYyA/IGFycm93TmV4dFByZXYubmV4dEFycm93U3JjIDogZmFsc2U7XHJcbiAgICAgIG9iakNvbmZpZy5hcnJvd05leHRQcmV2LnByZXZBcnJvd1NyYyA9IGFycm93TmV4dFByZXYucHJldkFycm93U3JjID8gYXJyb3dOZXh0UHJldi5wcmV2QXJyb3dTcmMgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBvYmpDb25maWcuaGlnaGxpZ2h0ZWREYXRlcyA9IFtdO1xyXG4gICAgaWYgKGNvbmZpZy5oaWdobGlnaHRlZERhdGVzICYmIGNvbmZpZy5oaWdobGlnaHRlZERhdGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgb2JqQ29uZmlnLmhpZ2hsaWdodGVkRGF0ZXMgPSBjb25maWcuaGlnaGxpZ2h0ZWREYXRlcztcclxuXHJcbiAgICAgIHRoaXMuc2V0SGlnaHRsaWdodGVkRGF0ZXMob2JqQ29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBvYmpDb25maWcuaXNTdW5kYXlIaWdobGlnaHRlZCA9IHt9O1xyXG4gICAgaWYgKGNvbmZpZy5pc1N1bmRheUhpZ2hsaWdodGVkKSB7XHJcbiAgICAgIGNvbnN0IGlzU3VuZGF5SGlnaGxpZ2h0ZWQgPSBjb25maWcuaXNTdW5kYXlIaWdobGlnaHRlZDtcclxuICAgICAgb2JqQ29uZmlnLmlzU3VuZGF5SGlnaGxpZ2h0ZWQuZm9udENvbG9yID0gaXNTdW5kYXlIaWdobGlnaHRlZC5mb250Q29sb3IgPyBpc1N1bmRheUhpZ2hsaWdodGVkLmZvbnRDb2xvciA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbmZpZyA9PicsIG9iakNvbmZpZyk7XHJcbiAgICByZXR1cm4gb2JqQ29uZmlnO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9ybWF0IGRhdGVcclxuICBmb3JtYXREYXRlKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ2Zvcm1hdERhdGU6ICcsIHRoaXMuc2VsY3RlZERhdGVFcG9jaCwgbmV3IERhdGUodGhpcy5zZWxjdGVkRGF0ZUVwb2NoKSk7XHJcbiAgICByZXR1cm4gbW9tZW50KHRoaXMuc2VsY3RlZERhdGVFcG9jaCkuZm9ybWF0KHRoaXMubWFpbk9iai5kYXRlRm9ybWF0KTtcclxuICB9XHJcbn1cclxuXHJcbiJdfQ==