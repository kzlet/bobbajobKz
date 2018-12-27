import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-job-history',
  templateUrl: 'job-history.html',
})
export class JobHistoryPage {

  archive : any = "Going";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobHistoryPage');
  }

}
