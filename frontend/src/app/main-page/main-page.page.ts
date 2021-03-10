import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { User } from './user';
import { UserService } from '../user.services';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService]
})
export class MainPagePage implements OnInit {

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

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
