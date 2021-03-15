import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/user';
import { Router } from '@angular/router';
import { UserService } from '../user.services';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.page.html',
  styleUrls: ['./create-page.page.scss'],
  providers: [UserService]
})
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

  ngOnInit() {
  }

  onSaveItinerary(){
    this.userService.createNewItinerary(this.token,this.title,this.location,this.budget,this.duration,this.accommodation,this.transportation,this.description).subscribe(
      data => {
        console.log('data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    )
  }

}
