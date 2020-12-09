import { OnDestroy, Pipe, PipeTransform } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { StateService } from '../services/state.service';

// Reference: https://single-spa.js.org/docs/ecosystem-angular/#angular-assets
//
// Implementing a similar concept here to handle Asset URLs to ensure that they
// are pointed to the location where the Micro-App is deployed.
//
@Pipe({ name: 'assetUrl' })
export class AssetUrlPipe implements PipeTransform, OnDestroy {
  private hostname = '';
  private readonly unsubscribe$ = new Subject<void>();

  constructor(stateSerivce: StateService) {
    stateSerivce.pipe(takeUntil(this.unsubscribe$)).subscribe(({ hostname }) => (this.hostname = hostname || this.hostname));
  }

  transform(url: string): string {
    const publicPathSuffix = this.hostname.endsWith('/') ? '' : '/';
    const urlPrefix = url.startsWith('/') ? '' : '/';

    return `${this.hostname}${publicPathSuffix}${urlPrefix}${url}`;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
