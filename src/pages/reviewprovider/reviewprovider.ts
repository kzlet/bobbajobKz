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
  project_id: any = '17';
  apiUrl: string;
  posts: any;
  rate : any = '3.5';
  constructor(public modalCtrl: ModalController, public alertCtrl : AlertController, private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.project_id = this.navParams.get('project_id');
    this.get_inprogress_jobs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewproviderPage');
  }

  get_inprogress_jobs() 
  {
   // this.project_id = '17';
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
            console.log("Post job function called");
            let loader = this.loadingCtrl.create({
              content: "Reviewing Job Status..."
            });
            loader.present();
            this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/update_job_status.php?project_id=' + this.project_id;  
            this.http.get(this.apiUrl).map(res => res.json())
              .subscribe(data => {
                console.log(data);
                var status = data.Status;
                if (status === 'success') {
                  loader.dismiss();
                  const modal = this.modalCtrl.create(RateproviderPage, {provider_email , project_id, provider_name});
                  modal.present();  
                }
                else {
                  loader.dismiss();
                }
              }, error => {
                console.log(error);
              });
          }
        }
      ]
    });
    confirm.present();
  }

}
