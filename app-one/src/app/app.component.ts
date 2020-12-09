import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { StateService } from './services/state.service';

@Component({
  selector: 'app-one',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() host: string;

  constructor(private readonly router: Router, private readonly stateService: StateService) {}

  ngOnInit() {
    if (this.host) {
      this.stateService.next({ hostname: this.host });
    }

    this.router.initialNavigation();
  }
}
