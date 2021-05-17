import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItineraryObject } from './ItineraryObject';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){ }

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

  getUserProfile(token,username): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    return this.http.get('http://localhost:8000/api/' + username, {headers: headers});
  }

  createNewItinerary(token,username,title,location,budget,duration,accommodation,transportation,description): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    let itinerary = {
      'username': username,
      'title': title,
      'budget': budget,
      'duration_magnitude': duration,
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

  forgotPasswordUser(password): Observable<any>{
    var username = localStorage.getItem('username');
    return this.http.put('http://localhost:8000/api/update_password/' + username, password)
  }

  filteredItineraryList(filters): Observable<any>{
    let filterList = {
      'budget': filters.budget,
      'duration': filters.duration,
      'transportation': filters.transportation,
      'location': filters.location,
      'accommodation': filters.accommodation,
    };
    return this.http.post('http://localhost:8000/api/filter_view/', filterList);
  }

  simpleSearchList(searchValue): Observable<any>{
    return this.http.get("http://localhost:8000/api/quick_search/" + searchValue);
  }

}
