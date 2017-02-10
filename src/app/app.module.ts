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
  providers: [ProductService]
})
export class AppModule {}
