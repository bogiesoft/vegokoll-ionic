import { Component } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {
  public product:any;
  public loader:any;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams, public http: Http) {
  	let ean = params.get('ean');
    this.loader = this.loadingCtrl.create({
      content: "Laddar..."
    });

    this.showLoading();

    alert('https://vegokoll-rest.herokuapp.com/products/' + ean);

  	this.http.get('https://vegokoll-rest.herokuapp.com/products/' + ean)
		.map(res => res.json())
		.subscribe(data => {
			// we've got back the raw data, now generate the core schedule data
			// and save the data for later reference
			this.product = data;
      alert( JSON.stringify(data) );
      this.loader.dismissAll();
		});
  }

  showLoading(): void {
    this.loader.present();
  }

  veganOrNot(): string {
    var product = this.product;
    if ( product.hundred_procent_vegan == true ) {
      return 'icon-100-vegan.png';
    } else if ( product.ingredients.contains_eggs ) {
      return 'icon-ovo.png';
    } else if ( product.ingredients.contains_animal_milk ) {
      return 'icon-lacto.png';
    } else if ( product.ingredients.contains_animal_ingredients ) {
      return 'icon-novegan.png';
    } else if ( product.manufacturer_confirms_vegan || ( product.ingredients.additives_may_come_from_animal_origin != true && product.ingredients.contains_animal_additives != true && product.ingredients.contains_eggs != true && product.ingredients.contains_animal_milk != true && product.ingredients.contains_animal_ingredients != true ) ) {
      return 'icon-vegan.png';
    } else {
      return 'icon-novegan.png';
    }
  }

  lactoseFree(): boolean {
    var product = this.product;
    if ( product.ingredients.contains_animal_milk != true && product.other.contains_traces_of_milk != true ) {
      return true;
    } else {
      return false;
    }
  }

  flagProduct(): void {
    let prompt = this.alertCtrl.create({
      title: 'Felanmäl',
      message: "Ange vad i produktens beskrivning som är felaktigt.",
      inputs: [
        {
          name: 'message',
          placeholder: 'Meddelande'
        },
      ],
      buttons: [
        {
          text: 'Avbryt',
          handler: data => {
          }
        },
        {
          text: 'Skicka',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}