import { Component } from '@angular/core';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductService } from '../../providers/product-service';


@Component({
  selector: 'modal-form',
  templateUrl: 'modal-form.html'
})

export class FormModal {
  public product:any = {
    "gtin": Number,
    "title": "",
    "subtitle": "",
    "brand": "",
    "category": "",
    "ingredients": {
      "contains_animal_milk": false,
      "contains_eggs": false,
      "contains_animal_ingredients": false,
      "additives_may_come_from_animal_origin": false
    },
    "other": {
      "animal_tested": false,
      "contains_traces_of_milk": false,
      "contains_traces_of_eggs": false,
      "organic": false,
      "gluten_free": false
    },
    "manufacturer_confirms_vegetarian": false,
    "manufacturer_confirms_vegan": false,
    "hundred_procent_vegan": false,
    "general_comment":"","approved": false,
    "flagged": {
      "flagged": false,
      "message": ""
    }
  };
	public categories:any = [];

  constructor (public alertCtrl: AlertController, public viewCtrl: ViewController, public http: Http, private params: NavParams, public productService: ProductService ) {
  	this.product.gtin = params.get('gtin');
  	this.loadCategories();
  }

	loadCategories(): void {
    let  query = {};
    this.productService.loadCategory(query, '0')
    .then(data => {
      this.categories = data;
    });

	}

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  postProduct(): void {
  	if( 
  		this.product.title == null || 
  		this.product.title == "" ||
  		this.product.brand == null ||
  		this.product.brand == "" ||
      this.product.category == null ||
      this.product.category == ""
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
  		this.productService.addProduct(this.product);
    	this.viewCtrl.dismiss();
  	}
  }
}