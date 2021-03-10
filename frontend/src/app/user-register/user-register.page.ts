import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from '../user.services';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.page.html',
  styleUrls: ['./user-register.page.scss'],
  providers: [UserService]
})
export class UserRegisterPage implements OnInit {

  first_name;
  last_name;
  email;
  user_name;
  user_password;
  user_password_confirm

  constructor(private http: HttpClient, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerClick(){

    if(this.user_password === this.user_password_confirm){
      //Do the register stuff
    }else{
      alert("Please make sure passwords match")
    }

    if(this.first_name && this.last_name && this.email && this.user_name && this.user_password && this.user_password_confirm){
      //All fields have data
    }else{
      alert("Missing input in fields")
    }

  }

}
