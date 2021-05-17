import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherItinerariesPageRoutingModule } from './other-itineraries-routing.module';

import { OtherItinerariesPage } from './other-itineraries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherItinerariesPageRoutingModule
  ],
  declarations: [OtherItinerariesPage]
})
export class OtherItinerariesPageModule {}
