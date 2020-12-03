import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmptyComponent } from './components/empty/empty.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ConfigModule } from './modules/config/config.module';
import { appInitializerFactory, ConfigService } from './modules/config/config.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, EmptyComponent, PageNotFoundComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, ConfigModule.withUrl('configs/config.json')],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      multi: true,
      deps: [ConfigService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
