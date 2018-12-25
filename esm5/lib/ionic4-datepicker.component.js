/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
/** @type {?} */
var noop = function () {
};
var ɵ0 = noop;
/** @type {?} */
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var objConfig, datePickerModal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
export { Ionic4DatepickerComponent };
if (false) {
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.inputDate;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.date;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.month;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.year;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.finaldate;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.selectedDate;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerComponent.prototype.innerValue;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerComponent.prototype.onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerComponent.prototype.onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    Ionic4DatepickerComponent.prototype.modalCtrl;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7O0lBRXZHLElBQUksR0FBRztBQUNiLENBQUM7OztBQUVELE1BQU0sS0FBTyxtQ0FBbUMsR0FBUTtJQUN0RCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLHlCQUF5QixFQUF6QixDQUF5QixDQUFDO0lBQ3hELEtBQUssRUFBRSxJQUFJO0NBQ1o7QUFFRDtJQXlCRSxtQ0FDVSxTQUEwQjtRQUExQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQVZwQyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUVmLGVBQVUsR0FBUSxFQUFFLENBQUM7OztRQUlyQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUk5QyxDQUFDOzs7O0lBRUwsNENBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7Ozs7SUFFSyxrREFBYzs7OztJQUFwQixVQUFxQixLQUFLOzs7Ozs7O3dCQUN4QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7d0JBQy9CLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7NEJBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLElB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QWlEO29CQUVqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQzs7aUJBQ2pEOzs7O2dCQWpCUSxlQUFlOzs7NEJBcUJyQixLQUFLOztJQStHUixnQ0FBQztDQUFBLEFBeEhELElBd0hDO1NBakhZLHlCQUF5Qjs7O0lBRXBDLDhDQUF3Qjs7SUFFeEIseUNBQUs7O0lBQ0wsMENBQU07O0lBQ04seUNBQUs7O0lBQ0wsOENBQVU7O0lBRVYsaURBQXVCOzs7OztJQUV2QiwrQ0FBNkI7Ozs7O0lBSTdCLHNEQUE2Qzs7Ozs7SUFDN0MscURBQWtEOzs7OztJQUdoRCw4Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcbmltcG9ydCB7IElvbmljNERhdGVwaWNrZXJNb2RhbENvbXBvbmVudCB9IGZyb20gJy4vaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwvaW9uaWM0LWRhdGVwaWNrZXItbW9kYWwuY29tcG9uZW50JztcblxuY29uc3Qgbm9vcCA9ICgpID0+IHtcbn07XG5cbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW9uaWM0RGF0ZXBpY2tlckNvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpb25pYzQtZGF0ZXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pb25pYzQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2lvbmljNC1kYXRlcGlja2VyLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxufSlcblxuZXhwb3J0IGNsYXNzIElvbmljNERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICBASW5wdXQoKSBpbnB1dERhdGU6IGFueTtcblxuICBkYXRlO1xuICBtb250aDtcbiAgeWVhcjtcbiAgZmluYWxkYXRlO1xuXG4gIHNlbGVjdGVkRGF0ZTogYW55ID0ge307XG5cbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcblxuICAvLyBQbGFjZWhvbGRlcnMgZm9yIHRoZSBjYWxsYmFja3Mgd2hpY2ggYXJlIGxhdGVyIHByb3ZpZGVkXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbW9kYWxDdHJsOiBNb2RhbENvbnRyb2xsZXJcbiAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGFzeW5jIG9wZW5EYXRlUGlja2VyKHZhbHVlKSB7XG4gICAgdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSA9IHZhbHVlO1xuICAgIGlmICh0aGlzLmlucHV0RGF0ZS5mcm9tKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5mcm9tID0gdGhpcy5pbnB1dERhdGUuZnJvbTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXREYXRlLnRvKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZS50byA9IHRoaXMuaW5wdXREYXRlLnRvO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZygnc2VsZWN0ZWREYXRlJywgdGhpcy5zZWxlY3RlZERhdGUpO1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uc3RcbiAgICBsZXQgb2JqQ29uZmlnOiBhbnkgPSB7fTtcbiAgICBvYmpDb25maWcubW9udGhzTGlzdCA9IFsnSmFuJywgJ0ZlYicsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1ZycsICdTZXB0JywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4gICAgb2JqQ29uZmlnLmNsb3NlT25TZWxlY3QgPSBmYWxzZTtcbiAgICBvYmpDb25maWcudGVtcGxhdGVUeXBlID0gJ3BvcHVwJztcbiAgICBvYmpDb25maWcuZnJvbSA9IHRoaXMuc2VsZWN0ZWREYXRlLmZyb20gPyB0aGlzLnNlbGVjdGVkRGF0ZS5mcm9tIDogJyc7XG4gICAgb2JqQ29uZmlnLnRvID0gdGhpcy5zZWxlY3RlZERhdGUudG8gPyB0aGlzLnNlbGVjdGVkRGF0ZS50byA6ICcnO1xuICAgIG9iakNvbmZpZy5kaXNhYmxlV2Vla0RheXMgPSBbXTtcbiAgICBvYmpDb25maWcubW9uZGF5Rmlyc3QgPSAxO1xuICAgIG9iakNvbmZpZy53ZWVrc0xpc3QgPSBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXTtcbiAgICBvYmpDb25maWcuc2hvd1RvZGF5QnV0dG9uID0gdHJ1ZTtcblxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp0cmlwbGUtZXF1YWxzXG4gICAgdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSA/IG9iakNvbmZpZy5pbnB1dERhdGUgPSBuZXcgRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlKSA6IG9iakNvbmZpZy5pbnB1dERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ2NvbmZpZyA9PicsIG9iakNvbmZpZyk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCBkYXRlUGlja2VyTW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ3RybC5jcmVhdGUoe1xuICAgICAgY29tcG9uZW50OiBJb25pYzREYXRlcGlja2VyTW9kYWxDb21wb25lbnQsXG4gICAgICBjc3NDbGFzczogJ2lvbmljNC1kYXRlUGlja2VyJyxcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7ICdtYWluT2JqJzogb2JqQ29uZmlnIH1cbiAgICB9KTtcbiAgICBhd2FpdCBkYXRlUGlja2VyTW9kYWwucHJlc2VudCgpO1xuXG4gICAgZGF0ZVBpY2tlck1vZGFsLm9uRGlkRGlzbWlzcygpXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZGF0ZSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgPSBkYXRhLmRhdGEuZGF0ZTtcbiAgICAgICAgICBsZXQgZGQ6IGFueSA9IG5ldyBEYXRlKGRhdGEuZGF0YS5kYXRlKS5nZXREYXRlKCk7XG4gICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgICAgICAgIGxldCB5eXl5ID0gbmV3IERhdGUoZGF0YS5kYXRhLmRhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgbGV0IG1tOiBhbnkgPSBuZXcgRGF0ZShkYXRhLmRhdGEuZGF0ZSkuZ2V0TW9udGgoKSArIDE7IC8vIEphbnVhcnkgaXMgMCFcbiAgICAgICAgICBpZiAoZGQgPCAxMCkge1xuICAgICAgICAgICAgZGQgPSAnMCcgKyBkZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1tIDwgMTApIHtcbiAgICAgICAgICAgIG1tID0gJzAnICsgbW07XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudmFsdWUgPSB5eXl5ICsgJy0nICsgbW0gKyAnLScgKyBkZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuXG4gIC8vIGdldCBhY2Nlc3NvclxuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xuICB9XG5cbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xuICBzZXQgdmFsdWUodjogYW55KSB7XG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcbiAgICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2KTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIG9uQmx1cigpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG59XG4iXX0=