import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RateproviderPage } from '../rateprovider/rateprovider';

@Component({
  selector: 'page-reviewprovider',
  templateUrl: 'reviewprovider.html',
})
export class ReviewproviderPage {
  project_id: any;
  apiUrl: string;
  posts: any;

  constructor(public modalCtrl: ModalController, public alertCtrl : AlertController, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.project_id = this.navParams.get('project_id');
    this.get_inprogress_jobs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewproviderPage');
  }

  get_inprogress_jobs() 
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Status..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_assigned_user.php?project_id=' + this.project_id;

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        console.log(this.posts);
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  complete_job(provider_email : string, project_id : string, provider_name : string)
  {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure the Job is finished ?',
      message: 'Once completed there is no going back...',
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
            const modal = this.modalCtrl.create(RateproviderPage, {provider_email , project_id, provider_name});
            modal.present();
          }
        }
      ]
    });
    confirm.present();
  }

}
