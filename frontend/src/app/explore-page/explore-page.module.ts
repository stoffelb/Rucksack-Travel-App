import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorePagePageRoutingModule } from './explore-page-routing.module';

import { ExplorePagePage } from './explore-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePagePageRoutingModule
  ],
  declarations: [ExplorePagePage]
})
export class ExplorePagePageModule {}
