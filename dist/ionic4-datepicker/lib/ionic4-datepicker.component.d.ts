import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ModalController } from '@ionic/angular';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {
    private modalCtrl;
    el: ElementRef;
    renderer2: Renderer2;
    inputDateConfig: any;
    closeIcon: any;
    selectedDate: any;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(modalCtrl: ModalController, el: ElementRef, renderer2: Renderer2);
    ngOnInit(): void;
    onChangeValue(value: any): void;
    openDatePicker(value: any): Promise<void>;
    value: any;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
