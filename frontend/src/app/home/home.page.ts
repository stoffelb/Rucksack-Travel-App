import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router){}

  user_name;
  user_password;

  //Function what will call Django database and verify that a user exsists
  loginClick(){
    alert(`Your Username is: ${this.user_name}`)
  }

  //function to go to register page
  go_register(){
    this.router.navigate(['user-register'])
  }

  //function to go to forgot password page
  go_forgotPassword(){
    this.router.navigate(['user-forgot-password'])
  }

}
