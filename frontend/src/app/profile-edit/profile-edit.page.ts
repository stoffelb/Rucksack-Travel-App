import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  constructor(private router: Router) {
    
  }

  ngOnInit() {
  }

  backToProfile() {
    //navigate to profile-page
    this.router.navigate(['/tabs/profile-page']);
  }

}
