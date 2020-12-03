import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-two';

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.router.initialNavigation();
  }
}
