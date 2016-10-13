import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Vegokoll } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';
import { ProductsPage } from '../pages/products/products';
import { SearchTab } from '../pages/products/search-tab';
import { CategoryTab } from '../pages/products/category-tab';

@NgModule({
  declarations: [
    Vegokoll,
    AboutPage,
    ProductPage,
    HomePage,
    ProductsPage,
    SearchTab,
    CategoryTab
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
    ProductsPage,
    SearchTab,
    CategoryTab
  ],
  providers: []
})
export class AppModule {}
