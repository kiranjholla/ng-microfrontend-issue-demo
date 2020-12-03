import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';

export const ConfigUrl = new InjectionToken('CONFIG');

export const appInitializerFactory = (configService: ConfigService) => () => configService.loadConfig();

@Injectable()
export class ConfigService {
  private config: { [key: string]: any };

  constructor(private readonly http: HttpClient, @Inject(ConfigUrl) private readonly configUrl: string) {}

  loadConfig(): Promise<any> {
    if (this.configUrl) {
      return new Promise(complete =>
        this.http.get(this.configUrl).subscribe({
          next: config => (this.config = config),
          complete,
          error: error => {
            this.config = {};
            console.error(error);
            complete();
          }
        })
      );
    } else {
      this.config = {};
      return Promise.resolve();
    }
  }

  getConfig() {
    return this.config;
  }
}
