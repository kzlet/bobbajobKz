import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvprofilePage } from '../provprofile/provprofile';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';

@Component({
  selector: 'page-provdashboard',
  templateUrl: 'provdashboard.html',
})
export class ProvdashboardPage {

  available: any;
  activeMenu: string;
  number: string;
  id: any;
  profile_picture: any;
  name: any;
  email: any;
  posts: any;
  apiUrl: string;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  provider_email: any = 'stan@gmail.com';
  images: { "photo": string; "id": string; }[];
  constructor(public events: Events, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private loadingCtrl: LoadingController, private http: Http) {
  this.provider_email = this.navParams.get('provider_email');
  this.fetchdata();

  this.images = [
    {"photo": "imgs/32.jpg" , "id" : "1"},
    {"photo": "imgs/32.jpg" , "id" : "2"},
    {"photo": "imgs/32.jpg" , "id" : "3"},
    {"photo": "imgs/32.jpg" , "id" : "4"},
  ]

  }

  ionViewDidLoad() {
  }


  fetchdata()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_provider_profile_data.php?email=' + this.provider_email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
     this.posts = Array.of(this.posts); 

      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }

}
