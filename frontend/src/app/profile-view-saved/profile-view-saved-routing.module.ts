import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileViewSavedPage } from './profile-view-saved.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileViewSavedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileViewSavedPageRoutingModule {}
