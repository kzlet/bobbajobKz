import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvprofeditPage } from '../provprofedit/provprofedit';

@Component({
  selector: 'page-provprofile',
  templateUrl: 'provprofile.html',
})
export class ProvprofilePage {

  number: any;
  available: any;
  posts: any;
  email: any;
  apiUrl: string;
  profile_picture: any;
  name: any;
  activeMenu: string;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  constructor( public events: Events, private loadingCtrl: LoadingController, private http: Http, private nativeStorage: NativeStorage, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
     
    this.nativeStorage.getItem('name')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.name = data;  //user email
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

    this.nativeStorage.getItem('number')
    .then(
      data => {
        console.log("Checking for available:" + data);
        this.number = data;
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

    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.email = data;
        this.fetchdata();
      },
      error => console.error(error)
    );

  //   this.name = 'kumail';
  // this.email = 'mku@hmail.com';
  // this.number = '123456789';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvprofilePage');
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

  fetchdata()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/fetchdata.php?email=' + this.email;
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

    // qualification(email : string)
    // {
    //   this.navCtrl.push(ProvnamePage, { email :this.email});
    // }


    // price(email : string)
    // {
    //   this.navCtrl.push(ProvpricePage, { email :this.email});
    // }

    edit()
    {
      this.navCtrl.push(ProvprofeditPage, { email :this.email});
    }


}
