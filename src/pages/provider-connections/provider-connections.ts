import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { UserChatPage } from '../user-chat/user-chat';
import { ProviderChatPage } from '../provider-chat/provider-chat';

@Component({
  selector: 'page-provider-connections',
  templateUrl: 'provider-connections.html',
})
export class ProviderConnectionsPage {
  client_email: any;
  apiUrl: string;
  posts: any;
  client_name: any;
  provider_email: any;
  provider_name: any;

  constructor(public modalCtrl: ModalController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for cleint email:" + data);
        this.provider_email = data;
        this.get_caller_data();
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('provider_name')
    .then(
      data => {
        console.log("Checking for cleint email:" + data);
        this.provider_name = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Provider Connection pages');
  }

  get_caller_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_user_caller_data.php?provider_email=' + this.provider_email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
    //    this.posts= Array.of(this.posts);
        console.log(this.posts);


        if(this.posts.Status === 'failed')
        {
          let alert = this.alertCtrl.create({
            title: 'No Connections Yet !',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
        }
        else

          loader.dismiss();
      }, error => {
        console.log(error); 
      });
  }

  open_chatbox(client_email: string, name : string, title : string, playerid : string, provider_email: string, client_name : string)
  {
    const modal = this.modalCtrl.create(ProviderChatPage, {client_email ,name ,title , playerid, provider_email : this.provider_email, provider_name : this.provider_name});
    modal.present();
  }
}

