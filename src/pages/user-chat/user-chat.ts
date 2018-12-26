import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-user-chat',
  templateUrl: 'user-chat.html',
})
export class UserChatPage {
  client_email: any;
  playerid: any;
  title: any;
  provider_name: any;
  provider_email: any;
  message:any='';
  sent:any;
  showMsg:{id:any, sender:any,rec:any}[]
  msg: any;
  rec: boolean;
  sender: boolean;
  interval: any;
  timer: any;
  fetch: string;
  apiUrls: string;
  client_name: any;
  sub: Subscription;

  constructor(public view: ViewController, private loadingCtrl: LoadingController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.provider_email = this.navParams.get('provider_email');
    this.provider_name = this.navParams.get('name');
    this.title = this.navParams.get('title');
    this.playerid = this.navParams.get('playerid');
    this.client_email = this.navParams.get('client_email');
    this.client_name = this.navParams.get('client_name');
    //get messages
    this.fetchmsgs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserChatPage');
  }

  onPageWillLeave()
  {
    this.sub.unsubscribe();
    console.log("Unsubscribed");
  }

  close() {
    this.view.dismiss();
    this.sub.unsubscribe();
    console.log("Unsubscribed");
  }

  fetchmsgs(){  //myid = client id & id is provider id
    this.sub = Observable.interval(1000)
    .subscribe((val) => {
      this.fetch='https://purpledimes.com/BoobaJob/WebServices/chats.php?client_email=' +this.client_email + '&provider_email=' + this.provider_email;
 
       console.log(this.fetch)
 
       this.http.get(this.fetch).map(res => res.json())
       .subscribe(data => {
 
         console.log("data",data)
 
        this.sent=data; 
 
        this.showMsg=[];
        for(var i in this.sent){
        console.log("here")
        if(this.client_email === this.sent[i].client_email){
        console.log("sender:",this.sent[i].client_email);
        console.log("reciever:",this.sent[i].provider_email);
        
        this.showMsg.push({id:this.sent[i].id,sender:this.sent[i].message,rec:''})
        }
        else{
         this.showMsg.push({id:this.sent[i].id,sender:'',rec:this.sent[i].message})
        }
 
        }
        console.log("showMsg",this.showMsg)
       });
 
      });
    
   }
 
   sendMessage(){
 
     if(this.message ===''){
       console.log("empty")
     }
     else{
       let time = new Date().toLocaleTimeString()
       let date = new Date().toLocaleDateString()
       this.apiUrls='https://purpledimes.com/BoobaJob/WebServices/sendMessage.php?client_email=' +this.client_email + '&provider_email=' + this.provider_email + '&message=' + this.message + '&time=' + time + '&date=' + date +'&provider_name=' + this.provider_name + '&client_name=' + this.client_name ;
   
     console.log(this.apiUrls)
     this.http.get(this.apiUrls).map(res => res.json())
     .subscribe(data => {
   console.log(data)
    
   this.sent=data
   this.message="";
     }),error=>{
   
     }
   }
   }

}
