import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Events, Content } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvprofeditPage } from '../provprofedit/provprofedit';

@Component({
  selector: 'page-provprofile',
  templateUrl: 'provprofile.html',
})


export class ProvprofilePage {
//  @ViewChild('content') content: Content;

  number: any;
  available: any;
  posts: any;
  email: any;
  apiUrl: string;
  profile_picture: any;
  name: any;
  activeMenu: string;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  provider_email: any;
  provider_name: any;
  rate : any;
  coasts: any;
  on_going_jobs: any;
  on_completed_jobs: any;
  foasts: any;
  tester: any;

  constructor( public events: Events, private loadingCtrl: LoadingController, private http: Http, private nativeStorage: NativeStorage, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ProvprofilePage');
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.provider_email = data;  //user email
        this.fetchdata();
        this.get_going_jobs();
        this.get_completed_jobs();
        this.get_rating();
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.profile_picture = data;  //user email
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('provider_name')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.provider_name = data;  //user email
      },
      error => console.error(error)
    );

  }

  get_going_jobs()
  {
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/provider_ongoing.php?provider_email=' + this.provider_email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
          this.foasts = data;

          this.on_going_jobs = this.foasts.length;
  
          if(data.Status === 'failed')
          {
          }
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

          this.on_completed_jobs = this.coasts.length;
  
        }, error => {
          console.log(error); // Error getting the data
        });
    
  }

  get_rating()
  {
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_stars.php?provider_email=' + this.provider_email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
         console.log(data);

         this.tester = data;
         this.rate = this.tester.average_rating;

         console.log(this.rate);

         if ( this.tester === undefined || this.rate === undefined )
         {
           this.rate = '3';
         }
          
  
        }, error => {
          console.log(error); // Error getting the data
        });
  }



  fetchdata()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_provider_profile_data.php?email=' + this.provider_email;
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

    edit()
    {
      this.navCtrl.push(ProvprofeditPage, { email :this.email});
    }


}
