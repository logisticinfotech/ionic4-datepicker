import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgModel, NgControl } from '@angular/forms';
import { Ionic4DatepickerService } from './ionic4-datepicker.service';
export declare class LiIonic4DatepickerDirective implements OnInit {
    private modalCtrl;
    ngModel: NgModel;
    control: NgControl;
    el: ElementRef;
    renderer2: Renderer2;
    datePickerService: Ionic4DatepickerService;
    inputDateConfig: any;
    closeIcon: any;
    selectedDate: any;
    isModalOpen: any;
    constructor(modalCtrl: ModalController, ngModel: NgModel, control: NgControl, el: ElementRef, renderer2: Renderer2, datePickerService: Ionic4DatepickerService);
    ngOnInit(): void;
    onFocus(): void;
    openDatePicker(): Promise<void>;
}
