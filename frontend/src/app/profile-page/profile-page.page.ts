import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../home/user';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
})
export class ProfilePagePage implements OnInit {

  name: string = "Erin Beachkofski";
  user: User;
  email: string = "erbeach527@gmail.com";
  username: string = "erin";

  constructor(private http: HttpClient) { 

    var url: string = 'http://localhost:8000/api/erin';
    
  }

  ngOnInit() {
  }

}
