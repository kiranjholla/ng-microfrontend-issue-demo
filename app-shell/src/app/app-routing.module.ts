import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const HOME_ROUTES: Routes = [{ path: '', component: HomeComponent }];

export const ERROR_ROUTES: Routes = [
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot([...HOME_ROUTES, ...ERROR_ROUTES], { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
