import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

declare var google;

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

  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;

  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  user_lat: any;
  user_long: any;

  constructor(public nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.get_storage_markers();
    this.getMarkers();
    // this.tester_map();
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

  tester_map() {
    var map;
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: new google.maps.LatLng(-33.91722, 151.23064),
      mapTypeId: 'roadmap'
    });

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
      parking: {
        name: 'Parking',
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        name: 'Library',
        icon: iconBase + 'library_maps.png'
      },
      info: {
        name: 'Info',
        icon: iconBase + 'info-i_maps.png'
      }
    };

    var features = [
      {
        position: new google.maps.LatLng(-33.91721, 151.22630),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91539, 151.22820),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91910, 151.22907),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91790, 151.23463),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.916988, 151.233640),
        type: 'info'
      }, {
        position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
        type: 'parking'
      }, {
        position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
        type: 'library'
      }
    ];

    // Create markers.
    features.forEach(function (feature) {
      var marker = new google.maps.Marker({
        position: feature.position,
        icon: icons[feature.type].icon,
        map: map
      });
    });

    var legend = document.getElementById('legend');
    for (var key in icons) {
      var type = icons[key];
      var name = type.name;
      var icon = type.icon;
      var div = document.createElement('div');
      div.innerHTML = '<img src="' + icon + '"> ' + name;
      legend.appendChild(div);
    }

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
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
        icon: iconBase + 'custom_marker.png'
      });
      var dogwalkMarker = new google.maps.Marker({ position: position, title: marker.title, location_name: marker.location_name, id: marker.id, event_type: marker.event_type, icon: dogwalkMarker.icon, event_time: marker.event_time, event_date: marker.event_date, event_description: marker.event_description });
      dogwalkMarker.setMap(this.map);
      //this.addInfoWindowToMarker(dogwalkMarker);
    }
  }
}