import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JobimagemodalPage } from '../jobimagemodal/jobimagemodal';

@Component({
  selector: 'page-view-active-job',
  templateUrl: 'view-active-job.html',
})
export class ViewActiveJobPage {
  project_id: any;
  apiUrl: string;
  posts: any;
  pr_value: any;
  provider_email: any;

  constructor(private view: ViewController, public modalCtrl: ModalController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http){
    this.project_id = this.navParams.get('project_id');
    this.pr_value = this.navParams.get('value');
    this.fetchdata();
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.provider_email = data;
      },
      error => console.error(error)
    );
    }


  close() {
    this.view.dismiss();
  }

  upload(project_id :  string)
  {
    var value = '1';
    const modal = this.modalCtrl.create(JobimagemodalPage, {project_id , provider_email : this.provider_email, value });
    modal.present();
  }

  upload1(project_id :  string)
  {
    var value = '2';
    const modal = this.modalCtrl.create(JobimagemodalPage, {project_id , provider_email : this.provider_email, value });
    modal.present();
  }

  upload2(project_id :  string)
  {
    var value = '3';
    const modal = this.modalCtrl.create(JobimagemodalPage, {project_id , provider_email : this.provider_email, value });
    modal.present();
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

      check_status()
      {
        let loader = this.loadingCtrl.create({
          content: "Checking Status..."
        });
        loader.present();
    
        this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/check_status_comp_job.php?id=' + this.project_id;
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
