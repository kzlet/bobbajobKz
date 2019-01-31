import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//distance api
import { googlemaps } from 'googlemaps';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

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
  isKM:any=500;
  isType:any="";
  markers: any;
  latLng: any;
  mapOptions: { center: any; zoom: number; mapTypeId: any; };

  constructor(private ngZone: NgZone, private geolocation : Geolocation, public nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
   // this.get_storage_markers();
    this.getMarkers();
    this.loadMap();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.get_data();
  }

  close() {
    this.view.dismiss();
  }

  send(job_category: string, budget: string, work_location: string) {
    let data = { job_category: this.job_category, budget: this.budget, work_location: this.work_location };
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

  getDistanceFromLatLonInKm() {  //lat1,lon1,lat2,lon2

    this.lat1 = 53.547550;
    this.lon1 = -113.491798;
    this.lat2 = 53.545883;
    this.lon2 = -113.490112;

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

  getMarkers() {
    let url = 'https://purpledimes.com/BoobaJob/WebServices/get_jobs_markers.php';
    this.http.get(url)
      .map((res) =>
        res.json()
        //  console.log("REs:" + JSON.stringify(res));
      )
      .subscribe(data => {
        console.log(data);
        this.addMarkersToMap(data);
      });
  }

  addMarkersToMap(markers) {
    for (let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var iconBase = 'https://purpledimes.com/BoobaJob/WebServices/image/';         
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        icon: iconBase + 'new_image_marker.png'
      });
      var dogwalkMarker = new google.maps.Marker({ position: position, title: marker.title, location_name: marker.location_name, id: marker.id, event_type: marker.event_type, icon: dogwalkMarker.icon, event_time: marker.event_time, event_date: marker.event_date, event_description: marker.event_description });
      dogwalkMarker.setMap(this.map);
      //this.addInfoWindowToMarker(dogwalkMarker);
    }
  }


  //matrix Api

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

          console.log('latLng',this.latLng);
     
      this.mapOptions = {
        center: this.latLng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }   

this.map = new google.maps.Map(this.mapContainer.nativeElement, this.mapOptions);

    }, (err) => {
      alert('err '+err);
    });

  }


 /*--------------------Find Nearby Place------------------------*/ 

  nearbyPlace(){
    this.loadMap();
    this.markers = [];
    let service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch({
              location: this.latLng,
              radius: this.isKM,
              types: [this.isType]
            }, (results, status) => {
                this.callback(results, status);
            });
  }

  callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  }

  createMarker(place){
    var placeLoc = place;
    console.log('placeLoc',placeLoc);
    this.markers = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location
    });

    let infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(this.markers, 'click', () => {
      this.ngZone.run(() => {
        infowindow.setContent(place.name);
        infowindow.open(this.map, this.markers);
      });
    });
  }

}