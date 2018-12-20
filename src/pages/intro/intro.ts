import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, MenuController, ModalController, ViewController } from 'ionic-angular';
import { UserselectPage } from '../userselect/userselect';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { ModalPage } from '../modal/modal';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  codes: any;
  latitude: any;
  longitude: any;

  loclang: number;
  loclat: number;

  activeMenu: string;

  constructor(public modalCtrl: ModalController, public menuCtrl : MenuController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private nativeGeocoder: NativeGeocoder,  public platform: Platform, private geo : Geolocation, private alertCtrl: AlertController) {  
  this.menu1Active();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  goto()
  {
    this.navCtrl.push(UserselectPage);
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(ModalPage);
    profileModal.present();
  }


menu1Active() {
  console.log("Clicked menu 1");
  this.activeMenu = 'menu1';
  this.menuCtrl.enable(false, 'menu1');
  this.menuCtrl.enable(false, 'menu2');
  //this.menuCtrl.open(this.activeMenu);
}
menu2Active() {
  console.log("Clicked menu 2");
  this.activeMenu = 'menu2';
  this.menuCtrl.enable(false, 'menu1');
  this.menuCtrl.enable(true, 'menu2');
  this.menuCtrl.open(this.activeMenu);
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

               this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
               .then((result: NativeGeocoderReverseResult[]) =>{

                this.codes = result;

                console.log(this.codes);
              
                console.log(JSON.stringify(this.codes));

               // console.log(JSON.parse(result));

                console.log(this.codes[0].locality);

                console.log(this.codes[0].countryName);

                this.nativeStorage.setItem('city', this.codes[0].locality)
                  .then(
                    () => console.log('City Stored!'),
                    error => console.error('Error storing item', error)
                  );

                  this.nativeStorage.setItem('country', this.codes[0].countryName)
                  .then(
                    () => console.log('Country Stored!'),
                    error => console.error('Error storing item', error)
                  );

                  this.navCtrl.push(UserselectPage);

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
