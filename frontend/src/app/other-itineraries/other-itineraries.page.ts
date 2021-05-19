import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../home/user';
import { UserService } from '../user.services';

@Component({
  selector: 'app-other-itineraries',
  templateUrl: './other-itineraries.page.html',
  styleUrls: ['./other-itineraries.page.scss'],
  providers: [UserService]
})
export class OtherItinerariesPage implements OnInit {
  items:any[] = [];
  public showOtherItineraries = true;
  username: string;
  token: string = localStorage.getItem('sessionToken');

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.username = params.params.username;
      console.log(params);
    });
    this.getMyItineraryList();
  }

  ionViewWillEnter(){
    this.route.queryParamMap.subscribe((params: any) => {
      this.username = params.params.username;
      console.log(params);
    });
    this.getMyItineraryList();
  }

  getMyItineraryList(){
    this.userService.getUserProfile(this.token,this.username).subscribe(
      data => {
        this.items = [];
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

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.getMyItineraryList();
      console.log(this.items)
    }, 2000);
  }

  backToProfile() {
    //navigate to profile-page
    this.router.navigate(['/other-profile'], {queryParams: {"username": this.username}});
  }

}
