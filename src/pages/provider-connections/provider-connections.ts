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
  chat_value : any = '0';
  toast: any;
  chatter: any;

  constructor(public modalCtrl: ModalController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Provider Connection pages');
  }

  ionViewWillEnter()
  {
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

  //https://purpledimes.com/BoobaJob/WebServices/get_last_chat_id_provider.php?client_email=allan@gmail.com&provider_email=shawn@gmail.com

  get_caller_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/sample_provider_chat.php?provider_email=' + this.provider_email;
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        
        console.log("Here" + JSON.stringify(this.posts));
 
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

  open_chatbox(client_email: string, name : string, title : string, playerid : string, provider_email: string, client_name : string)
  {
    const modal = this.modalCtrl.create(ProviderChatPage, {client_email ,name ,title , playerid, provider_email : this.provider_email, provider_name : this.provider_name});
    modal.present();
  }
}

