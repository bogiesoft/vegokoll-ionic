import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'modal-images',
  templateUrl: 'modal-images.html'
})

export class ImagesModal {
  public images:any = {};

  constructor (public viewCtrl: ViewController, private params: NavParams ) {
  	this.images = params.get('images');
  	console.log(this.images);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}