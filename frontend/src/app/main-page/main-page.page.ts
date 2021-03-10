import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { User } from '../home/User';
import { UserService } from '../user.services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {KeyValuePipe } from '@angular/common';
import { itineraryObject } from '../itineraryObject';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService, itineraryObject],
})
export class MainPagePage implements OnInit {
  items: any[] = [];

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: itineraryObject) {





    // for (let i = 0; i < 1000; i++) {
    //   this.items.push({
    //     name: "Test Itinerary",
    //     duration: Math.floor(Math.random() * 30 + 1),
    //     budget: Math.floor(Math.random() * 10000 + 100),
    //     content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100)
    //   });
    // }
  }

  ngOnInit() {
    this.userService.globalItineraryList().pipe(map(item => Object.assign(new itineraryObject(), Object.values(item)))).subscribe(
      data => {
        console.log(data);
        for(var i of data){
        this.items.push({
          // name: i.title,
          // duration: i.duration_magnitude,
          // budget: i.budget,
          // content: i.description
      });
    }
      },
      error => {
        console.log('Error loading global data' + error);
      }
    );

    this.userService.validateToken();
  }

}
