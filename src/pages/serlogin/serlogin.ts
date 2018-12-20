import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SerregisterPage } from '../serregister/serregister';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-serlogin',
  templateUrl: 'serlogin.html',
})
export class SerloginPage {

  password: string;
  email: string;
  apiUrl: string;
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
    
    this.apiUrl = 'http://secedu.info/mycity/custlogin.php?email=' + this.email + '&password=' + this.password;
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
          subTitle: 'Welcome to InTechCall',
          buttons: ['OK']
        });
        alert.present();

        this.nativeStorage.setItem('id', data.id)
        .then(
          () => console.log('ID Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('email', data.email)
        .then(
          () => console.log('Email Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('name', data.name)
        .then(
          () => console.log('Name Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('number', data.number)
        .then(
          () => console.log('number Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('profile_picture', data.profile_picture)
        .then(
          () => console.log('Picture Stored!'),
          error => console.error('Error storing item', error)
        );

        this.nativeStorage.setItem('available', data.available)
        .then(
          () => console.log('available Stored!'),
          error => console.error('Error storing item', error)
        );
          
          this.navCtrl.push(ProvdashboardPage);


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


}
