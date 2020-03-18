/**
 * @fileoverview added by tsickle
 * Generated from: lib/li-ionic4-datepicker.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { NgModel, NgControl } from '@angular/forms';
import { Ionic4DatepickerService } from './ionic4-datepicker.service';
export class LiIonic4DatepickerDirective {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
if (false) {
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.inputDateConfig;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.closeIcon;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.selectedDate;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.isModalOpen;
    /**
     * @type {?}
     * @private
     */
    LiIonic4DatepickerDirective.prototype.modalCtrl;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.ngModel;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.control;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.el;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.renderer2;
    /** @type {?} */
    LiIonic4DatepickerDirective.prototype.datePickerService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGktaW9uaWM0LWRhdGVwaWNrZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGxvZ2lzdGljaW5mb3RlY2gvaW9uaWM0LWRhdGVwaWNrZXIvIiwic291cmNlcyI6WyJsaWIvbGktaW9uaWM0LWRhdGVwaWNrZXIuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUM3RyxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3BELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBT3RFLE1BQU0sT0FBTywyQkFBMkI7Ozs7Ozs7OztJQVF0QyxZQUNVLFNBQTBCLEVBQzNCLE9BQWdCLEVBQ2hCLE9BQWtCLEVBQ2xCLEVBQWMsRUFDZCxTQUFvQixFQUNwQixpQkFBMEM7UUFMekMsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixZQUFPLEdBQVAsT0FBTyxDQUFXO1FBQ2xCLE9BQUUsR0FBRixFQUFFLENBQVk7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFUbkQsaUJBQVksR0FBUSxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBUSxLQUFLLENBQUM7SUFTckIsQ0FBQzs7OztJQUVMLFFBQVE7UUFDTixtRkFBbUY7UUFFbkYsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFR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QUNQLENBQUM7S0FBQTs7O1lBeEdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDckI7Ozs7WUFYUSxlQUFlO1lBRWYsT0FBTztZQUFFLFNBQVM7WUFIc0IsVUFBVTtZQUFFLFNBQVM7WUFNN0QsdUJBQXVCOzs7OEJBUzdCLEtBQUssU0FBQyxvQkFBb0I7c0JBdUUxQixZQUFZLFNBQUMsVUFBVTs7OztJQXZFeEIsc0RBQWtEOztJQUVsRCxnREFBVTs7SUFDVixtREFBdUI7O0lBQ3ZCLGtEQUF5Qjs7Ozs7SUFHdkIsZ0RBQWtDOztJQUNsQyw4Q0FBdUI7O0lBQ3ZCLDhDQUF5Qjs7SUFDekIseUNBQXFCOztJQUNyQixnREFBMkI7O0lBQzNCLHdEQUFpRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBFbGVtZW50UmVmLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxDb250cm9sbGVyIH0gZnJvbSAnQGlvbmljL2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBJb25pYzREYXRlcGlja2VyTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsL2lvbmljNC1kYXRlcGlja2VyLW1vZGFsLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nTW9kZWwsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuaW1wb3J0IHsgSW9uaWM0RGF0ZXBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2lvbmljNC1kYXRlcGlja2VyLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbbGlJb25pYzREYXRlcGlja2VyXScsXHJcbiAgZXhwb3J0QXM6ICdsaUlvbmljNERhdGVwaWNrZXInLFxyXG4gIHByb3ZpZGVyczogW05nTW9kZWxdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlJb25pYzREYXRlcGlja2VyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgQElucHV0KCdsaUlvbmljNERhdGVwaWNrZXInKSBpbnB1dERhdGVDb25maWc6IGFueTtcclxuXHJcbiAgY2xvc2VJY29uO1xyXG4gIHNlbGVjdGVkRGF0ZTogYW55ID0ge307XHJcbiAgaXNNb2RhbE9wZW46IGFueSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgbW9kYWxDdHJsOiBNb2RhbENvbnRyb2xsZXIsXHJcbiAgICBwdWJsaWMgbmdNb2RlbDogTmdNb2RlbCxcclxuICAgIHB1YmxpYyBjb250cm9sOiBOZ0NvbnRyb2wsXHJcbiAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXHJcbiAgICBwdWJsaWMgcmVuZGVyZXIyOiBSZW5kZXJlcjIsXHJcbiAgICBwdWJsaWMgZGF0ZVBpY2tlclNlcnZpY2U6IElvbmljNERhdGVwaWNrZXJTZXJ2aWNlXHJcbiAgKSB7IH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnY29uZmlnLnllYXJJbkFzY2VuZGluZyA6ICcgKyB0aGlzLmlucHV0RGF0ZUNvbmZpZy55ZWFySW5Bc2NlbmRpbmcpO1xyXG5cclxuICAgIGlmICh0aGlzLmlucHV0RGF0ZUNvbmZpZy5jbGVhckJ1dHRvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5jbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpb24taWNvbicpO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5uYW1lID0gJ2Nsb3NlLWNpcmNsZSc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLmNsYXNzTmFtZSA9ICdjbGVhckJ1dHRvbic7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUucmlnaHQgPSAnOHB4JztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuYm90dG9tID0gJzMwJSc7XHJcbiAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLmZvbnRTaXplID0gJzE4cHgnO1xyXG4gICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS5jb2xvciA9ICcjQTlBOUE5JztcclxuICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUuekluZGV4ID0gJzUnO1xyXG4gICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUubm9kZU5hbWUgPT09ICdJT04tSVRFTScpIHtcclxuICAgICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS5ib3R0b20gPSAnMTJweCc7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5jbG9zZUljb24pO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyMi5saXN0ZW4odGhpcy5jbG9zZUljb24sICdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIC8vIERvIHNvbWV0aGluZyB3aXRoICdldmVudCdcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygnYnV0dG9uIGNsaWNrcycpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbC5jb250cm9sLnNldFZhbHVlKCcnKTtcclxuICAgICAgICB0aGlzLm5nTW9kZWwudXBkYXRlLmVtaXQoJycpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubmdNb2RlbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnbmdNb2RlbCB2YWx1ZSA9PicsIHZhbHVlKTtcclxuICAgICAgc2VsZi5zZWxlY3RlZERhdGUuZGF0ZSA9IHZhbHVlO1xyXG4gICAgICBpZiAodGhpcy5pbnB1dERhdGVDb25maWcuY2xlYXJCdXR0b24gIT09IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkge1xyXG4gICAgICAgICAgdGhpcy5jbG9zZUljb24uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5jb250cm9sLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodmFsdWUpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ2Zvcm1jb250cm9sIHZhbHVlID0+JywgdmFsdWUpO1xyXG4gICAgICBzZWxmLnNlbGVjdGVkRGF0ZS5kYXRlID0gdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLmlucHV0RGF0ZUNvbmZpZy5jbGVhckJ1dHRvbiAhPT0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICB0aGlzLmNsb3NlSWNvbi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2xvc2VJY29uLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5jb250cm9sLmNvbnRyb2wudmFsdWUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZERhdGUuZGF0ZSA9IHRoaXMuY29udHJvbC5jb250cm9sLnZhbHVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignaW9uRm9jdXMnKVxyXG4gIHB1YmxpYyBvbkZvY3VzKCkge1xyXG4gICAgaWYgKHRoaXMuZGF0ZVBpY2tlclNlcnZpY2UuaXNNb2RhbE9wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5vcGVuRGF0ZVBpY2tlcigpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgb3BlbkRhdGVQaWNrZXIoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygnb3BlbkRhdGVQaWNrZXInKTtcclxuXHJcbiAgICBjb25zdCBkYXRlUGlja2VyTW9kYWwgPSBhd2FpdCB0aGlzLm1vZGFsQ3RybC5jcmVhdGUoe1xyXG4gICAgICBjb21wb25lbnQ6IElvbmljNERhdGVwaWNrZXJNb2RhbENvbXBvbmVudCxcclxuICAgICAgY3NzQ2xhc3M6ICdsaS1pb25pYzQtZGF0ZVBpY2tlcicsXHJcbiAgICAgIGNvbXBvbmVudFByb3BzOiB7ICdvYmpDb25maWcnOiB0aGlzLmlucHV0RGF0ZUNvbmZpZywgJ3NlbGVjdGVkRGF0ZSc6IHRoaXMuc2VsZWN0ZWREYXRlLmRhdGUgfVxyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBkYXRlUGlja2VyTW9kYWwucHJlc2VudCgpO1xyXG5cclxuICAgIGRhdGVQaWNrZXJNb2RhbC5vbkRpZERpc21pc3MoKVxyXG4gICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmRhdGUgJiYgZGF0YS5kYXRhLmRhdGUgIT09ICdJbnZhbGlkIGRhdGUnKSB7XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZS5kYXRlID0gZGF0YS5kYXRhLmRhdGU7XHJcbiAgICAgICAgICB0aGlzLmNvbnRyb2wuY29udHJvbC5zZXRWYWx1ZShkYXRhLmRhdGEuZGF0ZSk7XHJcbiAgICAgICAgICB0aGlzLm5nTW9kZWwudXBkYXRlLmVtaXQoZGF0YS5kYXRhLmRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=