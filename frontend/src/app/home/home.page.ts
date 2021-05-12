import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { UserService } from '../user.services';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [UserService]
})
export class HomePage {
  user_name;
  user_password;

  constructor(private http: HttpClient, private userService: UserService, private router: Router, public alertController: AlertController) {}
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
      console.log(localStorage.getItem('sessionToken'));

      //call to user service login method
      this.userService.loginUser(data).subscribe(
        response => {
          //Get the token from the post response
          var key = response.token;

          //Need to encrypt the token before storing it in local storage (Come back to later)
          localStorage.setItem('sessionToken', key);
          localStorage.setItem('username', data.username);

          //navigate to main-page
          this.router.navigate(['/tabs']);

        },
        error => {
          this.presentLoginAlert();
          console.log('Error logging in', error, data);
        }
      );

    }else{
      this.presentLoginAlert();
      console.log("Please fill out both Username and Password fields!")
    }
  }

  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Login Error',
      subHeader: 'Incorrect username/password.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
