import { Component } from '@angular/core';
import { AlertController, LoadingController, ModalController, ActionSheetController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

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

	public imageChosen: any = 0;
 	public imagePath: any;
	public imageNewPath: any;

	public uploading: boolean;
	public flags:any = [];

	constructor(
		public alertCtrl: AlertController, 
		public actionSheet: ActionSheetController, 
		public loadingCtrl: LoadingController, 
		public navCtrl: NavController, 
		public params: NavParams, 
		public http: Http, 
		public modalCtrl: ModalController, 
		public productService: ProductService,
		private camera: Camera,
		private transfer: Transfer, 
		private file: File
	) {
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
				this.loadImages( this.product.gtin );
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

	loadImages(gtin): void {
		this.productService.getImages(gtin)
		.then(data => {
			this.images = data;
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

	openImagesModal(index): void {
		let modal = this.modalCtrl.create(ImagesModal, {"images": this.images, "initial": index});
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
  
	isFlagged(): boolean {
		if ( typeof this.product.flagged != 'undefined' ) {
			if ( this.product.flagged === true ) {
				return true;
			} else if ( this.product.flagged.flagged === true ) {
				return true;
			}
		} else {
			return false;
		}
	}

	chooseImage(): void {
		let actionSheet = this.actionSheet.create({
			title: 'Välj bildkälla',
				buttons: [
				{
					text: 'Album',
					icon: 'albums',
					handler: () => {
						this.actionHandler(1);
					}
				},
				{
					text: 'Kamera',
					icon: 'camera',
					handler: () => {
						this.actionHandler(2);
					}
				},
				{
					text: 'Avbryt',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}

	actionHandler(selection: any) {
		var options: any;
		if (selection == 1) {
			options = {
				quality: 75,
				destinationType: this.camera.DestinationType.FILE_URI,
				sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
				allowEdit: false,
				targetWidth: 1080,
				targetHeight: 1080,
				encodingType: this.camera.EncodingType.JPEG,
				saveToPhotoAlbum: false
			};
		} else {
			options = {
				quality: 75,
				destinationType: this.camera.DestinationType.FILE_URI,
				sourceType: this.camera.PictureSourceType.CAMERA,
				allowEdit: false,
				targetWidth: 1080,
				targetHeight: 1080,
				encodingType: this.camera.EncodingType.JPEG,
				saveToPhotoAlbum: false
			};
		}

		this.camera.getPicture(options).then((imgUrl) => {
		    var uploadOptions = {
		       params: { 'upload_preset': 'uymbkjen' }
		    };
		    const fileTransfer: TransferObject = this.transfer.create();
		    this.uploading = true;

			fileTransfer.upload(imgUrl, 'https://api.cloudinary.com/v1_1/klandestino-ab/image/upload', uploadOptions).then((data) => {
			      	// Fix until bugfix is released https://github.com/driftyco/ionic-native/commit/a5b4632ceb1a962157ec2be420dfcf5dcf9abe4f
			      	let response = JSON.parse(JSON.stringify(data));
			      	let image = JSON.parse(response.response);
			      	image.gtin = this.gtin;

			        this.productService.addImage( image )
					.then(data => {
						this.loadImages( this.gtin );
					});

		    		this.uploading = false;
			}, (err) => {
			        console.log(JSON.stringify(err));
			});
		}, (err) => {
			console.log(JSON.stringify(err))
		});
	}
}