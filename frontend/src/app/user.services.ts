import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    console.log(userData);
    return this.http.post('http://localhost:8000/api/login/', userData, {responseType: 'json'});
  }

  logoutUser(token): Observable<any>{
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
    });
    console.log(headers);
    return this.http.post('http://localhost:8000/api/logout/', null, {headers: headers});
  }

  registerUser(userData): Observable<any>{
    return
  }

  forgotPasswordUser(userData): Observable<any>{
    return
  }

}
