import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SerloginPage } from '../serlogin/serlogin';
import { UserloginPage } from '../userlogin/userlogin';


@Component({
  selector: 'page-userselect',
  templateUrl: 'userselect.html',
})
export class UserselectPage {

  buttonColor: string = "transparent";
  buttonColor2: string = "#0077c8";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserselectPage');
    let elements = document.querySelectorAll(".tabbar");

    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }
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
