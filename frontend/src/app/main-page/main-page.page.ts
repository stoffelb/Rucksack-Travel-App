import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { UserService } from '../user.services';
import { ItineraryObject } from '../ItineraryObject';
import {ApplyFilterEventService} from '../apply-filter-event.service'
import { createOfflineCompileUrlResolver } from '@angular/compiler';

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
  peopleItems = [];
  placesItems = [];
  titlesItems = [];
  items = [];
  filterOn: boolean;
  filters: {};

  // People, places, titles tabs
  private showPlacesTab = true;
  private showPlacesTabNoResults = false;
  private showPeopleTab = false;
  private showPeopleTabNoResults = false;
  private showTitlesTab = false;
  private showTitlesTabNoResults = false;
  private tabState;

  constructor(private http: HttpClient, private userService: UserService, private router: Router, private itineraryObject: ItineraryObject, private event: ApplyFilterEventService) {
  }

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

    this.tabState = "places"; // places tab is default
    this.updateTabDisplay();
  }

  ionViewWillEnter(){
    console.log(this.filters);
    this.getFilteredItineraryList(this.filters);
  }

  simpleSearch(simpSearch: string){
    console.log("Simple Search input: " + simpSearch);
    this.userService.simpleSearchList(simpSearch).subscribe(
      data => {
        console.log("DATA:", data);
        var searchedList;
        this.peopleItems = [];
        this.placesItems = [];
        this.titlesItems = [];

        
        // Assign people objects to array
        searchedList = data[0];
        for(var element in searchedList){
          console.log("pushing ",searchedList[element].username);
          this.peopleItems.push({
            name: searchedList[element].username
          });
        }

        // Assign titles objects to array
        searchedList = data[1];
        for(var element in searchedList){
          this.titlesItems.push({
            name: searchedList[element].title,
            duration_magnitude: searchedList[element].duration_magnitude,
            budget: searchedList[element].budget,
            location_tag: searchedList[element].location_tag,
            content: searchedList[element].description,
            transportation_tag: searchedList[element].transportation_tag,
            accommodation_tag: searchedList[element].accommodation_tag
          });
        }
        
        // Assign places objects to array
        searchedList = data[2];
        for(var element in searchedList){
          this.placesItems.push({
            name: searchedList[element].title,
            duration_magnitude: searchedList[element].duration_magnitude,
            budget: searchedList[element].budget,
            location_tag: searchedList[element].location_tag,
            content: searchedList[element].description,
            transportation_tag: searchedList[element].transportation_tag,
            accommodation_tag: searchedList[element].accommodation_tag
          });
        }
        this.updateTabDisplay();
      },
      error => {
        console.log("Error: " + error);
      }
    );
    
  }

  
  // Listens to segment (people,places,titles)
  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
    this.tabState = ev.detail.value;

    this.updateTabDisplay();
  }


  // Deals with showing the people/places/titles tabs
  updateTabDisplay(){
    if (this.tabState == "places") {
      if (this.placesItems.length == 0){
        this.showPlacesTabNoResults = true;
        this.showPlacesTab = false;
      } else {
        this.showPlacesTab = true;
        this.showPlacesTabNoResults = false;
      }
      this.showPeopleTab = false;
      this.showPeopleTabNoResults = false;
      this.showTitlesTab = false;
      this.showTitlesTabNoResults = false;
    } else if (this.tabState == "people") {
      this.showPlacesTab = false;
      this.showPlacesTabNoResults = false;
      if (this.peopleItems.length == 0){
        this.showPeopleTabNoResults = true;
        this.showPeopleTab = false;
      } else {
        this.showPeopleTab = true;
        this.showPeopleTabNoResults = false;
      }
      this.showTitlesTab = false;
      this.showTitlesTabNoResults = false;
    } else if (this.tabState == "titles") {
      this.showPlacesTab = false;
      this.showPlacesTabNoResults = false;
      this.showPeopleTab = false;
      this.showPeopleTabNoResults = false;
      if (this.titlesItems.length == 0){
        this.showTitlesTabNoResults = true;
        this.showTitlesTab = false;
      } else {
        this.showTitlesTab = true;
        this.showTitlesTabNoResults = false;
      }
    } else {
      console.log("Error: tabState not defined");
    }
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

  clearSearch(){
    console.log("clear search");
    // TODO: Return everything in db
  }
}
