import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeGuardiaPageRoutingModule } from './home-guardia-routing.module';

import { HomeGuardiaPage } from './home-guardia.page';
import { ComponentsModule } from '../../components/components.module';
import { RegAsistenciaPageModule } from '../reg-asistencia/reg-asistencia.module';
import { RegAsistenciaPage } from '../reg-asistencia/reg-asistencia.page';

@NgModule({
  entryComponents: [
    RegAsistenciaPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeGuardiaPageRoutingModule,
    ComponentsModule,
    RegAsistenciaPageModule
  ],
  declarations: [HomeGuardiaPage]
})
export class HomeGuardiaPageModule {}
