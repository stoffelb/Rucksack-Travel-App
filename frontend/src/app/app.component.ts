import { PathLocationStrategy } from '@angular/common';
import { Component, } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import {ApplyFilterEventService} from './apply-filter-event.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  location: string = null;
  budget: string = null;
  transportation: string = null;
  accommodation: string = null;
  duration: string = null;
  params: any;
  foo: any;
  formattedAddress = null;
  event: ApplyFilterEventService;

  constructor(private router: Router, public navCtrl: NavController, event: ApplyFilterEventService, private menu: MenuController) {
    this.event = event;
  }

  public handleAddressChange(address: any) {
    this.location = address.formatted_address;
  }

  applyFilter(){

    this.closeFilter();

    console.log("apply filter button clicked");

    this.params = {
      "location": this.location,
      "budget": this.budget,
      "transportation": this.transportation,
      "accommodation": this.accommodation,
      "duration": this.duration
    }

    this.event.publishSomeData(this.params);
  }

  clearFilter(){
    this.closeFilter();

    console.log("apply filter button clicked");

    this.location = null;
    this.budget = null;
    this.transportation = null;
    this.accommodation = null;
    this.duration = null;

    this.params = {
      "location": null,
      "budget": null,
      "transportation": null,
      "accommodation": null,
      "duration": null
    }

    this.event.publishSomeData(this.params);
  }

  closeFilter() {
    this.menu.close('filter-menu');
  }
}
