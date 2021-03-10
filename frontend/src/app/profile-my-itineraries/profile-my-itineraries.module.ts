import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMyItinerariesPageRoutingModule } from './profile-my-itineraries-routing.module';

import { ProfileMyItinerariesPage } from './profile-my-itineraries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMyItinerariesPageRoutingModule
  ],
  declarations: [ProfileMyItinerariesPage]
})
export class ProfileMyItinerariesPageModule {}
