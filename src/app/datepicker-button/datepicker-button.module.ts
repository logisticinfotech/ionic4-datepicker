import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatepickerButtonPage } from './datepicker-button.page';
import { Ionic4DatepickerModule } from 'ionic4-datepicker';

const routes: Routes = [
  {
    path: '',
    component: DatepickerButtonPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DatepickerButtonPage]
})
export class DatepickerButtonPageModule { }
