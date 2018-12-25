import { OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ModalController } from '@ionic/angular';
export declare const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any;
export declare class Ionic4DatepickerComponent implements OnInit, ControlValueAccessor {
    private modalCtrl;
    inputDate: any;
    date: any;
    month: any;
    year: any;
    finaldate: any;
    selectedDate: any;
    private innerValue;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(modalCtrl: ModalController);
    ngOnInit(): void;
    openDatePicker(value: any): Promise<void>;
    value: any;
    onBlur(): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
