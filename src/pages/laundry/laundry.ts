import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-laundry',
  templateUrl: 'laundry.html',
})
export class LaundryPage {
  @ViewChild(Slides) slides: Slides;
  data: any;
  title: any;
  id: any;
  job_description: any;
  location: any;
  budget: any;
  currentEvents: { year: number; month: number; date: number; }[];
  user_email: any;
  currency: any;
  apiUrl: string;

 //calender
 public event = {
  month: new Date().toJSON().slice(0,10),
  timeStarts: new Date().toTimeString().split(" ")[0],
}

  constructor(private nativeStorage: NativeStorage, private view: ViewController, public navCtrl: NavController, public navParams: NavParams,private http: Http, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
     this.title = this.navParams.get('title');
     this.id = this.navParams.get('id');
     this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for User email:" + data);
        this.user_email = data;
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundryPage');
  }

  close() {
    this.view.dismiss();
  }

  goToSlide2() {
    this.slides.slideTo(1, 500);
  }

  goToSlide3() {
    this.slides.slideTo(2, 500);
  }

  post_job()
  {
    this.currency = '£';
    if (this.job_description === undefined ||  this.location === undefined || this.event.month === undefined || this.event.timeStarts === undefined|| this.budget === undefined || this.title === undefined || this.user_email === undefined || this.currency === undefined) {
        let alert = this.alertCtrl.create({
            title: 'All fields are required',
            buttons: ['OK']
          });
          alert.present();
    }

    else {

         let loader = this.loadingCtrl.create({
            content: "Job Posting in Progress..."
        });
        loader.present();

        this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/post_job.php?jd=' + this.job_description + '&location=' + this.location +'&month=' + this.event.month + '&date='+ this.event.timeStarts + '&budget='+ this.budget+ '&title='+ this.title + '&user_email='+ this.user_email + '&currency='+ this.currency;
       
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
           loader.dismiss();

                console.log(data);
      
                var status = data.Status;

                if(status === 'failed')
                {
                  let alert = this.alertCtrl.create({
                    title: 'Posting Job failed ! Try again later',
                    buttons: ['OK']
                  });
                  alert.present();
                }
                else {
                  let alert = this.alertCtrl.create({
                    title: 'Job Posted Successful',
                    buttons: ['OK']
                  });
                  alert.present();
                  
                  this.navCtrl.setRoot(HomePage);
                    
                }
            }, error => {
                console.log(error);// Error getting the data
            });
    }
  }


}
