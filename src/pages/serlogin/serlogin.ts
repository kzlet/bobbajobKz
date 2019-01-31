import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { SerregisterPage } from '../serregister/serregister';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvservicenamePage } from '../provservicename/provservicename';
import { ProvidertabPage } from '../providertab/providertab';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-serlogin',
  templateUrl: 'serlogin.html',
})
export class SerloginPage {

  password: any;
  email: any;
  apiUrl: any;
  codes: any[];
  lat: number;
  long: number;
  constructor(public platform : Platform , private nativeGeocoder: NativeGeocoder, private geo : Geolocation, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SerloginPage');
    this.currentco();
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

   currentco(){
    //Getting Data When Signup!
    this.platform.ready().then(() => {
      
              var options = {
                timeout : 10000
              };
              this.geo.getCurrentPosition(options).then(resp =>{
               console.log(resp.coords.latitude);
               console.log(resp.coords.longitude);

               this.lat = resp.coords.latitude;
               this.long = resp.coords.longitude;

               var drop_value = '1';
               this.nativeStorage.setItem('got_values', drop_value)
               .then(
                 () => console.log('Drop value 1'),
                 error => console.error('Error storing item', error)
               );

               this.nativeStorage.setItem('user_lat', resp.coords.latitude)
               .then(
                 () => console.log('User lat Stored!'),
                 error => console.error('Error storing item', error)
               );

               this.nativeStorage.setItem('user_long', resp.coords.longitude)
               .then(
                 () => console.log('User long Stored!'),
                 error => console.error('Error storing item', error)
               );


               this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
               .then((result: NativeGeocoderReverseResult[]) =>{

                this.codes = result;

                console.log(this.codes);
              
                console.log(JSON.stringify(this.codes));

                }
              )
               
               .catch((error: any) => console.log(error));
            
              }).catch(()=>{
               console.log("Error to get location");

               var drop_value = '0';
               this.nativeStorage.setItem('got_values', drop_value)
               .then(
                 () => console.log('Drop value 0'),
                 error => console.error('Error storing item', error)
               );

              });
              });
}

}
