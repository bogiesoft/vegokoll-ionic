import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormModal } from './modal-form';
import { ImagesModal } from './modal-images';
import { ProductService } from '../../providers/product-service';

import 'rxjs/Rx';

import { NavController, NavParams } from 'ionic-angular';

declare var cordova: any;

@Component({
	selector: 'page-product',
	templateUrl: 'product.html'
})
export class ProductPage {
	public gtin:any;
	public product:any;
	public images: any = [];
	public empty:any = false;
	public category:any;
	public loader:any;
	public flags:any = [];

	constructor(public alertCtrl: AlertController, public actionSheet: ActionSheetController, public loadingCtrl: LoadingController, public navCtrl: NavController, public params: NavParams, public http: Http, public modalCtrl: ModalController, public productService: ProductService) {
		this.gtin = params.get('ean');
		this.loader = this.loadingCtrl.create({
			content: "Laddar..."
		});

		this.showLoading();
		this.loadProduct(this.gtin);
	}

	loadCategory(category): void {
		let  query = { "code": category }
		this.productService.loadCategory(query, 1)
		.then(data => {
			this.category = data[0];
		});
	}

	loadProduct(ean): void {
		let query = {"gtin": ean};

		this.productService.load(query, 'title', 1)
		.then(data => {
			this.product = data[0];
			if ( this.product!=null ) {
				this.loadCategory( this.product.category );
				this.loadFlags( this.product.gtin );
				this.empty = false;
			} else {
				this.empty = true;
			}
			this.loader.dismissAll();
		});
	}

	loadFlags(ean): void {
		this.productService.loadFlags(ean)
		.then(data => {
			this.flags = data;
		});
	}

	showLoading(): void {
		this.loader.present();
	}

	veganOrNot(): string {
		var product = this.product;
		if ( product.hundred_procent_vegan == true ) {
			return 'icon-vegan.png';
		} else if ( product.ingredients && product.ingredients.contains_eggs ) {
			return 'icon-novegan.png';
		} else if ( product.ingredients.contains_animal_milk ) {
			return 'icon-novegan.png';
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
						let flag = {
							gtin : this.product.gtin,
							message : data.message,
							created_at : new Date()
						};
						this.productService.addFlag( flag );
						this.flags.push( flag );
					}
				}
			]
		});
		prompt.present();
	}

	openImagesModal(): void {
		let modal = this.modalCtrl.create(ImagesModal, {"images": this.product.images});
		modal.present();
	}

	openFormModal(): void {
		let modal = this.modalCtrl.create(FormModal, {"gtin": this.gtin});
		modal.onDidDismiss(data => {
			this.product = null;
		    this.loadProduct(this.gtin);
		});
		modal.present();
	}
}