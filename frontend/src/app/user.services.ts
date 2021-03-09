import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient){ }

  loginUser(userData): Observable<any>{
    return this.http.get('http://localhost:8000/api/get_user/', userData);
  }

  registerUser(userData): Observable<any>{
    return
  }

  forgotPasswordUser(userData): Observable<any>{
    return
  }

}
