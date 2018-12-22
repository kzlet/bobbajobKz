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

  constructor(private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
    this.get_data();
  }

  close() {
    this.view.dismiss();
  }

  apply() {
    console.log("Posted:"            + this.posted);
    console.log("Prices:"            + this.prices);
    console.log("Filter:"            + this.filter);
    console.log("Available:"         + this.available);
    console.log("Product Condition:" + this.buttonValue);
  }

  send()
  {
    this.view.dismiss();
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