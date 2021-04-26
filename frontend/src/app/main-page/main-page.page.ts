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
  location: string = null;
  budget: string = null;
  transportation: string = null;
  accommodation: string = null;
  duration: string = null;
  hideSearchOpts = true;
  items = [];
  filterOn: boolean;
  filters: {};
  profileSearch = false;
  titleSearch = false;
  hideProfileList = true;
  hideTitleList =  false;


  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: ItineraryObject, private event: ApplyFilterEventService) {}

  ngOnInit() {
    this.filters = {
      "location": this.location,
      "budget": this.budget,
      "transportation": this.transportation,
      "accommodation": this.accommodation,
      "duration": this.duration
    };
    console.log(this.filters);
    this.getFilteredItineraryList(this.filters);

    // Listening for apply filter event
    this.event.getObservable().subscribe((data) => {
      this.applyFilter(data);
    })
  }

  ionViewWillEnter(){
    console.log(this.filters);
    this.getFilteredItineraryList(this.filters);
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
      this.getFilteredItineraryList(this.filters);
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

    //Display the list of users if there is an @ sign and if not display itinerary list
    simpleSearch(simpSearch: string){
      console.log("Simple Search input: " + simpSearch);
      this.userService.simpleSearchList(simpSearch).subscribe(
        data => {
          console.log(data);
          console.log(data[1]);
          var searchedList;
          this.items = [];

          if(this.profileSearch){
            searchedList = data[0];
            for(var element in searchedList){
              this.items.push({
                name: searchedList[element].username
              });
            }
          }
          else if(this.titleSearch){
            searchedList = data[1];
            for(var element in searchedList){
              this.items.push({
                name: searchedList[element].title,
                duration_magnitude: searchedList[element].duration_magnitude,
                budget: searchedList[element].budget,
                location_tag: searchedList[element].location_tag,
                content: searchedList[element].description,
                transportation_tag: searchedList[element].transportation_tag,
                accommodation_tag: searchedList[element].accommodation_tag
              });
            }
          }
        },
        error => {
          console.log("Error: " + error);
        }
      );
    }

    displaySearchOptions(event){
      // var elements = document.getElementsByClassName("searchOpt");
      this.hideSearchOpts = false;
    }

    clearSearch(event){
      this.hideSearchOpts = true;
      this.hideProfileList = true;
      this.getFilteredItineraryList(this.filters);
    }

    displayProfileList(){

      this.hideProfileList = false;
      this.profileSearch = true;
      this.hideTitleList = true;
      this.titleSearch = false;

    }

    displayTitleList(){

      this.hideTitleList = false;
      this.titleSearch = true;
      this.hideProfileList = true;
      this.profileSearch = false;
    }
}
