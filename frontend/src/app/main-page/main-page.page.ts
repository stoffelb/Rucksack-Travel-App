import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../user.services';
import { ItineraryObject } from '../ItineraryObject';


const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService, ItineraryObject],
})
export class MainPagePage implements OnInit {
  items = [];
  httpListener;

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: ItineraryObject) {

  }

  ngOnInit() {
    this.getItineraryCards();
    this.userService.validateToken();
  }

  ionViewWillEnter(){
    this.getItineraryCards();
  }


  getItineraryCards(){
    this.httpListener = this.userService.globalItineraryList().subscribe(
      data => {
        this.items = [];
        console.log("before:" + this.items);
        //Loop through response data and set push each itinerary into the items list
        for(var element in data){
          console.log(data[element]);
          this.items.push({
            name: data[element].title,
            duration_magnitude: data[element].duration_magnitude,
            budget: data[element].budget,
            location_tag: data[element].location_tag,
            content: data[element].description,
            transportation_tag: data[element].transportation_tag,
            accommodation_tag: data[element].accommodation_tag
          });
        }
        // this.items = Object.keys(data).map(key => data[key]);
        console.log("after:" + this.items);
      },
      error => {
        console.log('Error loading global data' + error);
      })
  }


  doRefresh(event) {    
    this.httpListener.unsubscribe();
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete()
      this.getItineraryCards();
    }, 2000);
  }

}
