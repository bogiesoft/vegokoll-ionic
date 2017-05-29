import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class Vegokoll {
  rootPage = HomePage;

  constructor(
    platform: Platform,
    private statusBar: StatusBar
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      if (platform.is('android')) {
		    this.statusBar.backgroundColorByHexString("#00b4d2");
	    }
    });
  }
}
