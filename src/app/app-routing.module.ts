import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reactive-form',
    pathMatch: 'full'
  },
  // {
  //   path: 'home',
  //   loadChildren: './home/home.module#HomePageModule'
  // },
  {
    path: 'reactive-form',
    loadChildren: './reactive-form/reactive-form.module#ReactiveFormPageModule'
  },
  {
    path: 'template-driven-form',
    loadChildren: './template-driven-form/template-driven-form.module#TemplateDrivenFormPageModule'
  },
  {
    path: 'datepicker-component',
    loadChildren: './datepicker-component/datepicker-component.module#DatepickerComponentPageModule'
  },
  {
    path: 'datepicker-directive',
    loadChildren: './datepicker-directive/datepicker-directive.module#DatepickerDirectivePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
