import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { ProvidersChatPage } from '../providers-chat/providers-chat';

@Component({
  selector: 'page-provchat',
  templateUrl: 'provchat.html',
})
export class ProvchatPage {

  activeMenu: string;
  fosts: any;
  posts: any;
  apiUrl: string;
  email: any;
  profile_picture: any;
  constructor(public menuCtrl: MenuController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    // this.nativeStorage.getItem('profile_picture')
    // .then(
    //   data => {
    //     console.log("Checking for profile picture:" + data);
    //     this.profile_picture = data;
    //   },
    //   error => console.error(error)
    // );

    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.email = data;  //provider email
        this.fetchsender();
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvchatPage');
  }

  do()
  {
    console.log("Clicked menu 2");
    this.activeMenu = 'menu2';
    this.menuCtrl.enable(false, 'menu1');
    this.menuCtrl.enable(true, 'menu2');
    this.menuCtrl.open(this.activeMenu);
  }

  fetchsender()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/fetchchatssender.php?sender=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;

      if(this.posts.Status === 'failed' || this.posts.Status === "failed")
      {
        this.apiUrl = 'http://secedu.info/mycity/fetchchatsrec.php?reciever=' + this.email;
        console.log(this.apiUrl);
   
        this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
           
         this.fosts = data;

         console.log(this.posts);
 
        }, error => {
          console.log(error); // Error getting the data
    
        });

      }
      else  
      this.fosts = this.posts;

      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }

    chating(client : string, worker: string , sender : string, reciever : string)
    {
      this.navCtrl.push(ProvidersChatPage,{client : client , worker : worker, sender : sender, reciever : reciever});
    }

}
