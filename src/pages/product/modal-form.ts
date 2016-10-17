import { Component } from '@angular/core';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product-service';


@Component({
  selector: 'modal-form',
  templateUrl: 'modal-form.html'
})

export class FormModal {
	public product:any = { "ingredients": {}, "other": {} };
	public categories:any = [];

  constructor (public alertCtrl: AlertController, public viewCtrl: ViewController, public http: Http, private params: NavParams, public productService: ProductService ) {
  	this.product.gtin = params.get('gtin');
  	this.loadCategories();
  }

	loadCategories(): void {
		this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/category/' )
		.map(res => res.json())
		.subscribe(data => {
			this.categories = data;
		});
	}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  postProduct(): void {
  	console.log(this.product);
  	if( 
  		this.product.title == null || 
  		this.product.title == "" ||
  		this.product.brand == null ||
  		this.product.brand == "" ||
  		this.product.category == null
  	) {
			let prompt = this.alertCtrl.create({
				title: 'För lite information!',
				message: "Fyll gärna i produktens namn, tillverkare och välj kategori så vi snabbare kan lägga till produkten.",
				buttons: [
					{
						text: 'Ok',
						handler: data => {
						}
					}
				]
			});
			prompt.present();
  	} else {
  		this.productService.add(this.product);
    	this.viewCtrl.dismiss();
  	}
  }
}