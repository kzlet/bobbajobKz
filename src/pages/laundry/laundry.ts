import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';

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
  current_check : any = 'true';

  public date: string = new Date().toJSON().slice(0,10);
 //calender
 public event = {
  month: new Date().toJSON().slice(0,10),
  timeStarts: new Date().toTimeString().split(" ")[0],
}
  codes: NativeGeocoderReverseResult[];
  lat: number;
  long: number;

  constructor(public platform: Platform, private nativeGeocoder: NativeGeocoder, private geo : Geolocation, private nativeStorage: NativeStorage, private view: ViewController, public navCtrl: NavController, public navParams: NavParams,private http: Http, public alertCtrl: AlertController, private loadingCtrl: LoadingController) {
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
    this.currentco();
  }

  close() {
    console.log("Closed pressed");
    this.view.dismiss();
  }


  post_job()
  {
    this.currency = '£';
    if (this.job_description === undefined ||  this.location === undefined || this.event.month === undefined || this.event.timeStarts === undefined|| this.budget === undefined || this.title === undefined || this.user_email === undefined ) {
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

        //location ke andar enter lat long so that map function will work great on home screen,

        this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/post_job.php?jd=' + this.job_description + '&location=' + this.location +'&month=' + this.event.month + '&date='+ this.event.timeStarts + '&budget='+ this.budget+ '&title='+ this.title + '&user_email='+ this.user_email + '&currency='+ this.currency + '&latitude=' + this.lat  + '&latitude=' + this.long;
       
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
                  
                  //this.navCtrl.setRoot(HomePage);
                  this.navCtrl.pop();
                    
                }
            }, error => {
                console.log(error);// Error getting the data
            });
    }
  }


  currentco(){
    //Getting Data When Signup!
    this.platform.ready().then(() => {
      
              var options = {
                timeout : 10000
              };
              this.geo.getCurrentPosition(options).then(resp =>{
               console.log(resp.coords.latitude);
               console.log(resp.coords.longitude);

               this.lat = resp.coords.latitude;
               this.long = resp.coords.longitude;

               this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
               .then((result: NativeGeocoderReverseResult[]) =>{

                this.codes = result;

                console.log(this.codes);
              
                console.log(JSON.stringify(this.codes));

                console.log("Locality:" + this.codes[0].locality);
                console.log("Sub Locality:" + this.codes[0].subLocality);
                this.location = this.codes[0].subLocality + ',' + this.codes[0].locality;
                console.log("Location" + this.location);

                }
              )
               
               .catch((error: any) => console.log(error));
            
              }).catch(()=>{
               console.log("Error to get location");
               alert("Error to get location");
              });
              });
}

}
