import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html',
})
export class OfferPage {
  provider_email: any;
  project_id: any;
  client_email: any;
  apiUrl: string;
  duration: any;
  amount: any;
  proposal : any;

  //calender
  public event = {
    month: new Date().toJSON().slice(0,10),
    timeStarts: new Date().toTimeString().split(" ")[0],
  }

  constructor(private alertCtrl : AlertController ,private loadingCtrl: LoadingController, private view: ViewController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  this.project_id = this.navParams.get('project_id');
  this.client_email = this.navParams.get('client_email');
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for provider_email:" + data);
        this.provider_email = data;
      },
      error => console.error(error)
    );
  }

  close() {
    this.view.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }

  //make_offer.php
  give_offer()
  {
    if(this.event.month === undefined || this.event.timeStarts === undefined || this.proposal === undefined)
    {
      let alert = this.alertCtrl.create({
        title: 'All feilds are neccessay...',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    if (this.client_email === undefined || this.client_email === 'undefined' || this.provider_email === undefined || this.provider_email === 'undefined' || this.project_id === undefined || this.project_id === 'undefined')
    {
      let alert = this.alertCtrl.create({
        title: 'Data not gathered Successfully, Please try again later...',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    {
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
          this.view.dismiss();   
        }
        else {
          loader.dismiss();
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  }
  }

}
