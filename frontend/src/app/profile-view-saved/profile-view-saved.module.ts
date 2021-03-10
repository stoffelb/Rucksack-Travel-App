import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileViewSavedPageRoutingModule } from './profile-view-saved-routing.module';

import { ProfileViewSavedPage } from './profile-view-saved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileViewSavedPageRoutingModule
  ],
  declarations: [ProfileViewSavedPage]
})
export class ProfileViewSavedPageModule {}
