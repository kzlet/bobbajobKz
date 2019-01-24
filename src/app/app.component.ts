import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ProvdashboardPage } from '../pages/provdashboard/provdashboard';
import { SerloginPage } from '../pages/serlogin/serlogin';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvprofilePage } from '../pages/provprofile/provprofile';
import { ProviderjobPage } from '../pages/providerjob/providerjob';
import { UserloginPage } from '../pages/userlogin/userlogin';
import { UpdateuserpasswordPage } from '../pages/updateuserpassword/updateuserpassword';
import { UpdateprovpasswordPage } from '../pages/updateprovpassword/updateprovpassword';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import * as firebase from 'firebase';
import { UserselectPage } from '../pages/userselect/userselect';
import { OneSignal } from '@ionic-native/onesignal';
import { MypostingsPage } from '../pages/mypostings/mypostings';
import { ViewjobPage } from '../pages/viewjob/viewjob';
import { UserConnectionsPage } from '../pages/user-connections/user-connections';
import { JobHistoryPage } from '../pages/job-history/job-history';
import { ProvidertabPage } from '../pages/providertab/providertab';
import { ProvprofeditPage } from '../pages/provprofedit/provprofedit';
import { LaundryPage } from '../pages/laundry/laundry';
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
  posting = MypostingsPage;
  serlogin = SerloginPage;
  home  = HomePage;
  userconn = UserConnectionsPage;
  dash = ProvdashboardPage;
  provprofile = ProvprofilePage;
  provjob = ProviderjobPage;
  userpass = UpdateuserpasswordPage;
  provpass = UpdateprovpasswordPage;
  userprof = UserprofilePage;

  pages: Array<{title: string, component: any}>;
  email: any;
  user_profile_pic: any;
  user_email: any;

  constructor(public alertCtrl : AlertController ,private oneSignal: OneSignal, private androidPermissions: AndroidPermissions,  public events: Events, private nativeStorage: NativeStorage, public menuCtrl: MenuController, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    //firebase.initializeApp(config);
    this.reload_user_data();
    events.subscribe('user:login', () => {
      this.reload_user_data();
    });

    events.subscribe('provider:login', () => {
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.getOnesignaldata();
    this.filePermission();
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
        this.user_email = data;
      },
      error => console.error(error)
    ); 
    this.nativeStorage.getItem('user_profile_pic')
    .then(
      data => {
        console.log("Checking user_profile_pic:" + data);
        this.user_profile_pic = data;
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
  this.nav.push(UserselectPage);
  this.menuCtrl.close();
 
  }

  reloadprov(){
    this.nav.push(UserselectPage);
    this.menuCtrl.close();
  }

  logout()
  {
     const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            this.menuCtrl.close();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            this.nav.setRoot(UserselectPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    confirm.present();
  }

  close()
  {
    this.menuCtrl.close();
  }

  logoutprov()
  {
    const confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
            this.menuCtrl.close();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Agree clicked');
            this.nav.setRoot(SerloginPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    confirm.present();
  }

  getOnesignaldata()
  {
    this.oneSignal.startInit('26a97309-9952-4593-b5d7-7bd884799045','234181533936');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
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
