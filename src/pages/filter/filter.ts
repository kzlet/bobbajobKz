import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, Platform,  LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//distance api
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  @ViewChild('mapContainer') mapContainer: ElementRef;

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

  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;

  map: any;
  user_lat: any;
  user_long: any;

  //distance matrix
  isKM:any=1;
  isType:any="";
  markers: any;
  latLng: any;
  mapOptions: { center: any; zoom: number; mapTypeId: any; };
  got_values: any;

  constructor(public platform : Platform , private geolocation : Geolocation, public nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.platform.ready().then(() => { 

      this.nativeStorage.getItem('got_values')
      .then(
        data => {
          console.log("Checking for Values" + data);
          this.got_values = data;

          if(this.got_values === '1' || this.got_values === 1)
          {
            this.get_storage_markers();
          }

          else  if(this.got_values === '0' || this.got_values === 0)
          {
           this.displayGoogleMap();
          }
        },
        error => console.error(error)
        );
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.get_data();
  }

  close() {
    this.view.dismiss();
  }

  send(job_category: string, budget: string, work_location: string, isKM : string) {
    let data = { job_category: this.job_category, budget: this.budget, work_location: this.work_location, isKM : this.isKM };
    this.view.dismiss(data);
  }

  get_data() {
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

  displayGoogleMap() {
    let latLng = new google.maps.LatLng(51.5014, 0.1419);
    let mapOptions = {
      center: latLng,
      draggable: true,
      disableDefaultUI: true,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
}


  getDistanceFromLatLonInKm() {  //lat1,lon1,lat2,lon2

    this.lat1 = 53.547550;
    this.lon1 = -113.491798;
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
    console.log("Distance: " + d);
    return d;
  }

  deg2rad(deg) {
    console.log("Second function:" + deg * (Math.PI / 180));
    return deg * (Math.PI / 180)
  }


  get_storage_markers() {

    this.nativeStorage.getItem('user_lat')
      .then(
        data => {
          console.log("Checking for latitude:" + data);
          this.user_lat = data;
          this.nativeStorage.getItem('user_long')
            .then(
              data => {
                console.log("Checking for logtitude:" + data);
                this.user_long = data;

                let latLng = new google.maps.LatLng(this.user_lat, this.user_long);
                let mapOptions = {
                  center: latLng,
                  draggable: true,
                  disableDefaultUI: true,
                  zoom: 12,
                  mapTypeId: 'roadmap',

                }
                this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
              },
              error => console.error(error)
            );
        },
        error => console.error(error)
      );
  }

 

}