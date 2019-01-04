import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-job-history',
  templateUrl: 'job-history.html',
})
export class JobHistoryPage {

  archive : any = "Going";
  apiUrl: string;
  posts: any;
  provider_email: any;
  toast: any;
  coasts: any;
  constructor(public alertCtrl : AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
   
  }

  ionViewWillEnter()
  {
    console.log('ionViewDidLoad JobHistoryPage');
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.provider_email = data;

        let loader = this.loadingCtrl.create({
          content: "Loading Data..."
        });
        loader.present();

        this.get_going_jobs();
        this.get_all_proposals();
        this.get_completed_jobs();

        loader.dismiss();
      },
      error => console.error(error)
    );
  }

  //get on going jobs: https://purpledimes.com/BoobaJob/WebServices/provider_ongoing.php?provider_email=

  //get all proposals : https://purpledimes.com/BoobaJob/WebServices/get_providers_proposals.php?provider_email=

  //get completed jobs : https://purpledimes.com/BoobaJob/WebServices/get_prov_completed_projects.php?provider_email=

  get_going_jobs()
  {
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/provider_ongoing.php?provider_email=' + this.provider_email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
          this.posts = data;
  
          if(data.Status === 'failed')
          {
          }
        }, error => {
          console.log(error); // Error getting the data
        }); 
  }

  get_all_proposals()
  {
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_providers_proposals.php?provider_email=' + this.provider_email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
          this.toast = data;
  
        }, error => {
          console.log(error); // Error getting the data
        });
    
  }

  get_completed_jobs()
  {
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_prov_completed_projects.php?provider_email=' + this.provider_email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
          this.coasts = data;
  
        }, error => {
          console.log(error); // Error getting the data
        });
    
  }
}
