import { Component, ViewChild, Input } from '@angular/core';
import { AlertController, Content, LoadingController, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Http } from '@angular/http';

import { ProductPage } from '../product/product';
import { ProductService } from '../../providers/product-service';
import 'rxjs/Rx';

@Component({
	selector: 'products-list',
	templateUrl: './productlist.component.html'
})

export class ProductList {
	@ViewChild(Content) content: Content;
	@Input() category: string;

	public products:any = [];
	public productcount:any = {};
	public categories:any = [];
	public count:any = 0;

	public query:any = {};
	public querycategory:any = {};
	public limit:any = 20;
	public sort:any = "title";

	public loader:any;

	constructor(
		public alertCtrl: AlertController, 
		public loadingCtrl: LoadingController, 
		public navCtrl: NavController, 
		public http: Http, 
		public productService: ProductService,
		private keyboard: Keyboard
	) { }

	ngOnInit() {
		this.loader = this.loadingCtrl.create({
			content: "Laddar...",
			dismissOnPageChange: false
		});
		this.loader.present();

		this.loadCategories();
		this.loadProducts(null);
	}

	loadCategories(): void {
		let  query = { };
		this.productService.loadCategory(query, 0)
		.then(data => {
			this.categories = data;
		});
	}

	searchProducts(event:any):void {
		let searchterm = event.target.value;

		//this.content.scrollToTop();
		this.limit = 20;

		this.hideKeyboard();

		if (searchterm && searchterm.trim() != '') {
			this.query = {
				"$or" : [
					{ "title" : "~(" + searchterm + ")"},
					{ "subtitle" : "~(" + searchterm + ")"},
					{ "brand" : "~(" + searchterm + ")"}
				]
			};
			this.loadProducts(null);
		} else {
			this.query = {};
			this.loadProducts(null);
		}
	}

	hideKeyboard():void {
		this.keyboard.close()
	}

	loadProducts(infiniteScroll): void {
		this.querycategory = { "category": this.category };

		this.query["ingredients.contains_animal_milk"] = false;
		this.query["ingredients.contains_eggs"] = false;
		this.query["ingredients.contains_animal_ingredients"] = false;
		this.query["ingredients.additives_may_come_from_animal_origin"] = false;

		let q = {"$and": [this.query, this.querycategory, {"approved": true}]};

		this.productService.load(q, this.sort, this.limit)
		.then(data => {
			this.products = data;

			if(this.loader){
				this.loader.dismiss(); this.loader = null;
			}

			if(infiniteScroll != null){
				infiniteScroll.complete();
			}
		});

		this.productService.count(q, this.sort, this.limit)
		.then(data => {
			this.count = data;
		});

		this.productService.count(q, this.sort, 0)
		.then(data => {
			this.productcount = data;
		});
	}

	showMore(infiniteScroll): void {
		this.limit = this.limit + 20;

		if( this.products.length < this.count.count ) {
			this.loadProducts(infiniteScroll);
		} else {
			infiniteScroll.complete();
		}
	}

	showProduct(ean): void {
		this.navCtrl.push(ProductPage, {ean: ean});
	}

	categoryNameByCode(code) {
		return this.categories.filter(function(v) {
		    return v.code === code; // Filter out the appropriate one
		})[0]
	}

	isVegan(product) {
		if ( product.manufacturer_confirms_vegan || ( product.ingredients.additives_may_come_from_animal_origin != true && product.ingredients.contains_animal_additives != true && product.ingredients.contains_eggs != true && product.ingredients.contains_animal_milk != true && product.ingredients.contains_animal_ingredients != true ) ) {
			return true;
		}
		return false;
	}
}