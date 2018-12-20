import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-updateuserpassword',
  templateUrl: 'updateuserpassword.html',
})
export class UpdateuserpasswordPage {

  apiUrl: string;
  email: any;
  conpassword: string;
  password: string;
  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, private nativeStorage: NativeStorage , public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.email = data;  //user email
      },
      error => console.error(error)
    );
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateuserpasswordPage');
  }


  back()
  {
    this.navCtrl.push(HomePage);
  }

  update()
  {
    console.log("Pass:" + this.password);
    console.log("Con Pass:" + this.conpassword);

    if(this.password === undefined || this.password === 'undefined' || this.password === '')
    {
      let alert = this.alertCtrl.create({
        title: 'Password Fields Cannot be Empty !',
        buttons: ['OK']
      });
      alert.present();
    }

    //updateserpass.php
    else 
    if (this.password === this.conpassword) {

      let loader = this.loadingCtrl.create({
        content: "Updating Password..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/updateuserpass.php?password=' + this.password + '&email=' + this.email;


    var data = { password: this.password, email: this.email };
    console.log(data);
   
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
       loader.dismiss();

            console.log("After upload" + JSON.stringify(data));
  
            var status = data.Status;

            if(status === 'success')
            {
              let alert = this.alertCtrl.create({
                title: 'Password Updated Successfully !',
                buttons: ['OK']
              });
              alert.present();
              this.navCtrl.push(HomePage);
            }
            else if (status === 'failure')
            {
              let alert = this.alertCtrl.create({
                title: 'Password Updation Failed ! Server Problem',
                buttons: ['OK']
              });
              alert.present();
            }
            
           
        }, error => {
            console.log(error);// Error getting the data
        });

  }

  else if(this.password != this.conpassword){

      let alert = this.alertCtrl.create({
          title: 'Password do not match',
          buttons: ['OK']
        });
        alert.present();   
 
  }
  else
  {
    let alert = this.alertCtrl.create({
      title: 'Internal Server Problem',
      buttons: ['OK']
    });
    alert.present();   
  }
  }
}
