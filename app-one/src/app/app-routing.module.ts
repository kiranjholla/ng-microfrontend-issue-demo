import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyComponent } from './components/empty/empty.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NCISComponent } from './modules/ncis/ncis.component';
import { WestWingComponent } from './modules/west-wing/west-wing.component';

const routes: Routes = [
  {
    path: 'one',
    component: LandingComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'ncis', component: NCISComponent },
      { path: 'west-wing', component: WestWingComponent }
    ]
  },
  { path: '**', component: EmptyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
