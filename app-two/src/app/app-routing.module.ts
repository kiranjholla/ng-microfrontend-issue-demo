import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyComponent } from './components/empty/empty.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { HarryPotterComponent } from './modules/harry-potter/harry-potter.component';
import { StarWarsComponent } from './modules/star-wars/star-wars.component';

const routes: Routes = [
  {
    path: 'two',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'star', component: StarWarsComponent },
      { path: 'harry', component: HarryPotterComponent }
    ]
  },
  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
