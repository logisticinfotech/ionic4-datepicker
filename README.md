
# Ionic4 DatePicker

This library is inspired by rajeshwar patlolla's [Ionic1 Datepicker](https://github.com/rajeshwarpatlolla/ionic-datepicker).
Its still in development.
Here is how it looks currently
![Ionic4-Datepicker Gif](https://www.logisticinfotech.com/wp-content/uploads/2018/12/ionic4-datepicker.gif)

# How to use It

In your module file import it
```
import { Ionic4DatepickerModule } from  '@logisticinfotech/ionic4-datepicker';
```
and in import array add it
```
IonicModule,
Ionic4DatepickerModule,
```
In your component declare your model variable and datepicker options.
```
mydate;
datePickerObj:  any  = {
  fromDate: new Date('2018-07-01'), // Default null
  toDate: new Date('2018-12-30'), // Default null
  showTodayButton: true/false // Default true
  closeOnSelect: true/false // Default false
  disableWeekdays: [0] // This will hide sunday
};
```
Available Options are:
**1) from**(Optional) : This is a date object, from which you wish to enable the dates. You can use this property to disable **previous dates** by specifying `from: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**2) to**(Optional) : This is a date object, to which you wish to enable the dates. You can use this property to disable **future dates** by specifying `to: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**3) showTodayButton**(Optional) : Boolean to specify whether to show the `Today` button or not. The default values is `false`.

**4) closeOnSelect**(Optional) : Boolean to indicate whether date picker popup/modal will be closed after selection. If set to `true`, `Set` button will be hidden. The default value is `false`.

**5) disableWeekdays**(Optional) : Accepts array of numbers starting from 0(Sunday) to 6(Saturday). If you specify any values for this array, then it will disable that week day in the whole calendar. For example if you pass [0,6], then all the Sundays and Saturdays will be disabled.

Then in your html simply use it as below
```
<li-ionic4-datepicker  [(ngModel)]="mydate"
[inputDate]="datePickerObj"></li-ionic4-datepicker>
```

For model to open as screenshot please add below css in your projects global.scss
```
.li-ionic4-datePicker {
  .modal-wrapper {
    height: 75%;
    width: 310px;
    border-radius: 0px;
    @media (min-width: 768px) {
       width: 350px;
       height: 65%;
    }
  }
}
```
