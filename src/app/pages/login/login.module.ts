import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from '../../components/components.module';
import { RecuperarPasswordPage } from '../recuperar-password/recuperar-password.page';
import { RecuperarPasswordPageModule } from '../recuperar-password/recuperar-password.module';

@NgModule({
  entryComponents: [
    RecuperarPasswordPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    RecuperarPasswordPageModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
