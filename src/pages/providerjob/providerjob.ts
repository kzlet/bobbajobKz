import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, MenuController, Events } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-providerjob',
  templateUrl: 'providerjob.html',
})
export class ProviderjobPage {

  status: string;
  time: string;
  date: string;
  cust_name: string;
  activeMenu: string;
  posts: any;
  apiUrl: string;
  myid: any;
  constructor(public events: Events, public menuCtrl: MenuController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.myid = data;
        this.fetchdata();
      },
      error => console.error(error)
    );


    // this.cust_name = 'kumail';
    // this.date = '10-23-22';
    // this.time = '21:23';
    // this.status = '1';



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProviderjobPage');
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
      content: "Loading your Jobs..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/viewprovjob.php?email=' + this.myid;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
      this.posts = Array.of(this.posts); 

      if(this.posts.length === 0)
      {
        alert("No Active Jobs Yet");
      }

      else if( this.posts.Status === 'failed' || this.posts.Status === "failed")
      {
        alert("No Active Jobs Yet");
      }
  
      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }

}
