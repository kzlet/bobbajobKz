import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { PaymentPage } from '../payment/payment';

@Component({
  selector: 'page-viewjob',
  templateUrl: 'viewjob.html',
})
export class ViewjobPage {
  project_id: any;
  apiUrl: string;
  posts: any;
  rate : any = '3.75';
  client_email: any;
  payment_status : any = 'false';
  constructor(public modalCtrl: ModalController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.project_id = this.navParams.get('project_id');
    this.get_job_data();

    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for cleint email:" + data);
        this.client_email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewjobPage');
  }

  get_job_data()
  {
      let loader = this.loadingCtrl.create({
        content: "Loading Data..."
      });
      loader.present();
  
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_proposals.php?project_id=' + this.project_id;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
  
          this.posts = data;
      //    this.posts= Array.of(this.posts);
          console.log(this.posts);


          if(this.posts.Status === 'failed')
          {
            let alert = this.alertCtrl.create({
              title: 'No Proposals available Yet !',
              buttons: ['OK']
            });
            alert.present();
            loader.dismiss();
            this.navCtrl.pop();
          }
          else

            loader.dismiss();
        }, error => {
          console.log(error); 
        });
  }


  task_assign(provider_email :string, project_id: string, amount_charged : string, provider_name: string)
  {
    //assign_job.php
    console.log("Client Email:" + this.client_email);
    console.log("provider_email:" + provider_email);
    console.log("project_id:" + project_id);
    console.log("amount_charged:" + amount_charged);

    const confirm = this.alertCtrl.create({
      title: 'Are you sure you want to assign task to ' + provider_name + '?',
      message: 'By Clicking Ok, you will assign the project, first you have to completely deposite the payment',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            const modal = this.modalCtrl.create(PaymentPage, {project_id , amount_charged, client_email : this.client_email, provider_email});
            modal.present();
          }
        }
      ]
    });
    confirm.present();
  }
}
