import { Component, ViewChild } from '@angular/core';
import { AlertController, Content, LoadingController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import { ProductService } from '../../providers/product-service';
import 'rxjs/Rx';

@Component({
	selector: 'page-products',
	templateUrl: 'products.html'
})

export class ProductsPage {
	@ViewChild(Content) content: Content;

	public products:any = [];
	public categories:any = [];
	public count:any = 0;

	public query:any = {};
	public querycategory:any = {};
	public limit:any = 20;
	public sort:any = "title";

	public loader:any;

	constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, public productService: ProductService) {
		this.limit = 20;

		this.loader = this.loadingCtrl.create({
			content: "Laddar...",
			dismissOnPageChange: false
		});
		this.loader.present();

		this.loadCategories();
		this.loadProducts(null);
	}

	loadCategories(): void {
		this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/category/' )
		.map(res => res.json())
		.subscribe(data => {
			this.categories = data;
		});
	}

	searchProducts(event:any) {
		let searchterm = event.target.value;

		this.content.scrollToTop();
		this.limit = 20;

		if (searchterm && searchterm.trim() != '') {
			this.query = {
				"$or" : [
					{ "title" : "~(" + searchterm + ")"},
					{ "subtitle" : "~(" + searchterm + ")"}
				]
			};
			this.loadProducts(null);
		} else {
			this.query = {};
			this.loadProducts(null);
		}
	}

	loadProducts(infiniteScroll): void {

		this.query["ingredients.contains_animal_milk"] = false;
		this.query["ingredients.contains_eggs"] = false;
		this.query["ingredients.contains_animal_ingredients"] = false;
		this.query["ingredients.additives_may_come_from_animal_origin"] = false;

		let q = {"$and": [this.query, this.querycategory, {"approved": true}]};


		this.productService.load(q, this.sort, this.limit)
		.then(data => {
			this.products = data;

			this.loader.dismissAll();

			if(infiniteScroll != null){
				infiniteScroll.complete();
			}
		});

		this.productService.count(q, this.sort, this.limit)
		.then(data => {
			this.count = data;
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

	showCheckbox() {
		let options = {inputs:[]};
		let querycategory = this.querycategory;

		let checked = (null == querycategory.category ) ? true : false ;
		options.inputs = [{ name : 'options', value: 'alla', label: 'Alla', type: 'radio', checked: checked }];

    	this.categories.map(function(category){ 
    		checked = (category.code == querycategory.category ) ? true : false ;
		  options.inputs.push({ name : 'options', value: category.code, label: category.name, type: 'radio', checked: checked });
		});

		let alert = this.alertCtrl.create(options);

		alert.setTitle('Visa katekorier');

		alert.addButton({
			text: 'Visa',
			handler: data => {
				this.querycategory = (data=="alla") ? {} : {"category": data};
				this.loadProducts(null);
			}
		});
		alert.present();
	}
}