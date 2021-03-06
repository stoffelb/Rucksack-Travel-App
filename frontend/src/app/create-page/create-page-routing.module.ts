import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePagePage } from './create-page.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePagePageRoutingModule {}
