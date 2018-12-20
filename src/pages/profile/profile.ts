import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LaundrySamedayPage } from '../laundry-sameday/laundry-sameday';
import { NamePage } from '../name/name';
import { PricePage } from '../price/price';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { EmailComposer } from '@ionic-native/email-composer';
import { SpecialPage } from '../special/special';
import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  s_name: any;
  client_name: any;
  job_status: any;
  job_date: any;
  job_time: any;
  useremail: any;
  catid: any;
  hosts: any;
  names: any[];
  number: any;
  clientmail: any;
  posts: any;
  apiUrl: string;
  id: any;
  profile_picture: any;
  email: any;
  current_time: any = new Date(new Date().getTime()).toLocaleDateString();
  constructor(public alertCtrl: AlertController, private emailComposer: EmailComposer, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
   
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for profile picture:" + data);
        this.useremail = data;  //user email
      },
      error => console.error(error)
    );

    
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
    
    
    this.email = this.navParams.get('email');
    this.catid = this.navParams.get('catid');

    console.log("catid" + this.catid);

    this.fetchdata();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  back()
  {
    this.navCtrl.push(LaundrySamedayPage, {survey_id : this.catid})
  }

  name(email : string)
  {
    this.navCtrl.push(NamePage, {email : email});
    console.log("Email:" + email);
  }

  price(email : string)
  {
    this.navCtrl.push(PricePage, {email : email});
    console.log("Email:" + email);
  }

  fetchdata()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/fetchdata.php?email=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
     this.posts = Array.of(this.posts); 

      this.clientmail = this.posts[0].email;
      this.number = this.posts[0].number;

      console.log("Mail" + this.clientmail);
      console.log("Number" + this.number);

      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }



    checkemail()
    {
      let email = {
        to: this.clientmail,
        cc: '',
        subject: 'My City Query',
        body: '',
        isHtml: true
      };
      
      // Send a text message using default options
      this.emailComposer.open(email);
    }

    // call()
    // {
    //   this.callNumber.callNumber(this.number , true)
    //  .then(res => console.log('Launched dialer!', res))
    //  .catch(err => console.log('Error launching dialer', err));
    // }

    chat(email : string, name : string, profile_picture: string)
    {
      this.navCtrl.push(ChatPage, {email : email, name : name, catid : this.catid, profile_picture : profile_picture });
    }

    special(email : string)
  {
    this.navCtrl.push(SpecialPage, {email : email});
    console.log("Email:" + email);
  }

  job(email : string, name : string)
  {
    this.job_time = new Date().toLocaleTimeString();
    this.job_date = new Date().toLocaleDateString();
    this.job_status = 'Pending';
    
    this.client_name = name;
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
    
          this.apiUrl = 'http://secedu.info/mycity/assignjob.php?email=' + this.email + '&useremail=' + this.useremail + '&job_time' + this.job_time + '&job_date' + this.job_date + '&job_status' + this.job_status + '&name'+ name + '&category' + this.catid + '&cust_name' + this.s_name;
    
      
          var datas = { email: this.email, useremail: this.useremail, job_time : this.job_time , job_date : this.job_date , job_status : this.job_status ,  name : name, category : this.catid, cust_name : this.s_name};
         
          console.log(datas);
           
          this.http.get(this.apiUrl).map(res => res.json())
            .subscribe(data => {
             loader.dismiss();
        
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
