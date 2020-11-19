import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    // {
    //   title: 'Home',
    //   url: '/home'
    // },
    {
      title: 'Reactive Form',
      url: '/reactive-form'
    },
    {
      title: 'Template Driven Form',
      url: '/template-driven-form'
    },
    {
      title: 'DatePicker (using component)',
      url: '/datepicker-component'
    },
    {
      title: 'DatePicker (using directive)',
      url: '/datepicker-directive'
    },
    {
      title: 'DatePicker (using Button)',
      url: '/datepicker-button'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('cordova') && (this.platform.is('android') || this.platform.is('ios'))) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }
}
