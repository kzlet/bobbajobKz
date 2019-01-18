import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-rateprovider',
  templateUrl: 'rateprovider.html',
})
export class RateproviderPage {
  provider_email: any;
  project_id: any;
  provider_name: any;
  rate : any = '0';
  apiUrl: string;
  value : any = '1';
  review: string;

  constructor(public alertCtrl : AlertController, private loadingCtrl: LoadingController, private http: Http,private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.provider_email  = this.navParams.get('provider_email');
    this.project_id = this.navParams.get('project_id');
    this.provider_name = this.navParams.get('provider_name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateproviderPage');
  }

  close() {
    this.view.dismiss();
  }

  save_data()
  {
    this.value = '2';
  }

  finish()
  {
    console.log(this.review);
    console.log(this.rate);
    console.log(this.project_id);
    console.log("Post job function called");
    let loader = this.loadingCtrl.create({
      content: "Finalizing the Job..."
    });
    loader.present();
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/update_review_rate.php?project_id=' + this.project_id + '&review=' + this.review + '&rating=' + this.rate;  
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        var status = data.Status;
        if (status === 'success') {
          let alert = this.alertCtrl.create({
            title: 'Thanks for using our Services...',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          this.navCtrl.setRoot(HomePage);
        }
        else {
          loader.dismiss();
        }
      }, error => {
        console.log(error);
      });
  }


}
