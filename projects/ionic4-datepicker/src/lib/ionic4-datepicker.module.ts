import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


import { Ionic4DatepickerComponent } from './ionic4-datepicker.component';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component'

@NgModule({
  declarations: [
    Ionic4DatepickerComponent,
    Ionic4DatepickerModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    Ionic4DatepickerComponent,
    Ionic4DatepickerModalComponent
  ],
  entryComponents: [
    Ionic4DatepickerModalComponent
  ],
})
export class Ionic4DatepickerModule { }
