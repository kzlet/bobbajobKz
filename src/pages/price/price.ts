import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvdashboardPage } from '../provdashboard/provdashboard';


@Component({
  selector: 'page-price',
  templateUrl: 'price.html',
})
export class PricePage {

  posts: any;
  apiUrl: string;
  email: any;
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.email = this.navParams.get('email');
    this.fetchprice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PricePage');
  }
  profile2(){
    this.navCtrl.push(ProfilePage, {email : this.email})
  }

  fetchprice()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading Qualifications..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/fetchcategory.php?email=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
   //  this.posts = Array.of(this.posts); 
  
      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }

}
