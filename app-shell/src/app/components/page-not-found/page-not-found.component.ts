import { Component } from '@angular/core';

@Component({
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  errorNumber = '404';
  errorMessage = 'The page you are looking for could not be found!';
}
