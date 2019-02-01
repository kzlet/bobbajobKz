import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, MenuController, NavParams, AlertController, LoadingController, Platform, Events, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LaundryPage } from '../laundry/laundry';
import { UserselectPage } from '../userselect/userselect';

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
  user_email: any;
  posts: any;
  data: string;
  dash_data: { "id": string; "image": string; "title": string; }[];
  slides: { 'title': string; 'bg_image': string}[];

  @ViewChild('mapContainer') mapContainer: ElementRef;
  map: any;
  id: any;
  user_long: any;
  user_lat: any;
  got_values: any;

  constructor(public events: Events, public platform: Platform, public menuCtrl: MenuController , private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public modalCtrl: ModalController) {
  //this.get_data();
  this.events.publish('user:login');
    if (this.platform.is('android')) {
      console.log('I am an android Device!');
    }
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for User email:" + data);
        this.user_email = data;

        if( this.user_email === null || this.user_email === 'undefined')
        {
          let alert = this.alertCtrl.create({
            title: 'Restriction Error',
            subTitle: 'Facebook is restricting User Email, To Continue change your settings',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(UserselectPage);
        }

        else{
          this.get_data();
        }

      },
      error => console.error(error)
      );

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
    //this.events.publish('user:login');
    //this.activeMenu = 'menu1';
    this.menuCtrl.open();
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


  get_storage_markers()
  {

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
              mapTypeId: google.maps.MapTypeId.ROADMAP,     
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
      var iconBase = 'https://purpledimes.com/BoobaJob/WebServices/image/';         
      var dogwalkMarker = new google.maps.Marker({
        position: position,
        title: marker.name,
        icon: iconBase + 'new_image_marker.png'
      });
      var dogwalkMarker = new google.maps.Marker({position: position, title: marker.title, location_name: marker.location_name, id : marker.id , event_type : marker.event_type, icon: dogwalkMarker.icon  , event_time:marker.event_time, event_date : marker.event_date, event_description : marker.event_description});
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