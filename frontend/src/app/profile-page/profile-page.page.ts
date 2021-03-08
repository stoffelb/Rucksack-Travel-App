import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {

  firstName = "First";
  lastName = "Last";
  username = "@firstname";
  email = "email@gmail.com";

  constructor() { 

  }

  ngOnInit() {
  }

}
