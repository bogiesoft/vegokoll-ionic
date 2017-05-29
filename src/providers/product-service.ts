import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
	public API: String = 'https://vegokoll-rest.herokuapp.com/api/v1';

	constructor(public http: Http) {}

	load(query, sort, limit) {

		let querystring = JSON.stringify(query);

		return new Promise(resolve => {
			this.http.get(this.API + '/product/?query=' + querystring + '&limit=' + limit + '&sort=' + sort)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	count(query, sort, limit) {
		let querystring = JSON.stringify(query);

		return new Promise(resolve => {
			this.http.get(this.API + '/product/count/?query=' + querystring + '&limit=' + limit + '&sort=' + sort )
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	addImage(image) {
    	let headers = new Headers({'Content-Type': 'application/json'});
		return new Promise(resolve => {
			this.http.post(this.API + '/productimage/', image, {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	getImages(gtin) {
		let querystring = JSON.stringify({
			'gtin': gtin
		});
		return new Promise(resolve => {
			this.http.get(this.API + '/productimage/?query=' + querystring)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	addProduct(product) {
    	let headers = new Headers({'Content-Type': 'application/json'});
		return new Promise(resolve => {
			this.http.post(this.API + '/product/', product, {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	loadCategory(query, limit) {
		let querystring = JSON.stringify(query);

		return new Promise(resolve => {
			this.http.get(this.API + '/category/?query=' + querystring + '&limit=' + limit + '&sort=name')
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	loadFlags(gtin) {
		let querystring = JSON.stringify({
			'gtin': gtin
		});
		return new Promise(resolve => {
			this.http.get(this.API + '/productflag/?query=' + querystring)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	addFlag(flag) {
		return new Promise(resolve => {
			this.http.post(this.API + '/productflag/', flag)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}
}