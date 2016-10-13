import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ProductPage } from '../product/product';
import 'rxjs/Rx';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})

export class ProductsPage {
  public products:any;
  public query:any = {};
  public limit:any = 20;
  public sort:any = "title";
  public categories:any;
  public querycategories:any = {};

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public http: Http) {
    this.limit = 20;

    this.loadProducts();
    this.loadCategory();
  }

  loadCategory(): void {
    this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/category/' )
    .map(res => res.json())
    .subscribe(data => {
      // we've got back the raw data, now generate the core schedule data
      // and save the data for later reference
      this.categories = data;
    });
  }

  searchProducts(event:any) {
    let searchterm = event.target.value;

    this.limit = 20;

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

    this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/product/?query=' + querystring + '&limit=' + this.limit + '&sort=' + this.sort )
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.products = data;
      });
  }

  showMore(infiniteScroll): void {
    this.limit = this.limit + 10;
    let querystring = JSON.stringify(this.query);

    this.http.get( 'https://vegokoll-rest.herokuapp.com/api/v1/product/?query=' + querystring + '&limit=' + this.limit + '&sort=' + this.sort )
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.products = data;
        infiniteScroll.complete();
      });

  }

  showProduct(ean): void {
    this.navCtrl.push(ProductPage, {ean: ean});
  }

  showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Visa katekorier');

    this.categories.map(function(category){
      alert.addInput({
        type: 'checkbox',
        label: category.name,
        value: category.type,
        checked: true
      });
    });

    alert.addButton({
      text: 'Visa',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });
    alert.present();
  }

}