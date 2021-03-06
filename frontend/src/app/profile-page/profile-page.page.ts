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

  name: string;
  user: User;
  email: string;
  username: string;
  token: string = localStorage.getItem('sessionToken');

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    console.log("Username: ", localStorage.getItem('username'));
    this.username = localStorage.getItem('username');
    var url: string = 'http://localhost:8000/api/' + this.username;
  }

  ionViewWillEnter(){
    this.username = localStorage.getItem('username');
  }

  ngOnInit() {
    console.log(localStorage.getItem('sessionToken'));
    this.userService.getUserProfile(this.token,this.username).subscribe(
      data => {
        console.log("USER DATA:", data);
        //Set the variables for userInfo and MyItineraries from the returned call
        var userInfo = data[0];
        var myItineraries = data[1];
        console.log('Data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
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
    this.userService.logoutUser(token).subscribe(
      data => {
        console.log('User logged out ' + data);
        localStorage.clear();
        console.log("Local storage cleared");
      },
      error => {
        console.log('Error: ' + error)
      }
    );
    //navigate to main-page
    this.router.navigate(['/home']);
  }

}
