import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TemplateDrivenFormPage } from './template-driven-form.page';
import { Ionic4DatepickerModule } from 'ionic4-datepicker';

const routes: Routes = [
  {
    path: '',
    component: TemplateDrivenFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TemplateDrivenFormPage]
})
export class TemplateDrivenFormPageModule {}
