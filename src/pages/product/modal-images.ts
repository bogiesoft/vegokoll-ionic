import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
	selector: 'modal-images',
	templateUrl: 'modal-images.html'
})

export class ImagesModal {
	public images:any = {};
	public index:Number = 0;

	constructor (public viewCtrl: ViewController, private params: NavParams ) {
		this.images = params.get('images');
		this.index = params.get('initial');
	}

	dismiss(): void {
		this.viewCtrl.dismiss();
	}
}