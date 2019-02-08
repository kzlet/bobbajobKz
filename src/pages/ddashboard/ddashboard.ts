import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { UserselectPage } from '../userselect/userselect';
import { SerloginPage } from '../serlogin/serlogin';
import { UserloginPage } from '../userlogin/userlogin';
import { TermsPage } from '../terms/terms';

//streaming media
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';

@Component({
  selector: 'page-ddashboard',
  templateUrl: 'ddashboard.html',
})
export class DdashboardPage {

  constructor(private streamingMedia: StreamingMedia, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DdashboardPage');
  }

  play_video()
  {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      orientation: 'landscape',
      shouldAutoClose: true,
      controls: true
    };
    
    this.streamingMedia.playVideo('https://purpledimes.com/BoobaJob/WebServices/image/videoplayback.mp4', options);
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
