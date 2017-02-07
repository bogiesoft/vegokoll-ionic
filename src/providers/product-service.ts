import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
	constructor(public http: Http) {}

	load(query, sort, limit) {

		let querystring = JSON.stringify(query);

		return new Promise(resolve => {
			this.http.get('https://vegokoll-rest.herokuapp.com/api/v1/product/?query=' + querystring + '&limit=' + limit + '&sort=' + sort)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	count(query, sort, limit) {
		let querystring = JSON.stringify(query);

		return new Promise(resolve => {
			this.http.get('https://vegokoll-rest.herokuapp.com/api/v1/product/count/?query=' + querystring + '&limit=' + limit + '&sort=' + sort )
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	addImage(image) {
    	let headers = new Headers({'Content-Type': 'application/json'});
		return new Promise(resolve => {
			this.http.post('https://vegokoll-rest.herokuapp.com/api/v1/productimage/', image, {headers: headers})
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
			this.http.get('https://vegokoll-rest.herokuapp.com/api/v1/productimage/?query=' + querystring)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	add(product) {
    	let headers = new Headers({'Content-Type': 'application/json'});
		return new Promise(resolve => {
			this.http.post('https://vegokoll-rest.herokuapp.com/api/v1/product/', product, {headers: headers})
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}

	flag(_id, body) {
		return new Promise(resolve => {
			this.http.put('https://vegokoll-rest.herokuapp.com/api/v1/product/'+_id, body)
				.map(res => res.json())
				.subscribe(data => {
					resolve(data);
				});
		});
	}
}