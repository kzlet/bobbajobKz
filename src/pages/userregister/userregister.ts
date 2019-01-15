import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController, ToastController, Events } from 'ionic-angular';
import { UserloginPage } from '../userlogin/userlogin';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//Camera options
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-userregister',
  templateUrl: 'userregister.html',
})
export class UserregisterPage {

  country: any;
  city: any;
  apiUrl: string;
  conpassword: any;
  password: any;
  number: any;
  email: any;
  name: any;
  url: string;
  imageURI: any;
  playerid: string;
  constructor(public events : Events, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserregisterPage');

    this.nativeStorage.getItem('playerid')
    .then(
      data => {
        console.log("Checking for playerid:" + data);
        this.playerid = data;
      },
      error => console.error(error)
    );
  }

  back()
  {
    this.navCtrl.push(UserloginPage);
    }

    reg()
    {
      this.navCtrl.push(UserloginPage);
    }

    goto2()
    {
      this.navCtrl.push(HomePage);
    }

    signup() {

      if (this.name === undefined ||  this.email === undefined || this.number === undefined || this.password === undefined) {
          let alert = this.alertCtrl.create({
              title: 'All fields are required',
              buttons: ['OK']
            });
            alert.present();
      }
      else if (this.password != this.conpassword) {
          let alert = this.alertCtrl.create({
              title: 'Passwords are not same',
              buttons: ['OK']
            });
            alert.present();
      }
  
      else {
  
           let loader = this.loadingCtrl.create({
              content: "User Registeration in Progress..."
          });
          loader.present();
  
          this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/userregister.php?name=' + this.name + '&password=' + this.password +'&email=' + this.email + '&number='+ this.number + '&playerid='+ this.playerid + '&city='+ this.city;
       
          this.http.get(this.apiUrl).map(res => res.json())
            .subscribe(data => {
             loader.dismiss();
  
                  console.log(data);
        
                  var status = data.Status;
  
                  if (status === 'exist') {
  
                      let alert = this.alertCtrl.create({
                          title: 'User already Exists',
                          buttons: ['OK']
                        });
                        alert.present();
                       
                      this.name='';
                      this.email='';
                      this.password='';
                      this.number='';
                      this.city='';
                     
                  }
                  else if(status === 'failed')
                  {
                    let alert = this.alertCtrl.create({
                      title: 'Registeration Failed ! Server Problem',
                      buttons: ['OK']
                    });
                    alert.present();
                  }
                  else {

                    this.nativeStorage.setItem('user_email', data.email)
                    .then(
                      () => console.log('Email Stored!'),
                      error => console.error('Error storing item', error)
                    );

                    this.nativeStorage.setItem('user_name', data.name)
                    .then(
                      () => console.log('user name Stored!'),
                      error => console.error('Error storing item', error)
                    );

                    let alert = this.alertCtrl.create({
                      title: 'Registeration Successful ! Login to proceed',
                      buttons: ['OK']
                    });
                    alert.present();

                    this.uploadImage();
                     
                  }
              }, error => {
                  console.log(error);// Error getting the data
              });
      }
  }

   //Upload image:
 public presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Select Image Source',
    buttons: [
      {
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
          //this.Alertconfirm();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    ]
  });
  actionSheet.present();

}

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };

  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
   console.log("ImageURL from Source",imagePath)
    this.imageURI = imagePath;
    console.log("ImageURL ",this.imageURI)
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

// Always get the accurate path to your apps folder


public uploadImage() {
 
  // File for Upload
  console.log(this.imageURI)
  var targetPath = this.imageURI

  var temp= this.imageURI.replace(".png?","_");
  var temp1=temp.replace(".jpg?","_");
  // File name only
  var filename = temp1;

  var options = {
    fileKey: "file",
    fileName:filename,
    chunkedMode: false,
    mimeType: "image/jpeg",
    params: { 'fileName': filename }
  };

  const fileTransfer: FileTransferObject = this.transfer.create();

  let loadingCtrl = this.loadingCtrl.create({
    content: 'Validating resources...',
  });
  loadingCtrl.present();
     this.url = "https://purpledimes.com/BoobaJob/WebServices/image.php?email=" + this.email; 
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl",this.imageURI)
    loadingCtrl.dismissAll()
    console.log("image uploaded");
    this.events.publish('user:login');
    this.navCtrl.setRoot(UserloginPage);
    console.log("data",data)
    let alert = this.alertCtrl.create({
      title: 'Profile Created Successfully!',
      buttons: ['OK']
    });
    alert.present();
  }, err => {
    loadingCtrl.dismissAll()
    console.log("Failed uploading image", err);
  });

}
}
