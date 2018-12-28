import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  public first: string = '';
  posted: string;
  prices: string;
  available: string;
  filter: string;
  buttonValue: string;
  apiUrl: string;
  posts: any;
  job_category: any;
  budget: any;
  work_location: any;

  constructor(private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.get_data();
  }

  close() {
    this.view.dismiss();
  }

  send(job_category : string, budget : string, work_location : string)
  {
    let data = { job_category : this.job_category , budget : this.budget, work_location : this.work_location};
    this.view.dismiss(data);
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
        console.log(error); // Error getting the data
      });
  }


}