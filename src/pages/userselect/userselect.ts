import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { SerloginPage } from '../serlogin/serlogin';
import { UserloginPage } from '../userlogin/userlogin';


@Component({
  selector: 'page-userselect',
  templateUrl: 'userselect.html',
})
export class UserselectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserselectPage');
  }

  back()
  {
    this.navCtrl.push(IntroPage);
  }

  next()
  {
    this.navCtrl.push(SerloginPage);
  }
  user()
  {
    this.navCtrl.push(UserloginPage);
  }
}
