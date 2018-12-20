import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { UserloginPage } from '../userlogin/userlogin';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-userregister',
  templateUrl: 'userregister.html',
})
export class UserregisterPage {

  country: any;
  city: any;
  apiUrl: string;
  conpassword: any;
  password: any;
  number: any;
  email: any;
  name: any;
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserregisterPage');
    this.nativeStorage.getItem('city')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.city = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('country')
    .then(
      data => {
        console.log("Checking for country name:" + data);
        this.country = data;
      },
      error => console.error(error)
    );
  }

  back()
  {
    this.navCtrl.push(UserloginPage);
    }

    reg()
    {
      this.navCtrl.push(UserloginPage);
    }

    goto2()
    {
      this.navCtrl.push(HomePage);
    }

    signup() {
      this.navCtrl.push(UserloginPage);
    }


  //   signup() {

  //     if (this.name === undefined ||  this.email === undefined || this.number === undefined || this.password === undefined) {
  //         let alert = this.alertCtrl.create({
  //             title: 'All fields are required',
  //             buttons: ['OK']
  //           });
  //           alert.present();
  //     }
  //     else if (this.password != this.conpassword) {
  //         let alert = this.alertCtrl.create({
  //             title: 'Passwords are not same',
  //             buttons: ['OK']
  //           });
  //           alert.present();
  //     }
  
  //     else {
  
  //          let loader = this.loadingCtrl.create({
  //             content: "User Registeration in Progress..."
  //         });
  //         loader.present();
  
  //         this.apiUrl = 'http://secedu.info/mycity/userregister.php?name=' + this.name + '&password=' + this.password +'&email=' + this.email + '&number='+ this.number + '&city='+ this.city + '&country='+ this.country;
  
      
  //         var data = { name: this.name, password: this.password, email: this.email, number: this.number, city: this.city, country: this.country };
  //         console.log(data);
  //         console.log("password:" + this.password);
         
  //         this.http.get(this.apiUrl).map(res => res.json())
  //           .subscribe(data => {
  //            loader.dismiss();
  
  //                 console.log(data);
        
  //                 var status = data.Status;
  
  //                 if (status === 'exist') {
  
  //                     let alert = this.alertCtrl.create({
  //                         title: 'User already Exists',
  //                         buttons: ['OK']
  //                       });
  //                       alert.present();
                       
  //                     this.name='';
  //                     this.email='';
  //                     this.password='';
  //                     this.number='';
  //                     this.city='';
  //                     this.country='';
                     
  //                 }
  //                 else if(status === 'failed')
  //                 {
  //                   let alert = this.alertCtrl.create({
  //                     title: 'Registeration Failed ! Server Problem',
  //                     buttons: ['OK']
  //                   });
  //                   alert.present();
  //                 }
  //                 else {

  //                   this.nativeStorage.setItem('s_email', data.email)
  //                   .then(
  //                     () => console.log('Email Stored!'),
  //                     error => console.error('Error storing item', error)
  //                   );

  //                   let auth = 1;
  //                   this.nativeStorage.setItem('auth', auth)
  //                   .then(
  //                     () => console.log('Activated User Profile'),
  //                     error => console.error('Error storing item', error)
  //                   );
            
  
  //                   let alert = this.alertCtrl.create({
  //                     title: 'Registeration Successful ! Login to proceed',
  //                     buttons: ['OK']
  //                   });
  //                   alert.present();
  
  //                     this.navCtrl.push(UserloginPage);
  //                  //  window.location.reload();
                      
  //                 }
  //             }, error => {
  //                 console.log(error);// Error getting the data
  //             });
  //     }
  // }
}
