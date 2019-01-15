import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events, Platform } from 'ionic-angular';
import { UserregisterPage } from '../userregister/userregister';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-userlogin',
  templateUrl: 'userlogin.html',
})
export class UserloginPage {

  isLoggedIn: boolean;
  imageUrl: any;
  userId: any;
  givenName: any;
  familyName: any;
  displayName: any;
  userData: { email: any; first_name: any; picture: any; username: any; };
  password: string;
  email: string;
  apiUrl: string;
  codes: NativeGeocoderReverseResult[];
  lat: number;
  long: number;
  constructor(private nativeGeocoder: NativeGeocoder, private geo : Geolocation, public platform : Platform ,public events : Events, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserloginPage');
    this.currentco();
  }

  reg()
  {
    this.navCtrl.push(UserregisterPage);
  }
  
  goto2()
  {
    this.navCtrl.push(HomePage);
  }

  direct()
  {
    let alert = this.alertCtrl.create({
      title: 'Successfully logged in as Guest',
      subTitle: 'Welcome to InTechCall',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(HomePage);
  }

  // signIn()
  // {
  //   this.navCtrl.setRoot(HomePage);
  // }

  signIn() { 
    
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/userlogin.php?email=' + this.email + '&password=' + this.password;
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

       if (str === 'success') {

        let alert = this.alertCtrl.create({
          title: 'Login Successful',
          subTitle: 'Welcome to BobbaJob',
          buttons: ['OK']
        });
        alert.present();

        this.nativeStorage.setItem('user_email', data.email)
        .then(
          () => console.log('User Email Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('user_name', data.name)
        .then(
          () => console.log('name Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('user_profile_pic', data.profile_pic)
        .then(
          () => console.log('profile_pic Stored!'),
          error => console.error('Error storing item', error)
        );
        this.events.publish('user:login');
         this.navCtrl.setRoot(HomePage);
 
       } else if (str === 'failed') {
         let alert = this.alertCtrl.create({
           title: 'Authentication Failed',
           subTitle: 'Email or Password is Invalid',
           buttons: ['OK']
         });
         alert.present();
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

   exp()
  {
    alert("Cordova Expired ! Un-Obtainable UUID");
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



