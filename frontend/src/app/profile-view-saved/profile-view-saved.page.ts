import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-view-saved',
  templateUrl: './profile-view-saved.page.html',
  styleUrls: ['./profile-view-saved.page.scss'],
})
export class ProfileViewSavedPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToProfile() {
    //navigate to profile-page
    this.router.navigate(['/tabs/profile-page']);
  }

}
