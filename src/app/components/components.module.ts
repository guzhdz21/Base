import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotonInfoComponent } from './boton-info/boton-info.component';
import { IonicModule } from '@ionic/angular';
import { HeaderGeneralComponent } from './header-general/header-general.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderModalComponent } from './header-modal/header-modal.component';



@NgModule({
  declarations: [
    BotonInfoComponent,
    HeaderGeneralComponent,
    HeaderMenuComponent,
    MenuComponent,
    HeaderModalComponent
  ], 
  exports: [
    BotonInfoComponent,
    HeaderGeneralComponent,
    HeaderMenuComponent,
    MenuComponent,
    HeaderModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
