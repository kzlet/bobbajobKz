import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Slides } from 'ionic-angular';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';

@Component({
  selector: 'page-laundry',
  templateUrl: 'laundry.html',
})
export class LaundryPage {
  @ViewChild(Slides) slides: Slides;

  data: any;
  title: any;
  id: any;
  job_description: any;
  location: any;
  Month : any;
  Date : any;
  budget: any;
  currentEvents: { year: number; month: number; date: number; }[];
  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
     this.title = this.navParams.get('title');
     this.id = this.navParams.get('id');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundryPage');
  }

  close() {
    this.view.dismiss();
  }

  goToSlide2() {
    this.slides.slideTo(1, 500);
  }

  goToSlide3() {
    this.slides.slideTo(2, 500);
  }

  next() {
    console.log(this.job_description);
    console.log(this.location);
    console.log(this.Month);
    console.log(this.Date);
    console.log(this.budget);
    console.log(this.title);
    console.log(this.id);

    this.navCtrl.setRoot(LaundrySamedayPage);
  }


}
