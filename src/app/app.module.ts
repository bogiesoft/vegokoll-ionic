import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Vegokoll } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import { FormModal } from '../pages/product/modal-form';
import { ImagesModal } from '../pages/product/modal-images';
import { ProductService } from '../providers/product-service';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    Vegokoll,
    AboutPage,
    ProductPage,
    FormModal,
    ImagesModal,
    HomePage,
    ProductsPage
  ],
  imports: [
    IonicModule.forRoot(Vegokoll, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Vegokoll,
    HomePage,
    AboutPage,
    ProductPage,
    FormModal,
    ImagesModal,
    ProductsPage
  ],
  providers: [
    ProductService,
    BarcodeScanner,
    Camera,
    Transfer,
    TransferObject,
    File
  ]
})
export class AppModule {}
