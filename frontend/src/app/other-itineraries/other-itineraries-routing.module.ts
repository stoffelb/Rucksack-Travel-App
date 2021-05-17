import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherItinerariesPage } from './other-itineraries.page';

const routes: Routes = [
  {
    path: '',
    component: OtherItinerariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherItinerariesPageRoutingModule {}
