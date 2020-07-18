import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegAsistenciaPageRoutingModule } from './reg-asistencia-routing.module';

import { RegAsistenciaPage } from './reg-asistencia.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegAsistenciaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegAsistenciaPage]
})
export class RegAsistenciaPageModule {}
