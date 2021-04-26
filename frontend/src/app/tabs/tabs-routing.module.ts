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
        path: 'profile-page',
        loadChildren: () => import('../profile-page/profile-page.module').then(m => m.ProfilePagePageModule)
      },
      {
        path: 'home-page',
        loadChildren: () => import('../main-page/main-page.module').then(m => m.MainPagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home-page',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home-page',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
