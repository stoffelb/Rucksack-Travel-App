import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../home/user';
import { UserService } from '../user.services';

@Component({
  selector: 'app-profile-my-itineraries',
  templateUrl: './profile-my-itineraries.page.html',
  styleUrls: ['./profile-my-itineraries.page.scss'],
  providers: [UserService]
})
export class ProfileMyItinerariesPage implements OnInit {
  items:any[] = [];

  username: string = localStorage.getItem('username');
  token: string = localStorage.getItem('sessionToken');

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserProfile(this.token,this.username).subscribe(
      data => {
        //Set the variables for userInfo and MyItineraries from the returned call
        var userInfo = data[0];
        var myItineraries = data[1];

        console.log(myItineraries);
        for(var element in myItineraries){
          console.log(myItineraries[element]);
          this.items.push({
            name: myItineraries[element].title,
            duration_magnitude: myItineraries[element].duration_magnitude,
            budget: myItineraries[element].budget,
            location_tag: myItineraries[element].location_tag,
            content: myItineraries[element].description,
            transportation_tag: myItineraries[element].transportation_tag,
            accommodation_tag: myItineraries[element].accommodation_tag
          });
        }

        console.log('Data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }

  backToProfile() {
    //navigate to profile-page
    this.router.navigate(['/tabs/profile-page']);
  }

}
