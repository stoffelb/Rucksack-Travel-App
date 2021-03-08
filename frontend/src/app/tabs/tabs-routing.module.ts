import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'create-page',
        loadChildren: () => import('../create-page/create-page.module').then(m => m.CreatePagePageModule)
      },
      {
        path: 'explore-page',
        loadChildren: () => import('../explore-page/explore-page.module').then(m => m.ExplorePagePageModule)
      },
      {
        path: 'profile-page',
        loadChildren: () => import('../profile-page/profile-page.module').then(m => m.ProfilePagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/profile-page',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/profile-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
