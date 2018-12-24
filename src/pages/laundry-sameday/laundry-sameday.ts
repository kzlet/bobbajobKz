import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-laundry-sameday',
  templateUrl: 'laundry-sameday.html',
})
export class LaundrySamedayPage {
  rate: string;
  price: string;
  name: string;
  catid: any;
  posts: any;
  apiUrl: string;
  data: any;
  pet: string = "Availability";
  isAndroid: boolean = false;

  constructor(public modalCtrl: ModalController, platform: Platform, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.isAndroid = platform.is('android');
    this.get_jobs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundrySamedayPage');
  }
  laundry(){
    this.navCtrl.push(HomePage)
  }
  home(){
    this.navCtrl.push(HomePage)
  }
  profile1(email : string){
    this.navCtrl.push(ProfilePage, {email : email, catid : this.catid})
  }

  filter()
  {
    const modal = this.modalCtrl.create(FilterPage);
    modal.present();
  }

  get_jobs() 
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Jobs..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_jobs.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  view_job(client_email : string, project_id : string, project_title: string)
  {
    this.navCtrl.push(ProfilePage, {client_email : client_email, project_id: project_id, project_title : project_title });
  }
  
}
