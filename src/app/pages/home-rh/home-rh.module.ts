import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRHPageRoutingModule } from './home-rh-routing.module';

import { HomeRHPage } from './home-rh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRHPageRoutingModule
  ],
  declarations: [HomeRHPage]
})
export class HomeRHPageModule {}
