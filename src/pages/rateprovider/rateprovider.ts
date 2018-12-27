import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-rateprovider',
  templateUrl: 'rateprovider.html',
})
export class RateproviderPage {
  provider_email: any;
  project_id: any;
  provider_name: any;
  rate : any = '0';

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.provider_email  = this.navParams.get('provider_email');
    this.project_id = this.navParams.get('project_id');
    this.provider_name = this.navParams.get('provider_name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateproviderPage');
  }

  close() {
    this.view.dismiss();
  }


}
