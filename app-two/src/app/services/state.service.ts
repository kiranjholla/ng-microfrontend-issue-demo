import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService extends BehaviorSubject<{ [key: string]: any }> {
  constructor() {
    super({});
  }

  setHostname(hostname: string) {
    this.next({
      ...this.value,
      hostname
    });
  }
}
