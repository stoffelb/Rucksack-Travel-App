import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../user.services';
import { ItineraryObject } from '../ItineraryObject';
import {ApplyFilterEventService} from '../apply-filter-event.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
  providers: [UserService, ItineraryObject],
})
export class MainPagePage implements OnInit {
  items = [];
  filterOn: boolean;
  filters: {};

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: ItineraryObject, private event: ApplyFilterEventService) {}

  ngOnInit() {
    this.getItineraryList();
    this.userService.validateToken();

    // Listening for apply filter event
    this.event.getObservable().subscribe((data) => {
      this.applyFilter(data);
    })
  }

  ionViewWillEnter(){
    this.getItineraryList();

  }

  getItineraryList(){
    this.userService.globalItineraryList().subscribe(
      data => {
        this.items = [];
        //Loop through response data and set push each itinerary into the items list
        for(var element in data){
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
        // this.items = Object.keys(data).map(key => data[key])
      });
  }

  getFilteredItineraryList(filters){
    console.log(filters);
    this.userService.filteredItineraryList(filters).subscribe(
      data => {
        this.items = [];
        for(var element in data){
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
        // this.items = Object.keys(data).map(key => data[key])
      },
      error => {
        console.log("Error: " + error);
      }
    );
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      if(this.filterOn){
        this.getFilteredItineraryList(this.filters);
      }
      else{
        this.getItineraryList();
      }
      console.log(this.items)
    }, 2000);
  }

  // Use data sent in from app.component.ts (the filter) to filter data
  applyFilter(data){
    console.log("Filtering data with the following filters: ");
    this.filters = data;
    this.filterOn = true;
    this.getFilteredItineraryList(this.filters);
    console.log(data);
  }


}
