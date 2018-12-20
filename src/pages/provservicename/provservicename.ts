import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProvservicePage } from '../provservice/provservice';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { SerloginPage } from '../serlogin/serlogin';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';



@Component({
  selector: 'page-provservicename',
  templateUrl: 'provservicename.html',
})
export class ProvservicenamePage {

  uri: any;
  url2: string;
  cat: any;
  special_condition: any;
  price: any;
  past_exp: any;
  q_name: any;
  apiUrl: string;
  email: any;
  per = 'HOUR';
  // private dirs:any;

  constructor(private fileTransfer: FileTransferObject, private fileChooser: FileChooser, private transfer: FileTransfer, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
 //   const fileTransfer: FileTransferObject = this.transfer.create();
    this.nativeStorage.getItem('email')
      .then(
        data => {
          console.log("Checking for City name:" + data);
          this.email = data;
        },
        error => console.error(error)
      );

    this.nativeStorage.getItem('cat')
      .then(
        data => {
          console.log("Checking for City name:" + data);
          this.cat = data;
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvservicenamePage');

  }


  back4() {
    this.navCtrl.push(ProvservicePage);
  }

  send() {

    if (this.email === undefined) {
      let alert = this.alertCtrl.create({
        title: 'Oops something went wrong ! Reload Application',
        buttons: ['OK']
      });
      alert.present();
    }

    else if (this.q_name === undefined || this.past_exp === undefined || this.price === undefined || this.special_condition === undefined) {

      let alert = this.alertCtrl.create({
        title: 'All fields are required',
        buttons: ['OK']
      });
      alert.present();

    }
    else {

      let loader = this.loadingCtrl.create({
        content: "Updating Prices..."
      });
      loader.present();

      this.apiUrl = 'http://secedu.info/mycity/setprice.php?email=' + this.email + '&category=' + this.cat + '&price=' + this.price;


      var data = { email: this.email, price: this.price };
      console.log(data);


      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          loader.dismiss();

          console.log(data);

          var status = data.Status;

          if (status === 'failed') {
            let alert = this.alertCtrl.create({
              title: 'Updation failed ! Server Problem',
              buttons: ['OK']
            });
            alert.present();
          }
          else {

            let alert = this.alertCtrl.create({
              title: 'Pricing Updated Successfully',
              buttons: ['OK']
            });
            alert.present();


          }
        }, error => {
          console.log(error);// Error getting the data
        });



      let loader2 = this.loadingCtrl.create({
        content: "Updating Experiences..."
      });
      loader.present();

      this.apiUrl = 'http://secedu.info/mycity/expupdate.php?email=' + this.email + '&q_name=' + this.q_name + '&past_exp=' + this.past_exp + '&price=' + this.price + '&special_condition=' + this.special_condition;


      var newdata = { email: this.email, q_name: this.q_name, past_exp: this.past_exp, price: this.price, special_condition: this.special_condition };
      console.log(newdata);


      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          loader2.dismiss();

          console.log(newdata);

          var status = data.Status;

          if (status === 'failed') {
            let alert = this.alertCtrl.create({
              title: 'Updation failed ! Server Problem',
              buttons: ['OK']
            });
            alert.present();
          }
          else {

            this.uploadImage();    // to upload file to serevr

            let alert = this.alertCtrl.create({
              title: 'Experience Updated Successfully ! Login to proceed',
              buttons: ['OK']
            });
            alert.present();

            this.navCtrl.push(SerloginPage);

          }
        }, error => {
          console.log(error);// Error getting the data
        });
    }

  }


  uploadresume() {
   // this.q_name = 'abc123';
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.nativeStorage.setItem('uri', uri)
        .then(
          () => console.log('uri Stored!'),
          error => console.error('Error storing item', error)
        );
         
      })
      .catch(e => console.log(e));
  }

 upload()
 {
  
  this.nativeStorage.getItem('uri')
  .then(
    data => {
      console.log("Checking for uri name:" + data);
      this.uri = data;
    },
    error => console.error(error)
  );

  const fileTransfer: FileTransferObject = this.transfer.create();
  this.url2 = "http://secedu.info/mycity/uploads.php?email=" + this.email +'&q_name=' + this.q_name;

  fileTransfer.upload(this.uri, this.url2)

 // fileTransfer.upload(uri, this.url2, options1, trustAllHosts)

    //  fileTransfer.upload(uri, "http://secedu.info/mycity/uploads.php?email=" + this.email, options1)
    .then((data) => {
      // success
      alert("success" + JSON.stringify(data));
      console.log("success" + JSON.stringify(data));

    }, (err) => {
      // error
      alert("error" + JSON.stringify(err));
      console.log("error" + JSON.stringify(err));
    });
 }


 sample()
 {
 // this.q_name = 'abc123';
  this.fileChooser.open()
  .then(uri => {
    console.log(uri)

  // const fileTransfer: FileTransferObject = this.transfer.create();
  //   let options: FileUploadOptions = {
  //      fileKey: 'file',
  //      fileName: 'name.pdf',
  //      headers: ({'Content-Type': 'multipart/form-data'})
      
  //   }
  //   this.url2 = "http://secedu.info/mycity/uploads.php?email=" + this.email +'&q_name=' + this.q_name;

  //   fileTransfer.upload(uri, this.url2 , options)
  //    .then((data) => {
  //      console.log("Success");
  //    }, (err) => {
  //     console.log("Error:" + JSON.stringify(err));
  //    })
    })
    .catch(e => console.log(e));
  }


  public uploadImage() {
   // this.q_name = 'abc123';
    this.nativeStorage.getItem('uri')
  .then(
    data => {
      console.log("Checking for uri name:" + data);
      this.uri = data;
  

    console.log(this.uri)
    var targetPath = this.uri
  
    
    var filename = this.uri;
  
    var options = {
      fileKey: "file",
      fileName:filename,
      chunkedMode: false,
      mimeType: "application/pdf",
      headers: {}
    };
  
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let loadingCtrl = this.loadingCtrl.create({
      content: 'Validating Resources...',
    });
    loadingCtrl.present();
   
    this.url2 = "http://secedu.info/mycity/upload.php?email=" + this.email + '&q_name=' + this.q_name;
   
      console.log(this.url2)

      fileTransfer.upload(this.uri, this.url2, options).then(data => {
       
      loadingCtrl.dismissAll()
   
      console.log("image uploaded");
      console.log("data",data)
    }, err => {
      loadingCtrl.dismissAll()
      //this.presentToast('Error while uploading file.');
      console.log("Failed uploading image", err);
    });
  },
  error => console.error(error)
);
  
  }
 

}
