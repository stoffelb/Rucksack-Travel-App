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

  location: string;
  budget: string;
  transportation: string;
  accommodation: string;
  duration: string;
  params: any;
  foo: any;
  formattedAddress = '';
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
      "filter_location": this.location,
      "filter_budget": this.budget,
      "filter_transportation": this.transportation,
      "filter_accommodation": this.accommodation,
      "filter_duration": this.duration
    }

    this.event.publishSomeData(this.params);
  }

  closeFilter() {
    this.menu.close('filter-menu');
  }
}
