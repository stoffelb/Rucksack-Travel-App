import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.services';

@Component({
  selector: 'app-other-profile',
  templateUrl: './other-profile.page.html',
  styleUrls: ['./other-profile.page.scss'],
  providers: [UserService]
})
export class OtherProfilePage implements OnInit {

  name: string;
  user: User;
  email: string;
  username: string;
  token: string = localStorage.getItem('sessionToken');

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private route: ActivatedRoute) {
  }

  ionViewWillEnter(){
    this.route.queryParamMap.subscribe((params: any) => {
      this.username = params.params.username;
      console.log(params);
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) =>  {
      this.username = params.params.username;
      console.log(params.params.username);
    });
    console.log("Username: " + this.username);
    // console.log(localStorage.getItem('sessionToken'));
    this.userService.getUserProfile(this.token,this.username).subscribe(
      data => {
        //Set the variables for userInfo and MyItineraries from the returned call
        var userInfo = data[0];
        var myItineraries = data[1];

        this.name = userInfo.name;
        // this.email = userInfo.email;

        console.log('Data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
    }

  goToOtherItineraries(){
    //navigate to profile-my-itineraries
    this.router.navigate(['/other-itineraries'], {queryParams: {"username": this.username}});

  }

  backToMainFeed(){
    this.router.navigate(['./tabs/home-page']);
  }


}
