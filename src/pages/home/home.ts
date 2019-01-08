import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, LoadingController, Platform, Events, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LaundryPage } from '../laundry/laundry';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  trustedUrl: any;
  embeddedVideoID: string;
  apiUrl: string;
  expenses: any[];
  activeMenu: string;
  user_email: any = "v@gmail.com";
  posts: any;
  data: string;
  dash_data: { "id": string; "image": string; "title": string; }[];
  slides: { 'title': string; 'bg_image': string}[];

  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  id: any = '10';

  constructor(public events: Events, public platform: Platform, public menuCtrl: MenuController , private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public modalCtrl: ModalController) {
  this.get_data();
    if (this.platform.is('android')) {
      console.log('I am an android Device!');
    }
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for User email:" + data);
        this.user_email = data;
      },
      error => console.error(error)
      );

      this.platform.ready().then(() => { 
        this.displayGoogleMap();
        this.getMarkers();
       });

    this.slides = [
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'},
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'},
      {'title':'Advertisement Here', 'bg_image' : 'imgs/Chritmis-banner.png'}
      ];

     
  }

  do()
  {
    this.activeMenu = 'menu1';
    this.menuCtrl.open(this.activeMenu);
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
        console.log(error); 
      });
  }

   get_value(title:string, id:string)
   {
    console.log(title);
    console.log(id);
    console.log(this.user_email);
    const modal = this.modalCtrl.create(LaundryPage, {title: title, id : id});
    modal.present();
   }


   displayGoogleMap() {
    let latLng = new google.maps.LatLng(24.82935137, 67.07206964);

    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    
    }
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  getMarkers() {
    this.id = '10';
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
    for(let marker of markers) {
      var position = new google.maps.LatLng(marker.latitude, marker.longitude);
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        image: "../assets/imgs/marker.png",
      //  scaledSize: new google.maps.Size(30, 30)   
      });
      var dogwalkMarker = new google.maps.Marker({position: position, title: marker.title, location_name: marker.location_name, id : marker.id , event_type : marker.event_type, image : marker.image  , event_time:marker.event_time, event_date : marker.event_date, event_description : marker.event_description});
      dogwalkMarker.setMap(this.map);
      //this.addInfoWindowToMarker(dogwalkMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    var infoWindowContent = '<div id="content"><h1 class="firstHeading">' + marker.title + '</h1></div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    infoWindow.open(this.map, marker);
    marker.addListener('click', () => {
    infoWindow.open(this.map, marker);
     
   //  const modal = this.modalCtrl.create(EventsModalPage, {title: marker.title, location_name:marker.location_name , id : marker.id,  event_type: marker.event_type , image : marker.image , event_time:marker.event_time, event_date : marker.event_date, event_description : marker.event_description});
  //   modal.present();

    });
  }



    
    }