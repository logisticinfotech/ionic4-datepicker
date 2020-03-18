
# Ionic4 DatePicker

Please check this blog for documentation [this link](https://www.logisticinfotech.com/blog/ionic4-datepicker-component)

Here is how it looks

![Ionic4-Datepicker Gif](https://www.logisticinfotech.com/wp-content/uploads/2018/12/ionic4-datepicker.gif)

# Breaking change in version 1.0.8
Due to issue in date formate `dd-MM-yyyy`, we have used momentjs to solve it.
We are moving away from angular DatePipe so now only [momentjs date formates](https://momentjs.com/docs/) are valid.

so people who are using `dd` will require change it to `DD`

## Credits to
rajeshwar patlolla's Ionic1 Datepicker