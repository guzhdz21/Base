import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRHPage } from './home-rh.page';

const routes: Routes = [
  {
    path: '',
    component: HomeRHPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRHPageRoutingModule {}
