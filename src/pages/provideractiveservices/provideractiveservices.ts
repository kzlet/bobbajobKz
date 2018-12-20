import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvservicePage } from '../provservice/provservice';
import { ProvdashboardPage } from '../provdashboard/provdashboard';

@Component({
  selector: 'page-provideractiveservices',
  templateUrl: 'provideractiveservices.html',
})
export class ProvideractiveservicesPage {

  category: string;
  price: string;
  activeMenu: string;
  posts: any;
  apiUrl: string;
  email: any;
  constructor(public alertCtrl: AlertController, public menuCtrl: MenuController, private loadingCtrl: LoadingController, private http: Http, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for email:" + data);
        this.email = data;
        this.getservices();
      },
      error => console.error(error)
    );

    // this.email = 'arsal@gmail.com';
    // this.category = 'My IT';
    // this.price = '1200';

  }

  addmore()
  {
    this.navCtrl.push(ProvservicePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvideractiveservicesPage');
  }

  do()
  {
  this.navCtrl.push(ProvdashboardPage);
  }

  getservices()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading your Profile..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/getservices.php?email=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
     // this.posts = Array.of(this.posts); 

      if(this.posts.length === 0)
      {
        alert("No Active Services Yet");
      }
  
      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
  }


  update(category : string)
  {
    this.category = category; 
    console.log("Category :" + this.category);

    const prompt = this.alertCtrl.create({
      title: 'Enter Price',
      message: "Enter a price to update",
      inputs: [
        {
          name: 'price',
          placeholder: 'Price'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.price = data.price;
            console.log(this.price);
    
            this.send();
          }
        }
      ]
    });
    prompt.present();
  }
    

  


  send()
  {
       let loader = this.loadingCtrl.create({
          content: "Updating Price..."
      });
      loader.present();



      this.apiUrl = 'http://secedu.info/mycity/updateprice.php?email=' + this.email + '&price=' + this.price + '&category=' + this.category ;

  
      var data = {  price: this.price , email: this.email, category : this.category};
      console.log(data);
      
     
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
         loader.dismiss();

              console.log(data);
    
              var status = data.Status;

              if(status === 'failed')
              {
                let alert = this.alertCtrl.create({
                  title: 'Updation failed ! Server Problem',
                  buttons: ['OK']
                });
                alert.present();
              }
              else {

                let alert = this.alertCtrl.create({
                  title: 'Price Updated Successfully !',
                  buttons: ['OK']
                });
                alert.present();

                  
              }
          }, error => {
              console.log(error);// Error getting the data
          });
 

  }

}
