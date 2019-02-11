import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JobimagemodalPage } from '../jobimagemodal/jobimagemodal';

@Component({
  selector: 'page-view-active-job',
  templateUrl: 'view-active-job.html',
})
export class ViewActiveJobPage {
  project_id: any;
  apiUrl: string;
  posts: any;
  pr_value: any;
  provider_email: any;
  client_email: any;
  imog: any;
  image_status: any;
  rate_status: any;
  poster: any;
  posterd: any;
  review_status: any;

  constructor(private view: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.project_id = this.navParams.get('project_id');
    this.pr_value = this.navParams.get('value');
    this.fetchdata();
    this.check_image_status();
    this.check_rate_status();
    this.check_review_status();
    this.nativeStorage.getItem('provider_email')
      .then(
        data => {
          console.log("Checking for City name:" + data);
          this.provider_email = data;
        },
        error => console.error(error)
      );
  }


  close() {
    console.log("Clicked");
    this.view.dismiss();
  }

  upload() {
    var value = '1';
    const modal = this.modalCtrl.create(JobimagemodalPage, { project_id: this.project_id, provider_email: this.provider_email, value });
    modal.onDidDismiss(data => {
      this.check_image_status();
    });
    modal.present();
  }

  upload1() {
    var value = '2';
    const modal = this.modalCtrl.create(JobimagemodalPage, { client_email: this.client_email, provider_email: this.provider_email, value, project_id: this.project_id });
    modal.onDidDismiss(data => {
      this.check_rate_status();
    });
    modal.present();
  }

  upload2() {
    var value = '3';
    const modal = this.modalCtrl.create(JobimagemodalPage, { client_email: this.client_email, provider_email: this.provider_email, value, project_id: this.project_id });
    modal.onDidDismiss(data => {
      this.check_review_status();
    });
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  fetchdata() {
    let loader = this.loadingCtrl.create({
      content: "Loading Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/find_poster.php?id=' + this.project_id;
    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;

        this.client_email = this.posts.user_email;

        this.posts = Array.of(this.posts);
        loader.dismiss();
        console.log(this.posts);

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  check_status() {
    let loader = this.loadingCtrl.create({
      content: "Checking Status..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_status_comp_job.php?id=' + this.project_id;
    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        this.posts = Array.of(this.posts);
        loader.dismiss();
        console.log(this.posts);

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  check_image_status() {
    let loader = this.loadingCtrl.create({
      content: "Checking Status..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_image_status.php?project_id=' + this.project_id;
    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.imog = data;
        this.image_status = this.imog.Status
        console.log(this.image_status);
        loader.dismiss();
        // console.log(this.imog);

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  check_rate_status() {
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_rate_status.php?project_id=' + this.project_id;
    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.poster = data;
        this.rate_status = this.poster.rate_client;
        console.log(this.rate_status);

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  check_review_status() {

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_review_status.php?project_id=' + this.project_id;
    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posterd = data;
        this.review_status = this.posterd.review_client;
        console.log(this.review_status);

      }, error => {
        console.log(error); // Error getting the data

      });
  }
}
