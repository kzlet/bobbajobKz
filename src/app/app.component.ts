import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IntroPage } from '../pages/intro/intro';
import { ProvdashboardPage } from '../pages/provdashboard/provdashboard';
import { HistoryPage } from '../pages/history/history';
import { FavoritePage } from '../pages/favorite/favorite';
import { SerloginPage } from '../pages/serlogin/serlogin';
import { ProvchatPage } from '../pages/provchat/provchat';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvideractiveservicesPage } from '../pages/provideractiveservices/provideractiveservices';
import { ProvprofilePage } from '../pages/provprofile/provprofile';
import { ProviderjobPage } from '../pages/providerjob/providerjob';
import { UserloginPage } from '../pages/userlogin/userlogin';
import { UpdateuserpasswordPage } from '../pages/updateuserpassword/updateuserpassword';
import { UpdateprovpasswordPage } from '../pages/updateprovpassword/updateprovpassword';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import * as firebase from 'firebase';
import { UserselectPage } from '../pages/userselect/userselect';
import { LaundrySamedayPage } from '../pages/laundry-sameday/laundry-sameday';
import { FilterPage } from '../pages/filter/filter';
import { OneSignal } from '@ionic-native/onesignal';
import { ProvservicenamePage } from '../pages/provservicename/provservicename';

// Initialize Firebase  BoobaJob (Firebase project name)
var config = {
  apiKey: "AIzaSyAyXiH-4XapuocumZskNZM3l15XJ8bAeqc",
    authDomain: "bobbajob-f14c9.firebaseapp.com",
    databaseURL: "https://bobbajob-f14c9.firebaseio.com",
    projectId: "bobbajob-f14c9",
    storageBucket: "",
    messagingSenderId: "234181533936"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  profile_picture: any;
  name: any;
  s_name: any;
  number: string;
  onetimeloginprov: any;
  onetimelogin: any;
  auth: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UserselectPage;   // ProvdashboardPag    1= available     0 = Un-available    2 = busy  LaundrySamedayPage
  history = HistoryPage;
  fav = FavoritePage;
  serlogin = SerloginPage;
  chat = ProvchatPage;
  home  = HomePage;
  dash = ProvdashboardPage;
  provservices = ProvideractiveservicesPage;
  provprofile = ProvprofilePage;
  provjob = ProviderjobPage;
  userpass = UpdateuserpasswordPage;
  provpass = UpdateprovpasswordPage;
  userprof = UserprofilePage;

  pages: Array<{title: string, component: any}>;

  constructor(private oneSignal: OneSignal, private androidPermissions: AndroidPermissions,  public events: Events, private nativeStorage: NativeStorage, public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    //firebase.initializeApp(config);
    events.subscribe('user:login', () => {
      this.reload_user_data();
    });

    events.subscribe('provider:login', () => {
     // this.reload_provider_data();
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
   // this.getOnesignaldata();
    this.filePermission();
    this.nativeStorage.getItem('s_name')
    .then(
      data => {
        console.log("Checking s_name:" + data);
        this.s_name = data;
      },
      error => console.error(error)
    );
    this.nativeStorage.getItem('name')
    .then(
      data => {
        console.log("Checking s_name:" + data);
        this.name = data;
      },
      error => console.error(error)
    );


    this.nativeStorage.getItem('auth')
    .then(
      data => {
        console.log("Checking Auth value:" + data);
        this.auth = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('onetimelogin')
    .then(
      data => {
        console.log("Checking onetimelogin:" + data);
        this.onetimelogin = data;

      },
      error => console.error(error)
    );


    this.nativeStorage.getItem('onetimeloginprov')
    .then(
      data => {
        console.log("Checking onetimeloginprov:" + data);
        this.onetimeloginprov = data;

      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking onetimeloginprov:" + data);
        this.profile_picture = data;

      },
      error => console.error(error)
    );
  }

  filePermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE, this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);
  }

  reload_user_data() {
    console.log("User Data Refreshed");
    this.nativeStorage.getItem('user_name')
    .then(
      data => {
        console.log("Checking user_name:" + data);
        this.s_name = data;
      },
      error => console.error(error)
    );
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking user_email:" + data);
        this.name = data;
      },
      error => console.error(error)
    ); 
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  OnLoad(page: any)
  {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  reloaduser(){
  this.nav.push(UserloginPage);
  this.menuCtrl.close();
 
  }

  reloadprov(){
    this.nav.push(SerloginPage);
    this.menuCtrl.close();
  }

  logout()
  {
    let onetimelogin = 0;
    this.nativeStorage.setItem('onetimelogin', onetimelogin)
    .then(
      () => console.log('Successfully logged out'),
      error => console.error('Error storing item', error)
    );
    this.nav.setRoot(IntroPage);
  }


  logoutprov()
  {
    let onetimeloginprov = 0;
    this.nativeStorage.setItem('onetimeloginprov', onetimeloginprov)
    .then(
      () => console.log('Successfully logged out'),
      error => console.error('Error storing item', error)
    );
    this.nav.setRoot(IntroPage);
  }

  getOnesignaldata()
  {
    this.oneSignal.startInit('26a97309-9952-4593-b5d7-7bd884799045','234181533936');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
     // this.nav.push(LatestPage);
    });
    this.oneSignal.endInit();
 
    this.oneSignal.getIds().then(identity => {
     console.log(identity.userId + 'its USERID'); 
     this.nativeStorage.setItem('playerid', identity.userId)
       .then(
         () => console.log('UUI Stored!'),
         error => console.error('Error storing item', error)
       );
   });
  }
}
