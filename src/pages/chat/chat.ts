import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  recv: string;
  send: string;
  s_name: any;
  client_name: any;
  job_status: string;
  job_date: string;
  job_time: string;
  apiUrl: string;
  client: any;
  worker: any;
  catid: any;
  profile_picture: any;
  profileImg: any;
  msg: any;
  rec: boolean;
  sender: boolean;
  interval: any;
  timer: any;
  testArray: number[];
  fetch: string;
  sub: any;
  divelem: string;
  myid: any;
  apiUrls: string;
  id: any;
  number: any;
  name: any;
  public cname;
  message:any='';
  sent:any;
  showMsg:{id:any, sender:any,rec:any}[]

  constructor(private loadingCtrl: LoadingController, public alertCtrl: AlertController, private nativeStorage:NativeStorage, private http:Http, public navCtrl: NavController, public navParams: NavParams) {

    
    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.profile_picture = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('s_name')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.s_name = data;  //user email
      },
      error => console.error(error)
    ); 

    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.myid = data;
      },
      error => console.error(error)
    );

    this.id = this.navParams.get('email');
    this.profile_picture = this.navParams.get('profile_picture');
    this.worker = this.navParams.get('name');
    this.catid = this.navParams.get('catid');
    this.fetchmsgs();

  //  this.send = "Hello sender";
  //  this.recv = "Hello rec";
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  fetchmsgs(){
   this.timer= Observable.timer(1000,1000)
   this.interval=this.timer.subscribe((t)=>{
       console.log(t)
     this.fetch='http://secedu.info/mycity/chats.php?sender='+this.myid+"&reciever="+this.id;

      console.log(this.fetch)

      this.http.get(this.fetch).map(res => res.json())
      .subscribe(data => {

        console.log("data",data)

       this.sent=data; 

       this.showMsg=[];
       for(var i in this.sent){
       console.log("here")
       if(this.myid ===this.sent[i].sender){
       console.log("sender:",this.sent[i].sender)
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
    this.apiUrls='http://secedu.info/mycity/sendMessage.php?sender='+this.myid+'&reciever='+this.id+'&message='+this.message+'&time='+time+'&date='+date +'&worker='+this.worker +'&client='+this.client ;
  
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

  back()
  {
    this.navCtrl.setRoot(HomePage);
  }

  assign()
  {
    this.job_time = new Date().toLocaleTimeString();
    this.job_date = new Date().toLocaleDateString();
    this.job_status = 'assigned';
    
    this.client_name = this.worker;
    console.log("Name" + this.client_name);
   

    const confirm = this.alertCtrl.create({
      title: 'Do You want to Assign this Project?',
      message: 'Once agreed, this job will be assigned to user',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Agree clicked');


            let loader = this.loadingCtrl.create({
              content: "Assigning Project..."
          });
          loader.present();

          console.log("Time:" + this.job_time);
          console.log("Date:" + this.job_date);

           this.apiUrl = 'http://secedu.info/mycity/assignjob.php?email=' +  this.id + '&useremail=' + this.myid + '&job_time=' + this.job_time + '&job_date=' + this.job_date + '&job_status=' + this.job_status + '&name='+ this.client_name + '&category=' + this.catid + '&cust_name=' + this.s_name;
  
      
           var datas = { email: this.id, useremail: this.myid, job_time : this.job_time , job_date : this.job_date , job_status : this.job_status ,  name : this.client_name, category : this.catid, cust_name : this.s_name};
          
          console.log(datas);
         
          this.http.get(this.apiUrl).map(res => res.json())
            .subscribe(data => {
             loader.dismiss();
  
                  console.log(data);
        
                  var status = data.Status;
    
                  if(status === 'failed')
                  {
                    let alert = this.alertCtrl.create({
                      title: 'Assigning failed ! Server Problem',
                      buttons: ['OK']
                    });
                    alert.present();
                  }
                  else {

                    let alert = this.alertCtrl.create({
                      title: 'Task Assigning successful',
                      buttons: ['OK']
                    });
                    alert.present();
                    this.navCtrl.push(HomePage);
             
                  }
              }, error => {
                  console.log(error);// Error getting the data
              });


          }
        }
      ]
    });
    confirm.present();
  }
}
