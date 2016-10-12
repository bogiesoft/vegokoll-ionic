import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Vegokoll } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    Vegokoll,
    AboutPage,
    ProductPage,
    HomePage
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
    ProductPage
  ],
  providers: []
})
export class AppModule {}
