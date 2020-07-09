import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonInfoComponent } from './boton-info/boton-info.component';
import { IonicModule } from '@ionic/angular';
import { HeaderGeneralComponent } from './header-general/header-general.component';



@NgModule({
  declarations: [
    BotonInfoComponent,
    HeaderGeneralComponent
  ], 
  exports: [
    BotonInfoComponent,
    HeaderGeneralComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
