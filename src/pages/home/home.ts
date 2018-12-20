import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, LoadingController, Platform, Events, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FavoritePage } from '../favorite/favorite';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';
import { LaundryPage } from '../laundry/laundry';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trustedUrl: any;
  embeddedVideoID: string;
  apiUrl: string;
  expenses: any[];
  activeMenu: string;
  email: any;
  posts: any;
  data: string;
  dash_data: { "id": string; "image": string; "title": string; }[];
  constructor(public events: Events, public platform: Platform, public menuCtrl: MenuController , private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public modalCtrl: ModalController) {

    if (this.platform.is('android')) {
      console.log('I am an android Device!');
    }
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    this.dash_data = [
      {"id": "1", "image":"imgs/ic_laundry.png" , "title":"Handyman"},
      {"id": "2", "image":"imgs/ic_gym.png" , "title":"Cleaning"},
      {"id": "3", "image":"imgs/ic_laundry.png" , "title":"Delivery"},
      {"id": "4", "image":"imgs/ic_laundry.png" , "title":"Removals"},
      {"id": "5", "image":"imgs/ic_laundry.png" , "title":"Painting"},
      {"id": "6", "image":"imgs/ic_laundry.png" , "title":"Gardening"},
      {"id": "7", "image":"imgs/ic_laundry.png" , "title":"Accounting"},
      {"id": "8", "image":"imgs/ic_laundry.png" , "title":"Admin"},
      {"id": "9", "image":"imgs/ic_laundry.png" , "title":"Aircon Installation"},
      {"id": "10", "image":"imgs/ic_laundry.png" , "title":"Appliance Repair"},
      {"id": "11", "image":"imgs/ic_laundry.png" , "title":"Mobile App Design"},
      {"id": "12", "image":"imgs/ic_laundry.png" , "title":"Asbestos Removal"},
      {"id": "13", "image":"imgs/ic_laundry.png" , "title":"Assembly"},
      {"id": "14", "image":"imgs/ic_laundry.png" , "title":"Bathroom Renovations"},
    ]
  }

  do()
  {
    this.events.publish('user:login');
    console.log("Clicked menu 1");
    this.activeMenu = 'menu1';
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'menu2');
    this.menuCtrl.open(this.activeMenu);
  }


  laundry(Id: String) {
    this.data = "laundry";
    Id = this.data;
    this.navCtrl.push(LaundrySamedayPage, { survey_id : Id});
    console.log("From Home" + Id);
   } 

   get_value(title:string, id:string)
   {
    console.log(title);
    console.log(id);
    const modal = this.modalCtrl.create(LaundryPage, {title: title, id : id});
    modal.present();
   }


  push()
  {
    this.navCtrl.push(FavoritePage);
  }

}