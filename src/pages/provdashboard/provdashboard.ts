import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvprofilePage } from '../provprofile/provprofile';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';

@Component({
  selector: 'page-provdashboard',
  templateUrl: 'provdashboard.html',
})
export class ProvdashboardPage {

  available: any;
  activeMenu: string;
  number: string;
  id: any;
  profile_picture: any;
  name: any;
  email: any;
  posts: any;
  apiUrl: string;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  provider_email: any;
  images: { "photo": string; "id": string; }[];
  rate : any;
  coasts: any;
  on_going_jobs: any;
  on_completed_jobs: any;
  foasts: any;
  tester: any;
  constructor(public events: Events, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private loadingCtrl: LoadingController, private http: Http) {
  this.provider_email = this.navParams.get('provider_email');
  this.fetchdata();
  this.get_going_jobs();
  this.get_completed_jobs();
  this.get_rating();
  this.fetch_images();

  this.images = [
    {"photo": "imgs/32.jpg" , "id" : "1"},
    {"photo": "imgs/32.jpg" , "id" : "2"},
    {"photo": "imgs/32.jpg" , "id" : "3"},
    {"photo": "imgs/32.jpg" , "id" : "4"},
  ]

  }

  ionViewDidLoad() {
  }

  fetch_images()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Profile Images..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_complete_job_images.php?provider_email=' + this.provider_email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.images = data;
     //this.posts = Array.of(this.posts); 

      loader.dismiss();
      console.log(this.images);
 
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
              this.on_going_jobs = '-';
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
  
            if(data.Status === 'failed')
            {
              this.on_completed_jobs = '-';
            }
    
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
  
           if ( this.tester === undefined || this.rate === undefined || this.rate === null || this.rate === 'null' )
           {
             this.rate = '5';
           }
            
          }, error => {
            console.log(error); // Error getting the data
          });
    }
  

}
