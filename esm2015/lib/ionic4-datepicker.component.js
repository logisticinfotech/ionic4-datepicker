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
const noop = () => {
};
const ɵ0 = noop;
/** @type {?} */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Ionic4DatepickerComponent),
    multi: true
};
export class Ionic4DatepickerComponent {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7O01BRXZHLElBQUksR0FBRyxHQUFHLEVBQUU7QUFDbEIsQ0FBQzs7O0FBRUQsTUFBTSxPQUFPLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBU0QsTUFBTSxPQUFPLHlCQUF5Qjs7OztJQWtCcEMsWUFDVSxTQUEwQjtRQUExQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQVZwQyxpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUVmLGVBQVUsR0FBUSxFQUFFLENBQUM7OztRQUlyQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQUk5QyxDQUFDOzs7O0lBRUwsUUFBUTtJQUNSLENBQUM7Ozs7O0lBRUssY0FBYyxDQUFDLEtBQUs7O1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJ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Ozs7SUFJN0Isc0RBQTZDOzs7OztJQUM3QyxxREFBa0Q7Ozs7O0lBR2hELDhDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xuaW1wb3J0IHsgSW9uaWM0RGF0ZXBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnQnO1xuXG5jb25zdCBub29wID0gKCkgPT4ge1xufTtcblxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJb25pYzREYXRlcGlja2VyQ29tcG9uZW50KSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2lvbmljNC1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2lvbmljNC1kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbQ1VTVE9NX0lOUFVUX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdXG59KVxuXG5leHBvcnQgY2xhc3MgSW9uaWM0RGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gIEBJbnB1dCgpIGlucHV0RGF0ZTogYW55O1xuXG4gIGRhdGU7XG4gIG1vbnRoO1xuICB5ZWFyO1xuICBmaW5hbGRhdGU7XG5cbiAgc2VsZWN0ZWREYXRlOiBhbnkgPSB7fTtcblxuICBwcml2YXRlIGlubmVyVmFsdWU6IGFueSA9ICcnO1xuXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWRcbiAgLy8gYnkgdGhlIENvbnRyb2wgVmFsdWUgQWNjZXNzb3JcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlclxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgYXN5bmMgb3BlbkRhdGVQaWNrZXIodmFsdWUpIHtcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID0gdmFsdWU7XG4gICAgaWYgKHRoaXMuaW5wdXREYXRlLmZyb20pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmZyb20gPSB0aGlzLmlucHV0RGF0ZS5mcm9tO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dERhdGUudG8pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLnRvID0gdGhpcy5pbnB1dERhdGUudG87XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKCdzZWxlY3RlZERhdGUnLCB0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25zdFxuICAgIGxldCBvYmpDb25maWc6IGFueSA9IHt9O1xuICAgIG9iakNvbmZpZy5tb250aHNMaXN0ID0gWydKYW4nLCAnRmViJywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbiAgICBvYmpDb25maWcuY2xvc2VPblNlbGVjdCA9IGZhbHNlO1xuICAgIG9iakNvbmZpZy50ZW1wbGF0ZVR5cGUgPSAncG9wdXAnO1xuICAgIG9iakNvbmZpZy5mcm9tID0gdGhpcy5zZWxlY3RlZERhdGUuZnJvbSA/IHRoaXMuc2VsZWN0ZWREYXRlLmZyb20gOiAnJztcbiAgICBvYmpDb25maWcudG8gPSB0aGlzLnNlbGVjdGVkRGF0ZS50byA/IHRoaXMuc2VsZWN0ZWREYXRlLnRvIDogJyc7XG4gICAgb2JqQ29uZmlnLmRpc2FibGVXZWVrRGF5cyA9IFtdO1xuICAgIG9iakNvbmZpZy5tb25kYXlGaXJzdCA9IDE7XG4gICAgb2JqQ29uZmlnLndlZWtzTGlzdCA9IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddO1xuICAgIG9iakNvbmZpZy5zaG93VG9kYXlCdXR0b24gPSB0cnVlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnRyaXBsZS1lcXVhbHNcbiAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID8gb2JqQ29uZmlnLmlucHV0RGF0ZSA9IG5ldyBEYXRlKHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUpIDogb2JqQ29uZmlnLmlucHV0RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnID0+Jywgb2JqQ29uZmlnKTtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgbGV0IGRhdGVQaWNrZXJNb2RhbCA9IGF3YWl0IHRoaXMubW9kYWxDdHJsLmNyZWF0ZSh7XG4gICAgICBjb21wb25lbnQ6IElvbmljNERhdGVwaWNrZXJNb2RhbENvbXBvbmVudCxcbiAgICAgIGNzc0NsYXNzOiAnaW9uaWM0LWRhdGVQaWNrZXInLFxuICAgICAgY29tcG9uZW50UHJvcHM6IHsgJ21haW5PYmonOiBvYmpDb25maWcgfVxuICAgIH0pO1xuICAgIGF3YWl0IGRhdGVQaWNrZXJNb2RhbC5wcmVzZW50KCk7XG5cbiAgICBkYXRlUGlja2VyTW9kYWwub25EaWREaXNtaXNzKClcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5kYXRlKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSA9IGRhdGEuZGF0YS5kYXRlO1xuICAgICAgICAgIGxldCBkZDogYW55ID0gbmV3IERhdGUoZGF0YS5kYXRhLmRhdGUpLmdldERhdGUoKTtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbnN0XG4gICAgICAgICAgbGV0IHl5eXkgPSBuZXcgRGF0ZShkYXRhLmRhdGEuZGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICBsZXQgbW06IGFueSA9IG5ldyBEYXRlKGRhdGEuZGF0YS5kYXRlKS5nZXRNb250aCgpICsgMTsgLy8gSmFudWFyeSBpcyAwIVxuICAgICAgICAgIGlmIChkZCA8IDEwKSB7XG4gICAgICAgICAgICBkZCA9ICcwJyArIGRkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobW0gPCAxMCkge1xuICAgICAgICAgICAgbW0gPSAnMCcgKyBtbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52YWx1ZSA9IHl5eXkgKyAnLScgKyBtbSArICctJyArIGRkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG5cbiAgLy8gZ2V0IGFjY2Vzc29yXG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XG4gIH1cblxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcbiAgICBpZiAodiAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgb25CbHVyKCkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cbn1cbiJdfQ==