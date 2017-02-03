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

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
 
// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBxRjBG5idSlY2oUAEw0G0R7MRYWNrNnFE",
  authDomain: "vegokoll-c12bb.firebaseapp.com",
  databaseURL: "https://vegokoll-c12bb.firebaseio.com",
  storageBucket: "vegokoll-c12bb.appspot.com",
  messagingSenderId: "516714888958"
};

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
    }),
    AngularFireModule.initializeApp(firebaseConfig)
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
  providers: [ProductService]
})
export class AppModule {}
