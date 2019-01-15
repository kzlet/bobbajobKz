import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProvprofeditPage } from '../provprofedit/provprofedit';

@Component({
  selector: 'page-provsettings',
  templateUrl: 'provsettings.html',
})
export class ProvsettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvsettingsPage');
    
  }

  edit()
  {
     this.navCtrl.push(ProvprofeditPage);
  }

}
