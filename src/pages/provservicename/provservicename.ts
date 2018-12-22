import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  email: any = 'allan@gmail.com';
  per = 'HOUR';
  work_exp: any;

  resume_value: any = '0';
  passport_value: any = '0';
  paermit_value: any = '0';
  address_value: any = '0';

  constructor(private fileTransfer: FileTransferObject, private fileChooser: FileChooser, private transfer: FileTransfer, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    // this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvservicenamePage');

  }

  send() {
   console.log(this.email);
   console.log(this.past_exp);
   console.log(this.resume_value);
   console.log(this.passport_value);
   console.log(this.paermit_value);
   console.log(this.address_value);

    if (this.email === undefined || this.past_exp === undefined || this.resume_value === '0' || this.passport_value === '0' || this.paermit_value === '0' || this.address_value === '0') {
      let alert = this.alertCtrl.create({
        title: 'All fields are required',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Validating Experiences..."
      });
      loader.present();
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/update_exp.php?email=' + this.email + '&past_exp=' + this.past_exp;
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          loader.dismiss();
          console.log(data);
          var status = data.Status;
          if (status === 'failed') {
            let alert = this.alertCtrl.create({
              title: 'Uploading failed ! Try again later',
              buttons: ['OK']
            });
            alert.present();
          }
          else {
            this.uploadresume();    // to upload file to serevr
            this.uploadpassport();
            this.uploadcurrent_address();
            this.uploadwork_permit();
          }
        }, error => {
          console.log(error);
        });
    }

  }


  get_resume() {
    this.resume_value = '1';
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.nativeStorage.setItem('resume', uri)
          .then(
            () => console.log('Resume Stored!'),
            error => console.error('Error storing item', error)
          );

      })
      .catch(e => console.log(e));
  }

  get_passport() {
    this.passport_value = '1';
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.nativeStorage.setItem('passport', uri)
          .then(
            () => console.log('Resume Stored!'),
            error => console.error('Error storing item', error)
          );

      })
      .catch(e => console.log(e));
  }

  get_address() {
    this.paermit_value = '1';
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.nativeStorage.setItem('current_address', uri)
          .then(
            () => console.log('Resume Stored!'),
            error => console.error('Error storing item', error)
          );

      })
      .catch(e => console.log(e));
  }

  get_permit() {
    this.address_value = '1';
    this.fileChooser.open()
      .then(uri => {
        console.log(uri)
        this.nativeStorage.setItem('work_permit', uri)
          .then(
            () => console.log('Resume Stored!'),
            error => console.error('Error storing item', error)
          );

      })
      .catch(e => console.log(e));
  }


  uploadresume() {
    this.nativeStorage.getItem('resume')
      .then(
        data => {
          console.log("Checking for resume:" + data);
          this.uri = data;
          console.log(this.uri)
          var targetPath = this.uri
          var filename = this.uri;
          var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "application/pdf",
            headers: {}
          };
          const fileTransfer: FileTransferObject = this.transfer.create();
          let loadingCtrl = this.loadingCtrl.create({
            content: 'Uploading Resume...',
          });
          loadingCtrl.present();
          this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_resume.php?email=" + this.email;
          console.log(this.url2)
          fileTransfer.upload(this.uri, this.url2, options).then(data => {
            loadingCtrl.dismissAll()
            console.log("image uploaded");
            console.log("data", data)
          }, err => {
            loadingCtrl.dismissAll()
            console.log("Failed uploading image", err);
          });
        },
        error => console.error(error)
      );

  }

  uploadpassport() {
    this.nativeStorage.getItem('passport')
      .then(
        data => {
          console.log("Checking for passport:" + data);
          this.uri = data;
          console.log(this.uri)
          var targetPath = this.uri
          var filename = this.uri;
          var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: { 'fileName': filename }
          };
          const fileTransfer: FileTransferObject = this.transfer.create();
          let loadingCtrl = this.loadingCtrl.create({
            content: 'Uploading Passport...',
          });
          loadingCtrl.present();
          this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_passport.php?email=" + this.email;
          console.log(this.url2)
          fileTransfer.upload(this.uri, this.url2, options).then(data => {
            loadingCtrl.dismissAll()
            console.log("image uploaded");
            console.log("data", data)
          }, err => {
            loadingCtrl.dismissAll()
            console.log("Failed uploading image", err);
          });
        },
        error => console.error(error)
      );
  }

  uploadcurrent_address() {
    this.nativeStorage.getItem('current_address')
      .then(
        data => {
          console.log("Checking for current_address:" + data);
          this.uri = data;
          console.log(this.uri)
          var targetPath = this.uri
          var filename = this.uri;
          var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: { 'fileName': filename }
          };
          const fileTransfer: FileTransferObject = this.transfer.create();
          let loadingCtrl = this.loadingCtrl.create({
            content: 'Uploading Address Document...',
          });
          loadingCtrl.present();
          this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_address.php?email=" + this.email;
          console.log(this.url2)
          fileTransfer.upload(this.uri, this.url2, options).then(data => {
            loadingCtrl.dismissAll()
            console.log("image uploaded");
            console.log("data", data)
          }, err => {
            loadingCtrl.dismissAll()
            console.log("Failed uploading image", err);
          });
        },
        error => console.error(error)
      );

  }
  uploadwork_permit() {
    this.nativeStorage.getItem('work_permit')
      .then(
        data => {
          console.log("Checking for work_permit:" + data);
          this.uri = data;
          console.log(this.uri)
          var targetPath = this.uri
          var filename = this.uri;
          var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpeg",
            params: { 'fileName': filename }
          };
          const fileTransfer: FileTransferObject = this.transfer.create();
          let loadingCtrl = this.loadingCtrl.create({
            content: 'Uploading Work Permit...',
          });
          loadingCtrl.present();
          this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_permit.php?email=" + this.email;
          console.log(this.url2)
          fileTransfer.upload(this.uri, this.url2, options).then(data => {
            loadingCtrl.dismissAll()
            console.log("image uploaded");

         this.update_status();
            console.log("data", data)
          }, err => {
            loadingCtrl.dismissAll()
            console.log("Failed uploading image", err);
          });
        },
        error => console.error(error)
      );
  }

update_status()
{
  this.url2 = "https://purpledimes.com/BoobaJob/WebServices/update_status.php?email=" + this.email;
  this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          if(data.status === 'success')
          {
            let alert = this.alertCtrl.create({
              title: 'Profile Completed Successfully! Login to Proceed',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.push(SerloginPage);
          }
          else
          {

          }
        },
        error => console.error(error)
      );
}


}
