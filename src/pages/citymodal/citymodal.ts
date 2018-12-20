import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserselectPage } from '../userselect/userselect';


@Component({
  selector: 'page-citymodal',
  templateUrl: 'citymodal.html',
})
export class CitymodalPage {
  items: any; 
  flag: any;
  city: any;
  countrylink: any;
  name: any;
  country: any;

  constructor(private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
   // this.city = this.navParams.get('city');
  //  this.flag = this.navParams.get('Flag');
   // console.log("Flag from city page"+ this.flag);
   this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
   // this.check();
  }

  close()
  {
    this.view.dismiss();
  }

  initializeItems() {
    this.items = [
      'Kabul',
      'Kandahar',
      'Jalalabad',
      'herat',
      'Mazar-e-Sharif',
      'Tirana',
      'Berat',
      'Durres',
      'Korce',
      'Fier',
      'Boumerdes',
      'Oran',
      'Tébessa',
      'Constantine',
      'New York',
      'California',
      'Texas',
      'San Francisco',
      'Vegas',
      'Pennsylvania',
      'Arizona',
      'California',
      'Ohio',
      'Colorado',
      'Abu Dhabi',
      'Sharjah',
      'Al Ain',
      'Ajman',
      'Al Gharbia',
      'Ras Al Khaimah',
      'Fujairah',
      'Dibba',
      'Um Al Quwain',
      'Riyadh',
      'Jeddah',
      'Mecca',
      'Medina',

      'Al-Ahsa',
      'Taif',
      'Dammam',
      'Buraidah',
      'Khobar',
      'Tabuk',
      'Karachi',
      'Lahore',
      'Hyderabad',
      'Faislabad',
      'Islamabad',
      'Rawalpindi',
      'Multan',
      'Gujranwala',
      'Peshawar',
      'Quetta',

      'New Delhi',
      'Mumbai',
      'Calcutta',
      'Bangalore',
      'Maharashtra',
      'Hyderabad',
      'Chennai',
      'Ahmadabad',
      'Visakhapatnam',
      'Surat',
      'Lucknow',
      'Kanpur',

      'Ghaziabad',
      'Nagpur',

      'Birmingham',
      'London',
      'Leeds-Bradford',
      'Manchester',
      'Liverpool-Birkenhead',
      'Glasgow',
      'Tyneside',
      'Sheffield',
      'Portsmouth-Southampton',
      'Nottingham-Derby',

      'Guangzhou',
      'Tokyo',
      'Istanbul',
      'Tianjin',
      'Lagos',
      'Beijing',
      'Shanghai',
      'Moscow',
      'São Paulo',
      'Jakarta',
      'Seoul',
      'Wuhan',
      'Kinshasa',
      'Cairo',

      'Dhaka',
      'Mexico City',
      'Bangkok',
      'Ho Chi Minh City',
      'Dongguan',
      'Chongqing',
      'Nanjing',

      'Tehran',
      'Mashhad',
      'Isfahan',
      'Karaj',
      'Tabriz',
      'Shiraz',
      'Qom',
      'Ahvaz',
      'Urmia',
      'Kermanshah',

      'Baghdad',
      'Basra',
      'Hillah',
      'Najaf',
      'Karbala',
      'Mosul',
      'Erbil',
      'Sulaymaniya',
      'Al Nasiriya',
      'Kirkuk',

      'Chongqing',
      'Chengdu',
      'Tianjin',
      'Jinan',
      'Nanjing',
      'Harbin',
      'Shantou',
      'Suzhou',
      'Qingdao',
      'Dongguan',
      'Quanzhou',
   
    ];
  }
 

  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
  
    // set val to the value of the ev target
    var val = ev.target.value;
  
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  
  data(item:string)
  {
  console.log(item);
  this.nativeStorage.setItem('city', item)
  .then(
    () => console.log('city Stored!'),
    error => console.error('Error storing item', error)
  );
  this.navCtrl.push(UserselectPage);
  }
  

}