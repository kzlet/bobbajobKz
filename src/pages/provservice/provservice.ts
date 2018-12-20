import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProvservicenamePage } from '../provservicename/provservicename';
import { SerregisterPage } from '../serregister/serregister';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-provservice',
  templateUrl: 'provservice.html',
})
export class ProvservicePage {

  apiUrls: string;
  email: any;
  post: any;
  constructor( private http: Http, private nativeStorage: NativeStorage, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvservicePage');
  }
  sendto1()
  {
    this.navCtrl.push(ProvservicenamePage);
  }

  back3()
  {
    this.navCtrl.push(SerregisterPage);
  }

  showsub() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Sub-Category');

    alert.addInput({
      type: 'radio',
      label: 'Daily',
      value: 'daily',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Weekly',
      value: 'weekly',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'Monthly',
      value: 'monthly',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.post = data;
  
      //   console.log("Data:" + this.post);
      //   this.apiUrls='http://secedu.info/mycity/catupdate.php?email=' + this.email +'&category=' + this.post;
  
      //   console.log(this.apiUrls)
      //   this.http.get(this.apiUrls).map(res => res.json())
      //   .subscribe(data => {
      // console.log(data)
      //   }),error=>{
      
      //   }
      }
    });
    alert.present();
  }


  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');

    alert.addInput({
      type: 'radio',
      label: 'My Laundry',
      value: 'laundry',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'My Car',
      value: 'car',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My Architect',
      value: 'architect',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My Home & Office Services',
      value: 'home',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My Graphic Designer',
      value: 'graphic',
       checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My IT',
      value: 'it',
       checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My Fitness',
      value: 'fitness',
       checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'My Beauty consultant',
      value: 'beauty',
       checked: false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Teacher',
      value: 'teacher',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Nanny',
      value: 'nanny',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Car Lift',
      value: 'carlift',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Chef',
      value: 'chef',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Hobby',
      value: 'hobby',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My DJ',
      value: 'dj',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Sales Executive',
      value: 'sales',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Lawyer',
      value: 'lawyer',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Fashionista',
      value: 'fashionista',
      checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Shopper',
      value: 'shopper',
       checked : false
    });

    alert.addInput({
      type: 'radio ',
      label: 'My Pet',
      value: 'pet',
       checked : false
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.post = data;

        this.nativeStorage.setItem('cat', this.post)
        .then(
          () => console.log('cat Stored!'),
          error => console.error('Error storing item', error)
        );

  
        console.log("Data:" + this.post);
        this.apiUrls='http://secedu.info/mycity/catupdate.php?email=' + this.email +'&category=' + this.post;
  
        console.log(this.apiUrls)
        this.http.get(this.apiUrls).map(res => res.json())
        .subscribe(data => {
      console.log(data)
        }),error=>{
      
        }
      }
    });
    alert.present();
  }

}
