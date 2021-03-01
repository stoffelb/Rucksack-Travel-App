import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserForgotPasswordPageRoutingModule } from './user-forgot-password-routing.module';

import { UserForgotPasswordPage } from './user-forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserForgotPasswordPageRoutingModule
  ],
  declarations: [UserForgotPasswordPage]
})
export class UserForgotPasswordPageModule {}
