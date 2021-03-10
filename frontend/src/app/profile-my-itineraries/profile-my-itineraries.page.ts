import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-my-itineraries',
  templateUrl: './profile-my-itineraries.page.html',
  styleUrls: ['./profile-my-itineraries.page.scss'],
})
export class ProfileMyItinerariesPage implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  backToProfile() {
    //navigate to profile-page
    this.router.navigate(['/tabs/profile-page']);
  }

}
