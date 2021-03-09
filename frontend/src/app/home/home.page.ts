import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user_name;
  user_password;

  constructor(private http: HttpClient) {}
  //function to go to register page

  loginClick() {

    if(this.user_name && this.user_password){

    const data: User = {
      username: this.user_name,
      password: this.user_password,
    };

    const headers: HttpHeaders = new HttpHeaders({
      username: data.username,
      'content-type': 'application/json',
    });

    let params = new HttpParams();

    const options = {
      headers: headers,
      params: params,
    };

    this.http.get('http://localhost:8000/api/get_user/' + this.user_name).subscribe(
      response => {
        alert();
      }
    )

  }else{
    console.log("Please fill out both Username and Password fields!")
  }
}
}
