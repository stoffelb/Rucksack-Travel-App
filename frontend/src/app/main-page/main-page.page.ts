import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../user.services';
import { Observable } from 'rxjs';
import { ItineraryObject } from '../ItineraryObject';
import { Key } from 'selenium-webdriver';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService, ItineraryObject],
})
export class MainPagePage implements OnInit {
  items: ItineraryObject[] = [];
  its: any[]=[];

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: ItineraryObject) {

  }

  ngOnInit() {
    this.userService.globalItineraryList().subscribe(
      data => {

        //when back end fixes how they send itineraries
        // this.items = data;
        //Then we can iterate items like normal

        this.items = Object.keys(data).map(key => data[key]);



      },
      error => {
        console.log('Error loading global data' + error);
      }
    );

    this.userService.validateToken();
  }

}
