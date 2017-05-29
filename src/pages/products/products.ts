import { Component, ViewChild } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { Http } from '@angular/http';

import 'rxjs/Rx';

import { ProductService } from '../../providers/product-service';
import { FeedService } from '../../providers/feed-service';

@Component({
	selector: 'page-products',
	templateUrl: 'products.html'
})

export class ProductsPage {
	@ViewChild(Content) content: Content;

	public products:any = [];
	public productcount:any = {};
	public categories:any = [];
	public count:any = 0;
	public switch:any = 'news';

	public query:any = {};
	public querycategory:any = {};
	public limit:any = 20;
	public sort:any = "title";

	public feed:any = [];

	constructor(
		public navCtrl: NavController, 
		public http: Http, 
		public productService: ProductService,
		public feedService: FeedService,
		private keyboard: Keyboard
	) { }

	ngOnInit() {
		this.loadCategories();
		this.loadFeed();
	}

	loadFeed(): void {
		this.feedService.getFeedContent()
		.then(data => {
			this.feed = data;
		});
	}

	stripExcerpt( html: string): string {
		html = html.replace(/<\/?[^>]+(>|$)/g, "");
		if( html.split('.').length >= 1 ) {
			html = html.split('. ')[0] + '.';
		}
		return html;
	}

	findImage(html: string): string {
		var regex = /<img[^>]*src="([^"]*)"/g;

		var arr, outp = [];
		while ((arr = regex.exec(html))) {
			outp.push(arr[1]);
		}
		return outp[0];

	}

	loadCategories(): void {
		let  query = { };
		this.productService.loadCategory(query, 0)
		.then(data => {
<<<<<<< HEAD
			this.productcount = data;
=======
			this.categories = data;
>>>>>>> Ny meny och förstasida med nyheter
		});
	}

	hideKeyboard():void {
		this.keyboard.close()
	}

	switchTo(code: string): void {
		this.content.scrollToTop();
		this.switch = code;
	}

	categoryNameByCode(code) {
		return this.categories.filter(function(v) {
		    return v.code === code; // Filter out the appropriate one
		})[0]
	}
}