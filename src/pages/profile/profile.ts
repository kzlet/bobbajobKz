import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EmailComposer } from '@ionic-native/email-composer';
import { OfferPage } from '../offer/offer';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  s_name: any;
  client_name: any;
  job_status: any;
  job_date: any;
  job_time: any;
  useremail: any;
  catid: any;
  hosts: any;
  names: any[];
  number: any;
  clientmail: any;
  posts: any;
  apiUrl: string;
  id: any;
  profile_picture: any;
  email: any;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  client_email: any;
  project_id: any;
  project_title: any;
  provider_email: any;
  tests: any;
  bid_status: any = '0';
  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
  this.client_email = this.navParams.get('client_email');
  this.project_id = this.navParams.get('project_id');
  this.project_title = this.navParams.get('project_title');
  this.fetchdata();
  //this.check_status();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for provider_email:" + data);
        this.provider_email = data;
        this.check_status();
      },
      error => console.error(error)
    );
  }

  fetchdata()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/find_poster.php?id=' + this.project_id;
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

    make_offer(client_email :string)
    {
      const modal = this.modalCtrl.create(OfferPage, {project_id : this.project_id, client_email : client_email});
      let loader = this.loadingCtrl.create({
        content: "Uploading your proposal..."
      });
      loader.present();
   //   this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/make_offer.php?client_email=' + this.client_email + '&provider_email=' + this.provider_email + '&project_id=' + this.project_id + '&day=' + this.event.month + '&time=' + this.event.timeStarts + '&proposal=' + this.proposal; 
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/make_offer.php?client_email=' + this.client_email + '&provider_email=' + this.provider_email + '&project_id=' + this.project_id; 
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          console.log(data);
          var status = data.Status;
          if (status === 'success') {
            let alert = this.alertCtrl.create({
              title: 'Offer sent Successfully...',
              buttons: ['OK']
            });
            alert.present();
            loader.dismiss();
            this.post_notification();
            this.check_status();
          }
          else {
            loader.dismiss();
          }
        }, error => {
          console.log(error);// Error getting the data
        });
    }

    post_notification()
    {
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/make_offer_notification.php?project_id=' + this.project_id;
      console.log(this.apiUrl);
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
        }, error => {
          console.log(error); // Error getting the data
        });
    }

   check_status()
   {
     console.log(this.project_id);
     console.log(this.provider_email);
     let loader = this.loadingCtrl.create({
      content: "Loading Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_bid_status.php?project_id=' + this.project_id + '&provider_email=' + this.provider_email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.tests = data;

      if(this.tests.Status === 'success')
      {
         this.bid_status = '1';
         console.log("Already recieved your bid");
      }

      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
   }

}
