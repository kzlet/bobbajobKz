import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  posts: any;
  email: any;
  expenses: any[];
  constructor(private nativeStorage: NativeStorage, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,private prost: Toast) {
    
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }

  laundry(category : string)
  {
    this.navCtrl.push(LaundrySamedayPage, { survey_id: category});
  }

  back()
  {
    this.navCtrl.push(HomePage);
  }
  
 

}
