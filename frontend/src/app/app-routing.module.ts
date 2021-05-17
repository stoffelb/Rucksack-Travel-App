import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user-register',
    loadChildren: () => import('./user-register/user-register.module').then( m => m.UserRegisterPageModule)
  },
  {
    path: 'user-forgot-password',
    loadChildren: () => import('./user-forgot-password/user-forgot-password.module').then( m => m.UserForgotPasswordPageModule)
  },
  {
    path: 'profile-view-saved',
    loadChildren: () => import('./profile-view-saved/profile-view-saved.module').then( m => m.ProfileViewSavedPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
  },
  {
    path: 'profile-my-itineraries',
    loadChildren: () => import('./profile-my-itineraries/profile-my-itineraries.module').then( m => m.ProfileMyItinerariesPageModule)
  },
  {
    path: 'other-profile',
    loadChildren: () => import('./other-profile/other-profile.module').then( m => m.OtherProfilePageModule)
  },
  {
    path: 'other-itineraries',
    loadChildren: () => import('./other-itineraries/other-itineraries.module').then( m => m.OtherItinerariesPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
