import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvprofilePage } from '../provprofile/provprofile';

@Component({
  selector: 'page-provname',
  templateUrl: 'provname.html',
})
export class ProvnamePage {

  posts: any;
  apiUrl: string;
  email: any;
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.email = this.navParams.get('email');
    console.log("Email frm name page" + this.email);
    this.fetchqualification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvnamePage');
  }


profile1(){
  this.navCtrl.push(ProvprofilePage)
}

fetchqualification()
{

  let loader = this.loadingCtrl.create({
    content: "Loading Qualifications..."
  });
  loader.present();

  this.apiUrl = 'http://secedu.info/mycity/fetchqualification.php?email=' + this.email;
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
