import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ConfigUrl, ConfigService } from './config.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule]
})
export class ConfigModule {
  static withUrl(configUrl: string): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [{ provide: ConfigUrl, useValue: configUrl }, ConfigService]
    };
  }
}
