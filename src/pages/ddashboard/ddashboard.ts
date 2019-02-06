import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { UserselectPage } from '../userselect/userselect';
import { SerloginPage } from '../serlogin/serlogin';
import { UserloginPage } from '../userlogin/userlogin';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-ddashboard',
  templateUrl: 'ddashboard.html',
})
export class DdashboardPage {

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DdashboardPage');
  }

  signin() {
    this.navCtrl.push(UserselectPage);
  }

  find_jobs() {
    this.navCtrl.push(SerloginPage);
  }

  find_help() {
    this.navCtrl.push(UserloginPage);
  }

  logout()
  {
    this.platform.exitApp();
  }

  terms()
  {
    this.navCtrl.push(TermsPage);
  }
}
