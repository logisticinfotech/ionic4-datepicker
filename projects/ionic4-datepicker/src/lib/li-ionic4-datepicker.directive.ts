import { Directive, Input, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { NgModel, NgControl } from '@angular/forms';

import * as moment_ from 'moment';
import { Ionic4DatepickerService } from './ionic4-datepicker.service';

@Directive({
  selector: '[liIonic4Datepicker]',
  exportAs: 'liIonic4Datepicker',
  providers: [NgModel],
})
export class LiIonic4DatepickerDirective implements OnInit {

  @Input('liIonic4Datepicker') inputDateConfig: any;

  closeIcon;
  selectedDate: any = {};
  isModalOpen: any = false;

  constructor(
    private modalCtrl: ModalController,
    public ngModel: NgModel,
    public control: NgControl,
    public el: ElementRef,
    public renderer2: Renderer2,
    public datePickerService: Ionic4DatepickerService
  ) { }

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
      this.renderer2.listen(this.closeIcon, 'click', (event) => {
        // Do something with 'event'
        // console.log('button clicks');
        this.selectedDate.date = new Date();
        this.control.control.setValue('');
        this.ngModel.update.emit('');
      });
    }

    const self = this;
    this.ngModel.valueChanges.subscribe((value) => {
      // console.log('ngModel value =>', value);
      self.selectedDate.date = value;
      if (this.inputDateConfig.clearButton !== false) {
        if (!value) {
          this.closeIcon.style.visibility = 'hidden';
        } else {
          this.closeIcon.style.visibility = 'visible';
        }
      }
    });

    this.control.control.valueChanges.subscribe((value) => {
      // console.log('formcontrol value =>', value);
      self.selectedDate.date = value;
      if (this.inputDateConfig.clearButton !== false) {
        if (!value) {
          this.closeIcon.style.visibility = 'hidden';
        } else {
          this.closeIcon.style.visibility = 'visible';
        }
      }
    });

    if (this.control.control.value) {
      this.selectedDate.date = this.control.control.value;
    }
  }

  @HostListener('ionFocus')
  public onFocus() {
    if (this.datePickerService.isModalOpen) {
      return;
    }
    this.openDatePicker();
  }

  async openDatePicker() {
    // console.log('openDatePicker');

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 'objConfig': this.inputDateConfig, 'selectedDate': this.selectedDate.date }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        if (data.data && data.data.date && data.data.date !== 'Invalid date') {
          this.selectedDate.date = data.data.date;
          this.control.control.setValue(data.data.date);
          this.ngModel.update.emit(data.data.date);
        }
      });
  }
}

