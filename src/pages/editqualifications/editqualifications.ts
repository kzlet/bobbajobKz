import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProvprofeditPage } from '../provprofedit/provprofedit';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';


@Component({
  selector: 'page-editqualifications',
  templateUrl: 'editqualifications.html',
})
export class EditqualificationsPage {

  apiUrl: string;
  special_condition: any;
  price: any;
  past_exp: any;
  q_name: any;
  email: any;
  constructor(private http: Http, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
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
    console.log('ionViewDidLoad EditqualificationsPage');
  }

  back4()
  {
    this.navCtrl.push(ProvprofeditPage);
  }

  send()
  {

    if (this.email === undefined) {
      let alert = this.alertCtrl.create({
          title: 'Oops something went wrong ! Reload Application',
          buttons: ['OK']
        });
        alert.present();
  }

  else if (this.q_name === undefined ||  this.past_exp === undefined || this.price === undefined || this.special_condition === undefined)
   {

    let alert = this.alertCtrl.create({
        title: 'All fields are required',
        buttons: ['OK']
      });
      alert.present();
 
    }
  else {

       let loader = this.loadingCtrl.create({
          content: "Updating Experiences..."
      });
      loader.present();

      this.apiUrl = 'http://secedu.info/mycity/expupdate.php?email=' + this.email + '&q_name=' + this.q_name + '&past_exp=' + this.past_exp + '&price=' + this.price + '&special_condition=' + this.special_condition ;

  
      var data = { email: this.email, q_name: this.q_name , past_exp: this.past_exp , price: this.price , special_condition: this.special_condition};
      console.log(data);
      
     
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
         loader.dismiss();

              console.log(data);
    
              var status = data.Status;

              if(status === 'failed')
              {
                let alert = this.alertCtrl.create({
                  title: 'Updation failed ! Server Problem',
                  buttons: ['OK']
                });
                alert.present();
              }
              else {

                let alert = this.alertCtrl.create({
                  title: 'Experience Updated Successfully ! Login to proceed',
                  buttons: ['OK']
                });
                alert.present();

                  this.navCtrl.push(ProvprofeditPage);
                  
              }
          }, error => {
              console.log(error);// Error getting the data
          });
  }

  }

}
