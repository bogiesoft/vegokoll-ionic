import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import 'rxjs/Rx';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'tab-category',
  templateUrl: 'category-tab.html'
})
export class CategoryTab {
  public products:any;
  public query:any = {};
  public limit:number = 10;

  constructor(public navCtrl: NavController, public http: Http) {
    this.limit = 10;

    this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/product/?limit=10' )
    .map(res => res.json())
    .subscribe(data => {
      // we've got back the raw data, now generate the core schedule data
      // and save the data for later reference
      this.products = data;
    });
  }

  searchProducts(event:any) {
    let searchterm = event.target.value;

    this.limit = 10;

    if (searchterm && searchterm.trim() != '') {
      this.query = {
        "$or" : [
          { "title" : "~(" + searchterm + ")"},
          { "subtitle" : "~(" + searchterm + ")"}
        ]
      };

      this.loadProducts();
    } else {
      this.query = {};

      this.loadProducts();
    }
  }

  loadProducts(): void {
    let querystring = JSON.stringify(this.query);

    this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/product/?query=' + querystring + '&limit=' + this.limit )
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.products = data;
      });
  }

  showMore(): void {
    this.limit = this.limit + 10;
    console.log(this.limit);
    this.loadProducts();
  }

  showProduct(ean): void {
    this.navCtrl.push(ProductPage, {ean: ean});
  }

}
