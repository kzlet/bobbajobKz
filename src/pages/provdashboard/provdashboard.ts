import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilePage } from '../profile/profile';
import { ProvideractiveservicesPage } from '../provideractiveservices/provideractiveservices';
import { ProviderjobPage } from '../providerjob/providerjob';
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
  constructor(public events: Events, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvdashboardPage');
    let loader = this.loadingCtrl.create({
      content: "Loading your settings..."
    });
    loader.present();
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('provider_name')
    .then(
      data => {
        console.log("Checking for available:" + data);
        this.name = data;
      },
      error => console.error(error)
    );
    loader.dismiss();
  }

  do()
  {
    this.events.publish('provider:login');
    console.log("Clicked menu 2");
    this.activeMenu = 'menu2';
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(true, 'menu2');
    this.menuCtrl.open(this.activeMenu);
  }

  provider()
  {
    this.navCtrl.push(ProvprofilePage);
  }

  prof()
  {
    //this.navCtrl.push(ProfilePage,{id : this.id});
  }

  services()
  {
    this.navCtrl.push(ProvideractiveservicesPage);
  }
send()
{
  this.navCtrl.push(LaundrySamedayPage);
}

}
