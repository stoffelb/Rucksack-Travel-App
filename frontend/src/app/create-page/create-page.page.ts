import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { MapboxServiceService, Feature} from './mapbox-service.service';
=======
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/user';
import { Router } from '@angular/router';
import { UserService } from '../user.services';
>>>>>>> aa39a841ed1d661103a12653ed2da7f63a75208b

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.page.html',
  styleUrls: ['./create-page.page.scss'],
  providers: [UserService]
})
<<<<<<< HEAD
export class CreatePagePage {

  constructor(private mapboxService: MapboxServiceService) { }
=======
export class CreatePagePage implements OnInit {
  title: string;
  location: string;
  budget: number;
  transportation: string;
  accommodation: string;
  description: string;
  username: string = localStorage.getItem('username');
  token: string = localStorage.getItem('sessionToken');
  duration: string;


  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }
>>>>>>> aa39a841ed1d661103a12653ed2da7f63a75208b

  addresses: string[] = [];
  selectedAddress = null;

  search(event: any){
    const searchTerm = event.target.value.toLowerCase();
    if(searchTerm && searchTerm.length > 0){
      this.mapboxService
      .search_word(searchTerm)
      .subscribe((features: Feature[]) => {
        this.addresses = features.map(feat => feat.place_name);
      });
    }else {
      this.addresses = [];
    }
  }

  onSelect(address: string){
    this.selectedAddress = address;
    this.addresses = [];
  }

  onSaveItinerary(){
    this.userService.createNewItinerary(this.token,this.title,this.location,this.budget,this.duration,this.accommodation,this.transportation,this.description).subscribe(
      data => {
        this.router.navigate(['./tabs/home-page']);
        console.log('data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    )
  }

}
