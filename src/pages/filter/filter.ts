import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  public first: string = '';
  posted: string;
  prices: string;
  available: string;
  filter: string;
  buttonValue: string;
  apiUrl: string;
  posts: any;
  job_category: any;
  budget: any;
  work_location: any;

  lat1 : any;
  lon1 : any;
  lat2 : any;
  lon2 : any;

  constructor(private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.get_data();
  }

  close() {
    this.view.dismiss();
  }

  send(job_category : string, budget : string, work_location : string)
  {
    let data = { job_category : this.job_category , budget : this.budget, work_location : this.work_location};
    this.view.dismiss(data);
  }

  get_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_category.php';

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  getDistanceFromLatLonInKm() {  //lat1,lon1,lat2,lon2

    this.lat1 = 53.547550;
    this.lon1 = -113.491798;
    this.lat2 = 53.545883;
    this.lon2 = -113.490112;

    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(this.lat2-this.lat1);  // deg2rad below
    var dLon = this.deg2rad(this.lon2-this.lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(this.lat1)) * Math.cos(this.deg2rad(this.lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    console.log("Distance: " + d);
    return d;
  }
  
  deg2rad(deg) {
    console.log("Second function:" + deg * (Math.PI/180));
    return deg * (Math.PI/180)
  }

}