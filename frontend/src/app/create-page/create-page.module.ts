import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePagePageRoutingModule } from './create-page-routing.module';

import { CreatePagePage } from './create-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePagePageRoutingModule
  ],
  declarations: [CreatePagePage]
})
export class CreatePagePageModule {}
