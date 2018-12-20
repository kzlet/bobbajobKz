import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-nanny',
  templateUrl: 'nanny.html',
})
export class NannyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NannyPage');
  }
  home(){
    this.navCtrl.push(HomePage)
  }

}
