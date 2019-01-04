import { Component } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, LoadingController, Platform, Events, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
  user_email: any = "v@gmail.com";
  posts: any;
  data: string;
  dash_data: { "id": string; "image": string; "title": string; }[];
  slides: { 'title': string; 'bg_image': string}[];
  constructor(public events: Events, public platform: Platform, public menuCtrl: MenuController , private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public modalCtrl: ModalController) {
  this.get_data();
    if (this.platform.is('android')) {
      console.log('I am an android Device!');
    }
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for User email:" + data);
        this.user_email = data;
      },
      error => console.error(error)
    );

    this.slides = [
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'},
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'},
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'}
      ];
  }

  do()
  {
    this.activeMenu = 'menu1';
    this.menuCtrl.open(this.activeMenu);
  }

  get_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_category.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
          loader.dismiss();
      }, error => {
        console.log(error); 
      });
  }

   get_value(title:string, id:string)
   {
    console.log(title);
    console.log(id);
    console.log(this.user_email);
    const modal = this.modalCtrl.create(LaundryPage, {title: title, id : id});
    modal.present();
   }

}