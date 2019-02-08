import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-view-active-job',
  templateUrl: 'view-active-job.html',
})
export class ViewActiveJobPage {
  project_id: any;
  apiUrl: string;
  posts: any;
  pr_value: any;

  constructor(private view: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.project_id = this.navParams.get('project_id');
    this.pr_value = this.navParams.get('value');
    this.fetchdata();
    //this.check_status();
    }


  close() {
    this.view.dismiss();
  }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad ProfilePage');
    }
  
    fetchdata()
    {
      let loader = this.loadingCtrl.create({
        content: "Loading Profile..."
      });
      loader.present();
  
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/find_poster.php?id=' + this.project_id;
       console.log(this.apiUrl);
  
       this.http.get(this.apiUrl).map(res => res.json())
       .subscribe(data => {
          
        this.posts = data;
       this.posts = Array.of(this.posts); 
        loader.dismiss();
        console.log(this.posts);
   
        }, error => {
          console.log(error); // Error getting the data
    
        });
      }

}
