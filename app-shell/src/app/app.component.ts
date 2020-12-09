import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { ERROR_ROUTES, HOME_ROUTES } from './app-routing.module';
import { EmptyComponent } from './components/empty/empty.component';
import { ConfigService } from './modules/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appContainer', { static: false }) container: ElementRef;
  links: { route: string; name: string }[] = [];

  private readonly config;
  private readonly routes: Routes = [];

  constructor(configService: ConfigService, private readonly router: Router) {
    this.config = configService.getConfig();
  }

  ngAfterViewInit() {
    const apps = Object.keys(this.config);

    if (apps.length) {
      if (this.container) {
        apps.forEach(element => {
          this.loadApp(element, this.config[element]);
        });
        this.router.resetConfig([...HOME_ROUTES, ...this.routes, ...ERROR_ROUTES]);
      } else {
        console.error('No DOM element available to load apps.');
      }
    }
  }

  private loadApp(ele: string, config: any) {
    const { hostname = '', scripts, styles, loaded, route, name, element = ele } = config;

    if (loaded) {
      return;
    }

    this.links.push({ route: `#/${route}`, name });
    this.routes.push({ path: `${route}`, component: EmptyComponent });

    scripts?.forEach(path => {
      const scriptTag = document.createElement('script');
      scriptTag.setAttribute('src', `${hostname}${path}`);
      scriptTag.setAttribute('defer', '');
      this.container.nativeElement.appendChild(scriptTag);
    });

    styles?.forEach(style => {
      const styleTag = document.createElement('link');
      styleTag.setAttribute('href', `${hostname}${style}`);
      styleTag.setAttribute('rel', 'stylesheet');
      document.head.appendChild(styleTag);
    });

    if (scripts?.length) {
      const domElem = document.createElement(element);
      domElem.setAttribute('host', hostname);
      this.container.nativeElement.appendChild(domElem);
      config.loaded = true;
    }
  }
}
