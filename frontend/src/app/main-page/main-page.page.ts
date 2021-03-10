import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/User';
import { UserService } from '../user.services';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService]
})
export class MainPagePage implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    for (let i = 0; i < 1000; i++) {
      this.items.push({
        name: "Test Itinerary",
        duration: Math.floor(Math.random() * 30 + 1),
        budget: Math.floor(Math.random() * 10000 + 100),
        content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100)
      });
    }
  }

  ngOnInit() {
    this.userService.logoutUser(localStorage.getItem('sessionToken')).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log("Error logging out");
      }
    );
    console.log(localStorage.getItem('sessionToken'));

    this.userService.validateToken();
  }

}
