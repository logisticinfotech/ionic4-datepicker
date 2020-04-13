/**
 * @fileoverview added by tsickle
 * Generated from: lib/ionic4-datepicker.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, forwardRef, Input, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
/** @type {?} */
const noop = (/**
 * @return {?}
 */
() => {
});
const ɵ0 = noop;
/** @type {?} */
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => Ionic4DatepickerComponent)),
    multi: true
};
export class Ionic4DatepickerComponent {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
if (false) {
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.inputDateConfig;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.closeIcon;
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
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.el;
    /** @type {?} */
    Ionic4DatepickerComponent.prototype.renderer2;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxvZ2lzdGljaW5mb3RlY2gvaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBaUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPOztNQUVoQixJQUFJOzs7QUFBRyxHQUFHLEVBQUU7QUFDbEIsQ0FBQyxDQUFBOzs7QUFFRCxNQUFNLE9BQU8sbUNBQW1DLEdBQVE7SUFDdEQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMseUJBQXlCLEVBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWjtBQU9ELE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQWFwQyxZQUNVLFNBQTBCLEVBQzNCLEVBQWMsRUFDZCxTQUFvQjtRQUZuQixjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUMzQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVg3QixpQkFBWSxHQUFRLEVBQUUsQ0FBQztRQUNmLGVBQVUsR0FBUSxFQUFFLENBQUM7OztRQUlyQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMscUJBQWdCLEdBQXFCLElBQUksQ0FBQztJQU05QyxD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Z0JBQ2hDLDJLQUFpRDtnQkFFakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7O2FBQ2pEOzs7O1lBbkJRLGVBQWU7WUFGdUIsVUFBVTtZQUFFLFNBQVM7Ozs4QkF3QmpFLEtBQUs7Ozs7SUFBTixvREFBOEI7O0lBRTlCLDhDQUFVOztJQUNWLGlEQUF1Qjs7Ozs7SUFDdkIsK0NBQTZCOzs7OztJQUk3QixzREFBNkM7Ozs7O0lBQzdDLHFEQUFrRDs7Ozs7SUFHaEQsOENBQWtDOztJQUNsQyx1Q0FBcUI7O0lBQ3JCLDhDQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBmb3J3YXJkUmVmLCBJbnB1dCwgRWxlbWVudFJlZiwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdNb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJb25pYzREYXRlcGlja2VyTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5jb25zdCBub29wID0gKCkgPT4ge1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gSW9uaWM0RGF0ZXBpY2tlckNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaS1pb25pYzQtZGF0ZXBpY2tlcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2lvbmljNC1kYXRlcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pb25pYzQtZGF0ZXBpY2tlci5jb21wb25lbnQuc2NzcyddLFxyXG4gIHByb3ZpZGVyczogW0NVU1RPTV9JTlBVVF9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSW9uaWM0RGF0ZXBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xyXG5cclxuICBASW5wdXQoKSBpbnB1dERhdGVDb25maWc6IGFueTtcclxuXHJcbiAgY2xvc2VJY29uO1xyXG4gIHNlbGVjdGVkRGF0ZTogYW55ID0ge307XHJcbiAgcHJpdmF0ZSBpbm5lclZhbHVlOiBhbnkgPSAnJztcclxuXHJcbiAgLy8gUGxhY2Vob2xkZXJzIGZvciB0aGUgY2FsbGJhY2tzIHdoaWNoIGFyZSBsYXRlciBwcm92aWRlZFxyXG4gIC8vIGJ5IHRoZSBDb250cm9sIFZhbHVlIEFjY2Vzc29yXHJcbiAgcHJpdmF0ZSBvblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9IG5vb3A7XHJcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIG1vZGFsQ3RybDogTW9kYWxDb250cm9sbGVyLFxyXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHVibGljIHJlbmRlcmVyMjogUmVuZGVyZXIyXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gICAgaWYgKHRoaXMuaW5wdXREYXRlQ29uZmlnLmNsZWFyQnV0dG9uICE9PSBmYWxzZSkge1xyXG5cclxuICAgICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpb24taWNvbicpO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5uYW1lID0gJ2Nsb3NlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTmFtZSA9ICdjbGVhckJ1dHRvbic7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUucmlnaHQgPSAnOHB4JztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuYm90dG9tID0gJzBweCc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS5jb2xvciA9ICcjQTlBOUE5JztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuekluZGV4ID0gJzUnO1xyXG5cclxuICAgICAgaWYgKHRoaXMuZWwubmF0aXZlRWxlbWVudC5wYXJlbnROb2RlLm5vZGVOYW1lID09PSAnSU9OLUlURU0nKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuYm90dG9tID0gJzMwJSc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAncG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogMTAwJTsnKTtcclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2xvc2VJY29uKTtcclxuXHJcbiAgICAgIHRoaXMucmVuZGVyZXIyLmxpc3Rlbih0aGlzLmNsb3NlSWNvbiwgJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgLy8gRG8gc29tZXRoaW5nIHdpdGggJ2V2ZW50J1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdidXR0b24gY2xpY2tzJyk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAnJztcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZVZhbHVlKHZhbHVlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25DaGFuZ2VWYWx1ZSA9PicgLCB2YWx1ZSk7XHJcbiAgICBpZiAodGhpcy5pbnB1dERhdGVDb25maWcuY2xlYXJCdXR0b24gIT09IGZhbHNlKSB7XHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgb3BlbkRhdGVQaWNrZXIodmFsdWUpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvcGVuRGF0ZVBpY2tlcicpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRlUGlja2VyTW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ3RybC5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IElvbmljNERhdGVwaWNrZXJNb2RhbENvbXBvbmVudCxcclxuICAgICAgY3NzQ2xhc3M6ICdsaS1pb25pYzQtZGF0ZVBpY2tlcicsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7ICdvYmpDb25maWcnOiB0aGlzLmlucHV0RGF0ZUNvbmZpZywgJ3NlbGVjdGVkRGF0ZSc6IHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgIH1cclxuICAgIH0pO1xyXG4gICAgYXdhaXQgZGF0ZVBpY2tlck1vZGFsLnByZXNlbnQoKTtcclxuXHJcbiAgICBkYXRlUGlja2VyTW9kYWwub25EaWREaXNtaXNzKClcclxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5kYXRlICYmIGRhdGEuZGF0YS5kYXRlICE9PSAnSW52YWxpZCBkYXRlJykge1xyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSA9IGRhdGEuZGF0YS5kYXRlO1xyXG4gICAgICAgICAgdGhpcy52YWx1ZSA9IGRhdGEuZGF0YS5kYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBnZXQgYWNjZXNzb3JcclxuICBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLmlubmVyVmFsdWU7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgYWNjZXNzb3IgaW5jbHVkaW5nIGNhbGwgdGhlIG9uY2hhbmdlIGNhbGxiYWNrXHJcbiAgc2V0IHZhbHVlKHY6IGFueSkge1xyXG4gICAgaWYgKHYgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xyXG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2O1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodik7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uQ2hhbmdlVmFsdWUodik7XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXHJcbiAgb25CbHVyKCkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xyXG4gIH1cclxuXHJcbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5pbm5lclZhbHVlKSB7XHJcbiAgICAgIHRoaXMuaW5uZXJWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZVZhbHVlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcblxyXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xyXG4gIH1cclxufVxyXG4iXX0=