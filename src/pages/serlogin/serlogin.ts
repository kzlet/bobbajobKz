import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SerregisterPage } from '../serregister/serregister';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvservicenamePage } from '../provservicename/provservicename';
import { ProvidertabPage } from '../providertab/providertab';

@Component({
  selector: 'page-serlogin',
  templateUrl: 'serlogin.html',
})
export class SerloginPage {

  password: any;
  email: any;
  apiUrl: any;
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SerloginPage');
  }

  reg()
  {
    this.navCtrl.push(SerregisterPage);
  }
  goto2()
  {
    this.navCtrl.push(ProvdashboardPage);
  }

  signIn() { 
    console.log("here");
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/custlogin.php?email=' + this.email + '&password=' + this.password;
    console.log(this.apiUrl)

     if (this.email === undefined || this.password === undefined) {
       let alert = this.alertCtrl.create({
         title: 'Sign-in Error',
         subTitle: 'Email and Password Required',
         buttons: ['OK']
       });
       alert.present();
       return;
     }
     let loader = this.loadingCtrl.create({
       content: "Signing In..."
     });
     loader.present();
 
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
 
       console.log(data);
       loader.dismissAll();

       var str = data.Status;

       if(data.is_active === '1' || data.is_active === 1)
       {

       if (str === 'success') {

        let alert = this.alertCtrl.create({
          title: 'Login Successful',
          subTitle: 'Welcome to BobbaJob',
          buttons: ['OK']
        });
        alert.present();      
        this.nativeStorage.setItem('provider_email', data.email)
        .then(
          () => console.log('Email Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('provider_name', data.name)
        .then(
          () => console.log('Name Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('profile_picture', data.profile_picture)
        .then(
          () => console.log('Name Stored!'),
          error => console.error('Error storing item', error)
        );

          this.navCtrl.push(ProvidertabPage);
       } else if (str === 'failed') {
         let alert = this.alertCtrl.create({
           title: 'Authentication Failed',
           subTitle: 'Email or Password is Invalid',
           buttons: ['OK']
         });
         alert.present();
       }
      }
      else if (data.is_active === '2' || data.is_active === 2)
      {
        let alert = this.alertCtrl.create({
          title: 'Profile In-complete',
          subTitle: 'Please complete your profile in order to continue, Thank You',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(ProvservicenamePage , {email : this.email});
      }

      else if (data.is_active === '3' || data.is_active === 3)
      {
        let alert = this.alertCtrl.create({
          title: 'Profile Request',
          subTitle: 'Your profile is currently under observation, Once complete you will be notified. Thank You',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(SerloginPage);
      }

      else if (data.is_active === '4' || data.is_active === 4)
      {
        let alert = this.alertCtrl.create({
          title: 'Profile Suspended',
          subTitle: 'Your profile is suspended due to voilation of our rules, Once we check every thing you will be notified. Thank You',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(SerloginPage);
      }
      else if (data.is_active === '5' || data.is_active === 5)
      {
        let alert = this.alertCtrl.create({
          title: 'Profile Deleted',
          subTitle: 'Your profile has been deleted due to some suspicious activities. Thank You',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(SerloginPage);
      }
      else
      {

      }

     }, error => {
       console.log(error); // Error getting the data
 
       let alert = this.alertCtrl.create({
         title: 'Network Failed',
         subTitle: 'Please try again later',
         buttons: ['OK']
 
       });
       alert.present();
       loader.dismissAll();
     });
   }


}
