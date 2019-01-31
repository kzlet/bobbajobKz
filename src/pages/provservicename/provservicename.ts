import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
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
  work_exp: any;

  resume_value: any = '0';
  passport_value: any = '0';
  paermit_value: any = '0';
  address_value: any = '0';
  tests: any;
  resu: string;
  puri: string;
  auri: string;
  peuri: string;

  public resumeProgress : number = 0;
  public passportProgress : number = 0;
  public permitProgress : number = 0;
  public proofProgress : number = 0;

  constructor(private fileTransfer: FileTransferObject, private fileChooser: FileChooser, private transfer: FileTransfer, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
     this.email = this.navParams.get('email');
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
          }
        }, error => {
          console.log(error);
        });
    }

  }


  get_resume() {
    this.resume_value = '1';
    this.fileChooser.open()
      .then(ruri => {
        console.log(ruri);
        this.resu = 'resume uploaded';

        //progress bar
        setInterval(() => {
          if (this.resumeProgress < 100)
            this.resumeProgress += 1;
          else
            clearInterval(this.resumeProgress);
        }, 50);
        //

        this.nativeStorage.setItem('resume', ruri)
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
      .then(puri => {
        console.log(puri);
        this.puri = 'passport uploaded';

          //progress bar
          setInterval(() => {
            if (this.passportProgress < 100)
              this.passportProgress += 1;
            else
              clearInterval(this.passportProgress);
          }, 50);
          //


        this.nativeStorage.setItem('passport', puri)
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
      .then(auri => {
        console.log(auri);
        this.auri = 'address upload';

           //progress bar
           setInterval(() => {
            if (this.proofProgress < 100)
              this.proofProgress += 1;
            else
              clearInterval(this.proofProgress);
          }, 50);
          //

        this.nativeStorage.setItem('current_address', auri)
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
      .then(peuri => {
        console.log(peuri);
        this.peuri = 'permit uploaded';

            //progress bar
            setInterval(() => {
              if (this.permitProgress < 100)
                this.permitProgress += 1;
              else
                clearInterval(this.permitProgress);
            }, 50);
            //

        this.nativeStorage.setItem('work_permit', peuri)
          .then(
            () => console.log('Resume Stored!'),
            error => console.error('Error storing item', error)
          );

      })
      .catch(e => console.log(e));
  }


  // uploadresume() {
  //   this.nativeStorage.getItem('resume')
  //     .then(
  //       data => {
  //         console.log("Checking for resume:" + data);
  //         this.uri = data;
  //         console.log(this.uri)
  //         var targetPath = this.uri
  //         var filename = this.uri;
  //         var options = {
  //           fileKey: "file",
  //           fileName: filename,
  //           chunkedMode: false,
  //           mimeType: "application/pdf",
  //           headers: {}
  //         };
  //         const fileTransfer: FileTransferObject = this.transfer.create();
  //         let loadingCtrl = this.loadingCtrl.create({
  //           content: 'Uploading Resume...',
  //         });
  //         loadingCtrl.present();
  //         this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_resume.php?email=" + this.email;
  //         console.log(this.url2)
  //         fileTransfer.upload(this.uri, this.url2, options).then(data => {
  //           loadingCtrl.dismissAll()
  //           console.log("image uploaded");
  //           this.uploadpassport();
  //           console.log("data", data)
  //         }, err => {
  //           loadingCtrl.dismissAll()
  //           console.log("Failed uploading image", err);
  //         });
  //       },
  //       error => console.error(error)
  //     );

  // }

  uploadresume(){
    this.nativeStorage.getItem('resume')
    .then(
      data => {
        console.log("Checking for resume:" + data);
        this.uri = data;
        console.log(this.uri)
        var filename = this.uri;

    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'fileName': filename }
    }

    let loadingCtrl = this.loadingCtrl.create({
      content: 'Uploading Resume...',
    });
    loadingCtrl.present();
    this.url2 = "https://purpledimes.com/BoobaJob/WebServices/upload_resume.php?email=" + this.email;
    
    fileTransfer.upload(this.uri, this.url2, options).then(data => {
      loadingCtrl.dismissAll()
      console.log("File uploaded");
      this.uploadpassport();
      console.log("data", data)
    }, err => {
      loadingCtrl.dismissAll()
      console.log("Failed uploading file", err);
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
            this.uploadcurrent_address();
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
            this.uploadwork_permit();
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
      let loader = this.loadingCtrl.create({
        content: "Updating Profile..."
      });
      loader.present();
  
      this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/update_status.php?email=' + this.email;
  
      console.log(this.apiUrl);
  
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          loader.dismiss();
          this.tests = data;
          console.log("Status:" + this.tests.status);
          if (this.tests.status === 'success')
          {
            this.navCtrl.setRoot(SerloginPage);
          }
            
        }, error => {
          console.log(error); 
        });
}

}
