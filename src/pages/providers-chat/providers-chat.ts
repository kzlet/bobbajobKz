import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-providers-chat',
  templateUrl: 'providers-chat.html',
})
export class ProvidersChatPage {

  apiUrls: string;
  fetch: string;
  interval: Subscription;
  timer: Observable<number>;
  reciever: any;
  id: any;
  client: any;
  worker: any;
  profile_picture: any;
  public cname;
  message:any='';
  sent:any;
  showMsg:{id:any, sender:any,rec:any}[]
  constructor(private nativeStorage:NativeStorage, private http:Http, public navCtrl: NavController, public navParams: NavParams)  {
    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.profile_picture = data;
      },
      error => console.error(error)
    );

    this.id = this.navParams.get('sender');

    this.worker = this.navParams.get('worker');

    this.client = this.navParams.get('client');

    this.reciever = this.navParams.get('reciever');

    this.fetchmsgs();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvidersChatPage');
  }

  fetchmsgs(){
    this.timer= Observable.timer(1000,1000)
    this.interval=this.timer.subscribe((t)=>{
        console.log(t)
      this.fetch='http://secedu.info/mycity/chats.php?sender='+this.id+"&reciever="+this.reciever;
 
       console.log(this.fetch)
 
       this.http.get(this.fetch).map(res => res.json())
       .subscribe(data => {
 
         console.log("data",data)
 
        this.sent=data; 
 
        this.showMsg=[];
        for(var i in this.sent){
        console.log("here")
        if(this.id ===this.sent[i].sender){
        console.log("sender id",this.sent[i].sender)
        this.showMsg.push({id:this.sent[i].id,sender:this.sent[i].message,rec:''})
 
        }
        else{
         this.showMsg.push({id:this.sent[i].id,sender:'',rec:this.sent[i].message})
        }
 
        }
        console.log("showMsg",this.showMsg)
       });
 
      })
    
   }
 
   sendMessage(){
 
     if(this.message ===''){
       console.log("empty")
     }
     else{
       let time = new Date().toLocaleTimeString()
       let date = new Date().toLocaleDateString()
     this.apiUrls='http://secedu.info/mycity/sendMessage.php?sender='+this.reciever+'&reciever='+this.id+'&message='+this.message+'&time='+time+'&date='+date +'&worker='+this.worker +'&client='+this.client;
   
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
