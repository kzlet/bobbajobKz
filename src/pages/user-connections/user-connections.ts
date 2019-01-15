import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserChatPage } from '../user-chat/user-chat';

@Component({
  selector: 'page-user-connections',
  templateUrl: 'user-connections.html',
})
export class UserConnectionsPage {
  client_email: any;
  apiUrl: string;
  posts: any;
  client_name: any;
  toasts: any;
  chat_value : any = '0';

  constructor(public modalCtrl: ModalController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('user_email')
    .then(
      data => {
        console.log("Checking for cleint email:" + data);
        this.client_email = data;
        this.get_caller_data();
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('user_name')
    .then(
      data => {
        console.log("Checking for cleint email:" + data);
        this.client_name = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserConnectionsPage');
  }

  get_caller_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_caller_data.php?client_email=' + this.client_email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        console.log(this.posts);


        if(this.posts.Status === 'failed')
        {
          let alert = this.alertCtrl.create({
            title: 'No Connections Yet !',
            buttons: ['OK']
          });
          alert.present();
          this.chat_value = '1';
          loader.dismiss();
        }
        else

          loader.dismiss();
      }, error => {
        console.log(error); 
      });
  }

  open_chatbox(provider_email: string, name : string, title : string, playerid : string, client_email: string, client_name : string)
  {
    const modal = this.modalCtrl.create(UserChatPage, {provider_email ,name ,title , playerid, client_email : this.client_email, client_name : this.client_name});
    modal.present();
  }
}
