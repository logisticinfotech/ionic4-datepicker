import { NgModule } from '@angular/core';
import { Ionic4DatepickerComponent } from './ionic4-datepicker.component';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Ionic4DatepickerComponent,
    Ionic4DatepickerModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
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
