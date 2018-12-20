import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {

  country: any;
  city: any;
  number: any;
  posts: any;
  apiUrl: string;
  name: any;
  email: any;
  constructor(public alertCtrl: AlertController, private http: Http, private loadingCtrl: LoadingController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('s_email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
        //this.fetchprice();

        let loader = this.loadingCtrl.create({
          content: "Loading Data..."
        });
        loader.present();
    
        this.apiUrl = 'http://secedu.info/mycity/getuserlogindetails.php?email=' + this.email;
         console.log(this.apiUrl);
    
         this.http.get(this.apiUrl).map(res => res.json())
         .subscribe(data => {
            
          this.posts = data;
          console.log(this.posts);
    
          this.name = this.posts[0].name;
          this.number = this.posts[0].number;
          this.city = this.posts[0].city;
          this.country = this.posts[0].country;
      
    
          console.log("name from posts" + this.name);
          console.log( this.number);
    
          loader.dismiss();
          console.log(this.posts);
     
          }, error => {
            console.log(error); // Error getting the data
      
          });

      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }

  signup() {
    if (this.name === undefined ||  this.number === undefined ||  this.city === undefined ||  this.country === undefined ) {

        let alert = this.alertCtrl.create({
            title: 'No Change Occured',
            buttons: ['OK']
          });
          alert.present();        
    }

    else {

      console.log("name from signup" + this.name);
      console.log( this.number);
      console.log( this.email);

         let loader = this.loadingCtrl.create({
            content: "Updating Profile..."
        });
        loader.present();

        this.apiUrl = 'http://secedu.info/mycity/userupdate.php?name=' + this.name + '&city='+ this.city + '&number=' + this.number + '&email=' + this.email + '&country=' + this.country;

    
        var data = { name: this.name, city: this.city, number : this.number, email: this.email , country: this.country };
        console.log(data);
       
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
           loader.dismiss();

                console.log("After upload" + JSON.stringify(data));
      
                var status = data.Status;

                if(status === 'success')
                {
                  let alert = this.alertCtrl.create({
                    title: 'Updated Successful',
                    buttons: ['OK']
                  });
                  alert.present();

                  this.nativeStorage.setItem('s_name', this.name)
                  .then(
                    () => console.log('Name Stored!'),
                    error => console.error('Error storing item', error)
                  );
          
                this.navCtrl.push(HomePage);

        }
              else
                {
                  let alert = this.alertCtrl.create({
                    title: 'Profile Updation Failed ! Server Problem',
                    buttons: ['OK']
                  });
                  alert.present();
                }
               
            }, error => {
                console.log(error);// Error getting the data
            });
    }
}

}
