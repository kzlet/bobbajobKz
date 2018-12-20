import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  myid: any;
  posts: any;
  apiUrl: string;
  constructor(public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.myid = data;
        this.fetchdata();
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  fetchdata()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/viewjob.php?useremail=' + this.myid;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
     // this.posts = Array.of(this.posts); 

      if(this.posts.length === 0)
      {
        alert("No Active Jobs Yet");
      }
  
      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }

    back()
    {
      this.navCtrl.push(HomePage);
    }

}
