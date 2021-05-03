import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.services';
import { User } from '../home/user';

@Component({
  selector: 'app-user-forgot-password',
  templateUrl: './user-forgot-password.page.html',
  styleUrls: ['./user-forgot-password.page.scss'],
  providers: [UserService]
})
export class UserForgotPasswordPage implements OnInit {

  constructor(private userService: UserService) { }

  hideSendCode = false;
  hideEnterCode = true;
  hideResetPassword = true;


  user_password = '1234';

  username: string = localStorage.getItem('username');

  data: User = {
      username: this.username,
      password: this.user_password,
  };

  ngOnInit() {
  }

  sendCode(){
    this.hideSendCode = true;
    this.hideEnterCode = false;
  }

  resendCode(){
    this.hideEnterCode = true;
    this.hideSendCode = false;
  }

  submitCode(){
    this.hideEnterCode = true;
    this.hideResetPassword = false;
  }

  resetPassword(newPassword){
    console.log(newPassword);
    this.userService.forgotPasswordUser(newPassword).subscribe(
      data => {
        console.log("Data: " + data);

      },
      error => {
        console.log("Error: " + error);
      }
    );
    this.userService.loginUser(this.data).subscribe(
      data => {
        //Set the variables for userInfo and MyItineraries from the returned call

        console.log('Data: ' + data);
      },
      error => {
        console.log('Error: ' + error);
      }
    );
  }
}
