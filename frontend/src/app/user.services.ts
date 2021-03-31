import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItineraryObject } from './ItineraryObject';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){ }

  validateToken(){
    // var sessionKey;
    // this.http.post('http://localhost:8000/api/login/', {'username'}, {responseType: 'json'}).subscribe(
    //   response => {
    //     sessionKey = response;
    //     if(JSON.stringify(sessionKey) === localStorage.getItem('sessionKey')){
    //       console.log("Token is valid");
    //     }
    //     else{
    //       console.log("Token is invlaid");
    //     }
    //     console.log(sessionKey);
    //   },
    //   error => {
    //     console.log("Error validating token");
    //   }
    // );
    // console.log(sessionKey);

  }

  loginUser(userData): Observable<any>{
    return this.http.post('http://localhost:8000/api/login/', userData, {responseType: 'json'});
  }

  logoutUser(token): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    return this.http.post('http://localhost:8000/api/logout/', null, {headers: headers});
  }

  globalItineraryList(): Observable<any>{
    return this.http.get('http://localhost:8000/api/home_view/')
  }

  getUserProfile(token,username): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    return this.http.get('http://localhost:8000/api/' + username, {headers: headers});
  }

  createNewItinerary(token,title,location,budget,duration,accommodation,transportation,description): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    let itinerary = {
      'title': title,
      'budget': budget,
      'duration_magnitude': '0',
      'description': description,
      'transportation_tag': transportation,
      'location_tag': location,
      'accommodation_tag':accommodation,
    };

    return this.http.post('http://localhost:8000/api/create_itinerary/', itinerary , {headers: headers});
  }

  registerUser(userData): Observable<any>{
    return this.http.post('http://localhost:8000/api/user_create/' + userData.user.username, userData);
  }

  forgotPasswordUser(userData): Observable<any>{
    return
  }

}
