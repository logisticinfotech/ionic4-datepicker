import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LiIonic4DatepickerDirective } from './li-ionic4-datepicker.directive';
import { Ionic4DatepickerModalComponent } from './ionic4-datepicker-modal/ionic4-datepicker-modal.component';
import { IonicModule } from '@ionic/angular';
import { Ionic4DatepickerComponent } from './ionic4-datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    Ionic4DatepickerComponent,
    LiIonic4DatepickerDirective,
    Ionic4DatepickerModalComponent
  ],
  exports: [
    Ionic4DatepickerComponent,
    LiIonic4DatepickerDirective,
    Ionic4DatepickerModalComponent,
    CommonModule,
    FormsModule
  ],
  entryComponents: [
    // Ionic4DatepickerComponent,
    Ionic4DatepickerModalComponent
  ],
  providers: [

  ]
})
export class Ionic4DatepickerModule { }
