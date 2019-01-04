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

  constructor(public alertCtrl : AlertController, public modalCtrl: ModalController, platform: Platform, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.isAndroid = platform.is('android');
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

         if(this.title != undefined || this.title != 'undefined')
         {
          this.get_jobs_on_filter();
         }
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
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

 
}
