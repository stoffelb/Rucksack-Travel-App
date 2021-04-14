import { Component, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  location: string;

  constructor() {}

  public handleAddressChange(address: any) {
    this.location = address.formatted_address;
  }

  applyFilter(){
    // TODO: connect filter values to backend
    console.log("apply filter button clicked");
  }
}
