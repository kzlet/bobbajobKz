import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { ViewjobPage } from '../viewjob/viewjob';

@Component({
  selector: 'page-mypostings',
  templateUrl: 'mypostings.html',
})
export class MypostingsPage {
  activeMenu: string;
  postings : any = 'all';
  apiUrl: string;
  posts: any;
  email: any;
  coasts: any;
  constructor(private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for User email:" + data);
        this.email = data;
        this.get_All_jobs(); 
        this.get_inprogress_jobs();
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypostingsPage');
  }

  do()
  {
    this.activeMenu = 'menu1';
    this.menuCtrl.open(this.activeMenu);
  }

  get_All_jobs() 
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Jobs..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_my_jobs.php?user_email=' + this.email;

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        console.log(this.posts);

          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }


  get_inprogress_jobs() 
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Jobs..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_my_in_progress_jobs.php?user_email=' + this.email;

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.coasts = data;
        console.log(this.coasts);
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data
      });
  }

  view_job(project_id : string)
  {
    console.log("project_id" + project_id);
    this.navCtrl.push(ViewjobPage, {project_id : project_id}); 
  }


  check_status()
  {

  }
}
