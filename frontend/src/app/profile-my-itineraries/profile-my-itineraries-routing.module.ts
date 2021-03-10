import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileMyItinerariesPage } from './profile-my-itineraries.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMyItinerariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMyItinerariesPageRoutingModule {}
