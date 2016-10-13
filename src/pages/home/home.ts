import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  scanBarcode(): void {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    
    BarcodeScanner.scan().then((barcodeData) => {
      if( barcodeData.cancelled == 1 ) {
        return;
      } else if( barcodeData.text !== "" ) {
        let ean = barcodeData.text;
        this.navCtrl.push(ProductPage, {ean: ean});
      } else {
        alert('Oj, något gick fel!');
      }
    }, (err) => {
        alert('Oj, något gick fel!');
        this.navCtrl.push(ProductPage, {ean: "7393061001547"});
    });
  }

  goToAboutPage(): void {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(AboutPage);
  }

  goToSearchPage(): void {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(SearchPage);
  }

}
