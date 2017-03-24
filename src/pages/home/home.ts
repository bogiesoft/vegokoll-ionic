import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AboutPage } from '../about/about';
import { ProductPage } from '../product/product';
import { ProductsPage } from '../products/products';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner) {

  }

  scanBarcode(): void {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    
    this.barcodeScanner.scan().then((barcodeData) => {
      if( barcodeData.cancelled == 1 ) {
        return;
      } else if( barcodeData.text !== "" ) {
        let ean = barcodeData.text;
        this.navCtrl.push(ProductPage, {ean: ean});
      } else {
        alert('Oj, det gick inte att starta kameran.');
      }
    }, (err) => {
      alert('Oj, det gick inte att starta kameran.');
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
    this.navCtrl.push(ProductsPage);
  }

}
