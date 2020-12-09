import { ApplicationRef, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyComponent } from './components/empty/empty.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { HarryPotterModule } from './modules/harry-potter/harry-potter.module';
import { StarWarsModule } from './modules/star-wars/star-wars.module';
import { AssetUrlPipe } from './utils/asset-url.pipe';

@NgModule({
  declarations: [AppComponent, EmptyComponent, LandingComponent, HomeComponent, AssetUrlPipe],
  imports: [BrowserModule, AppRoutingModule, StarWarsModule, HarryPotterModule],
  providers: [],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private readonly injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    if (!environment.production) {
      appRef.bootstrap(AppComponent);
    } else {
      console.log('Checking 2: ', customElements.get('app-two'));
      if (!customElements.get('app-two')) {
        const appWebComponent = createCustomElement(AppComponent, { injector: this.injector });
        customElements.define('app-two', appWebComponent);
      }
    }
  }
}
