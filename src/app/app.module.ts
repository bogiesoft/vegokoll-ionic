import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Vegokoll } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';

@NgModule({
  declarations: [
    Vegokoll,
    AboutPage,
    ProductPage,
    HomePage,
    SearchPage
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
    SearchPage
  ],
  providers: []
})
export class AppModule {}
