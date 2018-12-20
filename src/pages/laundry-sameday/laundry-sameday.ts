import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-laundry-sameday',
  templateUrl: 'laundry-sameday.html',
})
export class LaundrySamedayPage {
  rate: string;
  price: string;
  name: string;
  catid: any;
  posts: any;
  apiUrl: string;
  data: any;
  pet: string = "Availability";
  isAndroid: boolean = false;

  constructor(platform: Platform, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundrySamedayPage');
  }
  laundry(){
    this.navCtrl.push(HomePage)
  }
  home(){
    this.navCtrl.push(HomePage)
  }
  profile1(email : string){
    this.navCtrl.push(ProfilePage, {email : email, catid : this.catid})
  }

}
