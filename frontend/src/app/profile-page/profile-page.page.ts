import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/user';
import { Router } from '@angular/router';
import { UserService } from '../user.services';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  providers: [UserService]
})
export class ProfilePagePage implements OnInit {

  name: string = "Erin Beachkofski";
  user: User;
  email: string = "erbeach527@gmail.com";
  username: string = localStorage.getItem('username');

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {

    var url: string = 'http://localhost:8000/api/' + localStorage.getItem('username');

  }

  ngOnInit() {
    console.log(this.username);
    this.userService.getUserProfile(this.username).subscribe(
      data => {
        console.log('Data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    )
  }

  goToMyItineraries(){
    //navigate to profile-my-itineraries
    this.router.navigate(['/profile-my-itineraries']);
  }

  goToEditProfile() {
    //navigate to profile-edit
    this.router.navigate(['/profile-edit']);
  }

  goToViewSaved() {
    //navigate to profile-edit
    this.router.navigate(['/profile-view-saved']);
  }

  logoutClick() {
    // TODO: backend logout stuff
    var token = localStorage.getItem('sessionToken');
    console.log(token);
    this.userService.logoutUser(token);
    //navigate to main-page
    this.router.navigate(['/home']);
  }

}
