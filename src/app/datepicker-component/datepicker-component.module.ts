import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DatepickerComponentPage } from './datepicker-component.page';
import { Ionic4DatepickerModule } from 'ionic4-datepicker';

const routes: Routes = [
  {
    path: '',
    component: DatepickerComponentPage
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
  declarations: [DatepickerComponentPage]
})
export class DatepickerComponentPageModule {}
