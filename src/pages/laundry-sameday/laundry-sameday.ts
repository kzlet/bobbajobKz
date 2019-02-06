import { Component } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, ModalController, AlertController } from 'ionic-angular';
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
  title: any;
  budget: any;
  work_location: any;
  user_lat: any;
  user_long: any;
  lat1: number;
  lon1: number;
  lat2: any;
  lon2: any;
  isKM : any = '8';
  distance :  string ;

  expenses : any[];
  constructor(public alertCtrl : AlertController, public modalCtrl: ModalController, platform: Platform, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.isAndroid = platform.is('android');
    this.nativeStorage.getItem('user_lat')
    .then(
      data => {
        console.log("Checking for latitude:" + data);
        this.user_lat = data;
      },
      error => console.error(error)
      );

      this.nativeStorage.getItem('user_long')
        .then(
          data => {
            console.log("Checking for logtitude:" + data);
            this.user_long = data;
          },
          error => console.error(error)
          );
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundrySamedayPage');
  }

  ionViewWillEnter()
  {
    this.get_jobs();
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
    modal.onDidDismiss(data => {
         console.log(data);
         this.title = data.job_category;
         this.budget = data.budget;
         this.work_location = data.work_location;
         this.isKM = data.isKM;

         if(this.isKM != undefined || this.isKM != 'undefined')
         {
            this.get_jobs_on_location();
         }

        //  if(this.title != undefined || this.title != 'undefined')
        //  {
        //   this.get_jobs_on_filter();
        //  }
        //  if (this.title != undefined && this.budget != undefined && this.work_location != undefined)
        //  {
        //     //function with all parameters
        //  }

        //  else if(this.title != undefined && this.budget != undefined)
        //  {
        //   //title & budget function
        //  }

        //  else if(this.title != undefined && this.work_location != undefined)
        //  {
        //   //title & work_location function
        //  }

        //  else if(this.work_location != undefined && this.budget != undefined)
        //  {
        //   //work_location & budget function
        //  }

        //  else if(this.title === undefined && this.budget === undefined && this.work_location === undefined)
        //  {
        //   //do nothing
        //  }
        //  else if(this.title != undefined)
        //  {
        //     this.get_jobs_on_filter();
        //  }

        //  else if(this.budget != undefined)
        //  {
        //   //   this.get_jobs_on_filter();
        //  }

        //  else if(this.work_location != undefined)
        //  {
        //   //   this.get_jobs_on_work_location();
        //  }

  });

    modal.present();
  }

  get_jobs() 
  {
    this.expenses = []; 
    let loader = this.loadingCtrl.create({
      content: "Loading Jobs..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_jobs.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
     //   console.log(this.posts.length);
        for(var i = 0; i < this.posts.length; i++)
        {
          this.expenses.push({ id: this.posts[i].id, user_email: this.posts[i].user_email, month: this.posts[i].month,  date: this.posts[i].date,  jd: this.posts[i].jd,  budget: this.posts[i].budget,  title: this.posts[i].title,  is_active: this.posts[i].is_active,  progress: this.posts[i].progress,  latitude: this.posts[i].latitude,  longitude: this.posts[i].longitude })
        }
      

          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  view_job(client_email : string, project_id : string, project_title: string)
  {
    this.navCtrl.push(ProfilePage, {client_email : client_email, project_id: project_id, project_title : project_title });
  }
  

  get_jobs_on_filter()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Jobs..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_jobs_by_id.php?title=' + this.title;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;

        if(data.Status === 'failed')
        {
          const alert = this.alertCtrl.create({
            title: 'No Data found on these parameters !',
            buttons: ['OK']
          });
          alert.present();
        }
        
        this.expenses = []; 
        for(var i = 0; i < this.posts.length; i++)
        {
          this.expenses.push({ id: this.posts[i].id, user_email: this.posts[i].user_email, month: this.posts[i].month,  date: this.posts[i].date,  jd: this.posts[i].jd,  budget: this.posts[i].budget,  title: this.posts[i].title,  is_active: this.posts[i].is_active,  progress: this.posts[i].progress,  latitude: this.posts[i].latitude,  longitude: this.posts[i].longitude })
        }

          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  get_jobs_on_location()
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
        console.log(this.posts.length);
        this.expenses = []; 
        for(var i = 0; i < this.posts.length ; i++)
        {
        //Distance Calculation system
        this.lat1 = this.posts[i].latitude;
        this.lon1 = this.posts[i].longitude;
        this.lat2 = this.user_lat;
        this.lon2 = this.user_long;
    
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(this.lat2 - this.lat1);  // deg2rad below
        var dLon = this.deg2rad(this.lon2 - this.lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(this.lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
      //  console.log("Distance: " + d/1000 ); 

        this.distance = d.toString();

        this.distance = this.distance.charAt(0);

        console.log("Distance: " + this.distance);
              
        if( +this.distance < +this.isKM)
        {
            console.log("Value is in range:" + this.posts[i].id);
            this.expenses.push({ id: this.posts[i].id, user_email: this.posts[i].user_email, month: this.posts[i].month,  date: this.posts[i].date,  jd: this.posts[i].jd,  budget: this.posts[i].budget,  title: this.posts[i].title,  is_active: this.posts[i].is_active,  progress: this.posts[i].progress,  latitude: this.posts[i].latitude,  longitude: this.posts[i].longitude }) 
            console.log("Added in the stack : " + this.posts[i].id + " Length : " + this.expenses.length); 
          }
        
      }

        if(this.expenses.length === 0)
        {
          const alert = this.alertCtrl.create({
            title: 'No Data found on these parameters !',
            buttons: ['OK']
          });
          alert.present();
        }
 
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  deg2rad(deg) {
    console.log("Second function:" + deg * (Math.PI / 180));
    return deg * (Math.PI / 180)
  }
 
}
