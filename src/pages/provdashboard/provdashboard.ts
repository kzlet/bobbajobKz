import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProfilePage } from '../profile/profile';
import { ProvideractiveservicesPage } from '../provideractiveservices/provideractiveservices';
import { ProviderjobPage } from '../providerjob/providerjob';
import { ProvprofilePage } from '../provprofile/provprofile';

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


    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('available')
    .then(
      data => {
        console.log("Checking for available:" + data);
        this.available = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('name')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.name = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.profile_picture = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('id')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.id = data;
      },
      error => console.error(error)
    );
    loader.dismiss();
  }

  do()
  {
    this.events.publish('user:login');
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
  this.navCtrl.push(ProviderjobPage);
}

// call()
// {
//  const confirm = this.alertCtrl.create({
//   title: 'Proceed to call MyCity ?',
//   message: 'You will be directed to our representative!',
//   buttons: [
//     {
//       text: 'Disagree',
//       handler: () => {
//         console.log('Disagree clicked');
//       }
//     },
//     {
//       text: 'Agree',
//       handler: () => {
//         console.log('Agree clicked');
//         this.number  = '00000000000';
//         this.callNumber.callNumber(this.number , true)
//        .then(res => console.log('Launched dialer!', res))
//        .catch(err => console.log('Error launching dialer', err));
//       }
//     }
//   ]
// });
// confirm.present();

// }

}
