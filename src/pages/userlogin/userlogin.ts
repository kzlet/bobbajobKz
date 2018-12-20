import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserregisterPage } from '../userregister/userregister';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';


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
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserloginPage');
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

  signIn()
  {
    this.navCtrl.setRoot(HomePage);
  }

  // signIn() { 
    
  //   this.apiUrl = 'http://secedu.info/mycity/userlogin.php?email=' + this.email + '&password=' + this.password;
  //   console.log(this.apiUrl)

  //    if (this.email === undefined || this.password === undefined) {
  //      let alert = this.alertCtrl.create({
  //        title: 'Sign-in Error',
  //        subTitle: 'Email and Password Required',
  //        buttons: ['OK']
  //      });
  //      alert.present();
  //      return;
  //    }
  //    let loader = this.loadingCtrl.create({
  //      content: "Signing In..."
  //    });
  //    loader.present();
 
  //    console.log(this.apiUrl);

  //    this.http.get(this.apiUrl).map(res => res.json())
  //    .subscribe(data => {
 
  //      console.log(data);
  //      loader.dismissAll();

  //      var str = data.Status;

  //      if (str === 'success') {

  //       let alert = this.alertCtrl.create({
  //         title: 'Login Successful',
  //         subTitle: 'Welcome to InTechCall',
  //         buttons: ['OK']
  //       });
  //       alert.present();

  //       this.nativeStorage.setItem('s_email', data.email)
  //       .then(
  //         () => console.log('Email Stored!'),
  //         error => console.error('Error storing item', error)
  //       );

  //       this.nativeStorage.setItem('s_name', data.name)
  //       .then(
  //         () => console.log('name Stored!'),
  //         error => console.error('Error storing item', error)
  //       );

  //       let onetimelogin = 1;
  //       this.nativeStorage.setItem('onetimelogin', onetimelogin)
  //       .then(
  //         () => console.log('Onetime Login Saved!'),
  //         error => console.error('Error storing item', error)
  //       );

  //        this.navCtrl.setRoot(HomePage);
 
  //      } else if (str === 'failed') {
  //        let alert = this.alertCtrl.create({
  //          title: 'Authentication Failed',
  //          subTitle: 'Email or Password is Invalid',
  //          buttons: ['OK']
  //        });
  //        alert.present();
  //      }
  //    }, error => {
  //      console.log(error); // Error getting the data
 
  //      let alert = this.alertCtrl.create({
  //        title: 'Network Failed',
  //        subTitle: 'Please try again later',
  //        buttons: ['OK']
 
  //      });
  //      alert.present();
  //      loader.dismissAll();
  //    });
  //  }

   exp()
  {
    alert("Cordova Expired ! Un-Obtainable UUID");
  }




}



