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
var moment = moment_;
/** @type {?} */
var noop = (/**
 * @return {?}
 */
function () {
});
var ɵ0 = noop;
/** @type {?} */
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef((/**
     * @return {?}
     */
    function () { return Ionic4DatepickerComponent; })),
    multi: true
};
var Ionic4DatepickerComponent = /** @class */ (function () {
    function Ionic4DatepickerComponent(modalCtrl, el, renderer2) {
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
    Ionic4DatepickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
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
            function (event) {
                // Do something with 'event'
                // console.log('button clicks');
                _this.selectedDate = new Date();
                _this.value = '';
            }));
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    Ionic4DatepickerComponent.prototype.onChangeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // console.log('onChangeValue =>' , value);
        if (this.inputDateConfig.clearButton !== false) {
            if (!value) {
                this.closeIcon.style.visibility = 'hidden';
            }
            else {
                this.closeIcon.style.visibility = 'visible';
            }
        }
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
            var datePickerModal;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log('openDatePicker');
                        if (value) {
                            this.selectedDate.date = value;
                        }
                        return [4 /*yield*/, this.modalCtrl.create({
                                component: Ionic4DatepickerModalComponent,
                                cssClass: 'li-ionic4-datePicker',
                                componentProps: { 'objConfig': this.inputDateConfig, 'selectedDate': this.selectedDate.date }
                            })];
                    case 1:
                        datePickerModal = _a.sent();
                        return [4 /*yield*/, datePickerModal.present()];
                    case 2:
                        _a.sent();
                        datePickerModal.onDidDismiss()
                            .then((/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) {
                            // console.log(data);
                            if (data.data && data.data.date && data.data.date !== 'Invalid date') {
                                _this.selectedDate.date = data.data.date;
                                _this.value = data.data.date;
                            }
                        }));
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
            this.onChangeValue(v);
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
        this.onChangeValue(value);
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
                    selector: 'li-ionic4-datepicker',
                    template: "<input type=\"text\" class=\"li-dp-input\" (focus)=\"$event.preventDefault()\" (click)=\"openDatePicker(value)\" readonly\r\n    [(ngModel)]=\"value\" start />",
                    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
                    styles: [":host input{font-size:16px;margin:6px 0;border:0;border-bottom:1px solid #ccc;width:100%;padding:12px}@media (min-width:768px){:host input{font-size:18px}}:host input.has-focus,:host input:focus{outline:0;box-shadow:unset}"]
                }] }
    ];
    /** @nocollapse */
    Ionic4DatepickerComponent.ctorParameters = function () { return [
        { type: ModalController },
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    Ionic4DatepickerComponent.propDecorators = {
        inputDateConfig: [{ type: Input }]
    };
    return Ionic4DatepickerComponent;
}());
export { Ionic4DatepickerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxvZ2lzdGljaW5mb3RlY2gvaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsVUFBVSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBaUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sNkRBQTZELENBQUM7QUFDN0csT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPOztJQUVoQixJQUFJOzs7QUFBRztBQUNiLENBQUMsQ0FBQTs7O0FBRUQsTUFBTSxLQUFPLG1DQUFtQyxHQUFRO0lBQ3RELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVU7OztJQUFDLGNBQU0sT0FBQSx5QkFBeUIsRUFBekIsQ0FBeUIsRUFBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaO0FBQ0Q7SUFtQkUsbUNBQ1UsU0FBMEIsRUFDM0IsRUFBYyxFQUNkLFNBQW9CO1FBRm5CLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQzNCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBWDdCLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ2YsZUFBVSxHQUFRLEVBQUUsQ0FBQzs7O1FBSXJCLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDO0lBTTlDLENBQUM7Ozs7SUFFTCw0Q0FBUTs7O0lBQVI7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QixHQUFHLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQXNDOzs7Ozs7SUFDdEMscURBQWlCOzs7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7O2dCQTNIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsMktBQWlEO29CQUVqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQzs7aUJBQ2pEOzs7O2dCQW5CUSxlQUFlO2dCQUZ1QixVQUFVO2dCQUFFLFNBQVM7OztrQ0F3QmpFLEtBQUs7O0lBb0hSLGdDQUFDO0NBQUEsQUE1SEQsSUE0SEM7U0F0SFkseUJBQXlCOzs7SUFFcEMsb0RBQThCOztJQUU5Qiw4Q0FBVTs7SUFDVixpREFBdUI7Ozs7O0lBQ3ZCLCtDQUE2Qjs7Ozs7SUFJN0Isc0RBQTZDOzs7OztJQUM3QyxxREFBa0Q7Ozs7O0lBR2hELDhDQUFrQzs7SUFDbEMsdUNBQXFCOztJQUNyQiw4Q0FBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgZm9yd2FyZFJlZiwgSW5wdXQsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nTW9kZWwgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE1vZGFsQ29udHJvbGxlciB9IGZyb20gJ0Bpb25pYy9hbmd1bGFyJztcclxuaW1wb3J0IHsgSW9uaWM0RGF0ZXBpY2tlck1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC9pb25pYzQtZGF0ZXBpY2tlci1tb2RhbC5jb21wb25lbnQnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuY29uc3Qgbm9vcCA9ICgpID0+IHtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xyXG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IElvbmljNERhdGVwaWNrZXJDb21wb25lbnQpLFxyXG4gIG11bHRpOiB0cnVlXHJcbn07XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGktaW9uaWM0LWRhdGVwaWNrZXInLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pb25pYzQtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaW9uaWM0LWRhdGVwaWNrZXIuY29tcG9uZW50LnNjc3MnXSxcclxuICBwcm92aWRlcnM6IFtDVVNUT01fSU5QVVRfQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIElvbmljNERhdGVwaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcclxuXHJcbiAgQElucHV0KCkgaW5wdXREYXRlQ29uZmlnOiBhbnk7XHJcblxyXG4gIGNsb3NlSWNvbjtcclxuICBzZWxlY3RlZERhdGU6IGFueSA9IHt9O1xyXG4gIHByaXZhdGUgaW5uZXJWYWx1ZTogYW55ID0gJyc7XHJcblxyXG4gIC8vIFBsYWNlaG9sZGVycyBmb3IgdGhlIGNhbGxiYWNrcyB3aGljaCBhcmUgbGF0ZXIgcHJvdmlkZWRcclxuICAvLyBieSB0aGUgQ29udHJvbCBWYWx1ZSBBY2Nlc3NvclxyXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xyXG4gIHByaXZhdGUgb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IG5vb3A7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RhbEN0cmw6IE1vZGFsQ29udHJvbGxlcixcclxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcclxuICAgIHB1YmxpYyByZW5kZXJlcjI6IFJlbmRlcmVyMlxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICAgIGlmICh0aGlzLmlucHV0RGF0ZUNvbmZpZy5jbGVhckJ1dHRvbiAhPT0gZmFsc2UpIHtcclxuXHJcbiAgICAgIHRoaXMuY2xvc2VJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW9uLWljb24nKTtcclxuICAgICAgdGhpcy5jbG9zZUljb24ubmFtZSA9ICdjbG9zZS1jaXJjbGUnO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5jbGFzc05hbWUgPSAnY2xlYXJCdXR0b24nO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnJpZ2h0ID0gJzhweCc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLmJvdHRvbSA9ICcwcHgnO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS5mb250U2l6ZSA9ICcxOHB4JztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuY29sb3IgPSAnI0E5QTlBOSc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnpJbmRleCA9ICc1JztcclxuXHJcbiAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gJ0lPTi1JVEVNJykge1xyXG4gICAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLmJvdHRvbSA9ICczMCUnO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3Bvc2l0aW9uOiByZWxhdGl2ZTsgd2lkdGg6IDEwMCU7Jyk7XHJcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNsb3NlSWNvbik7XHJcblxyXG4gICAgICB0aGlzLnJlbmRlcmVyMi5saXN0ZW4odGhpcy5jbG9zZUljb24sICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoICdldmVudCdcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYnV0dG9uIGNsaWNrcycpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2VWYWx1ZSh2YWx1ZSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coJ29uQ2hhbmdlVmFsdWUgPT4nICwgdmFsdWUpO1xyXG4gICAgaWYgKHRoaXMuaW5wdXREYXRlQ29uZmlnLmNsZWFyQnV0dG9uICE9PSBmYWxzZSkge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIG9wZW5EYXRlUGlja2VyKHZhbHVlKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb3BlbkRhdGVQaWNrZXInKTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGF0ZVBpY2tlck1vZGFsID0gYXdhaXQgdGhpcy5tb2RhbEN0cmwuY3JlYXRlKHtcclxuICAgICAgY29tcG9uZW50OiBJb25pYzREYXRlcGlja2VyTW9kYWxDb21wb25lbnQsXHJcbiAgICAgIGNzc0NsYXNzOiAnbGktaW9uaWM0LWRhdGVQaWNrZXInLFxyXG4gICAgICBjb21wb25lbnRQcm9wczogeyAnb2JqQ29uZmlnJzogdGhpcy5pbnB1dERhdGVDb25maWcsICdzZWxlY3RlZERhdGUnOiB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlICB9XHJcbiAgICB9KTtcclxuICAgIGF3YWl0IGRhdGVQaWNrZXJNb2RhbC5wcmVzZW50KCk7XHJcblxyXG4gICAgZGF0ZVBpY2tlck1vZGFsLm9uRGlkRGlzbWlzcygpXHJcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgaWYgKGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuZGF0ZSAmJiBkYXRhLmRhdGEuZGF0ZSAhPT0gJ0ludmFsaWQgZGF0ZScpIHtcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgPSBkYXRhLmRhdGEuZGF0ZTtcclxuICAgICAgICAgIHRoaXMudmFsdWUgPSBkYXRhLmRhdGEuZGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gZ2V0IGFjY2Vzc29yXHJcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbm5lclZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLy8gc2V0IGFjY2Vzc29yIGluY2x1ZGluZyBjYWxsIHRoZSBvbmNoYW5nZSBjYWxsYmFja1xyXG4gIHNldCB2YWx1ZSh2OiBhbnkpIHtcclxuICAgIGlmICh2ICE9PSB0aGlzLmlubmVyVmFsdWUpIHtcclxuICAgICAgdGhpcy5pbm5lclZhbHVlID0gdjtcclxuICAgICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHYpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vbkNoYW5nZVZhbHVlKHYpO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IHRvdWNoZWQgb24gYmx1clxyXG4gIG9uQmx1cigpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcclxuICB9XHJcblxyXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuaW5uZXJWYWx1ZSkge1xyXG4gICAgICB0aGlzLmlubmVyVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMub25DaGFuZ2VWYWx1ZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrID0gZm47XHJcbiAgfVxyXG5cclxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcclxuICB9XHJcbn1cclxuIl19