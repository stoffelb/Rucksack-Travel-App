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

    if(this.first_name && this.last_name && this.email && this.user_name && this.user_password && this.user_password_confirm){
      if(this.user_password === this.user_password_confirm){

        //START HTTP REQUEST HERE TO ADD USER TO DJANGO DATABASE

      }else{
        alert("Please make sure passwords match")
      }
    }else{
      if(!this.first_name){
        alert("First Name is missing");
      }
      else if(!this.last_name){
        alert("Last Name is missing");
      }
      else if(!this.email){
        alert("Email is missing");
      }
      else if(!this.user_name){
        alert("Username is missing");
      }
      else if(!this.user_password){
        alert("Password is missing");
      }
      else if(!this.user_password_confirm){
        alert("Confirm password is missing");
      }
      else{
        alert("Make sure you have filled out all fields");
      }
    }
  }
}
