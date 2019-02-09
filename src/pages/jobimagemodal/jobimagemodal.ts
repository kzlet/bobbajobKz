import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController, ToastController, ViewController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

//Camera options
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-jobimagemodal',
  templateUrl: 'jobimagemodal.html',
})
export class JobimagemodalPage {

  apiUrl: string;
  posts: any;
  provider_email : any;
  toast: any;
  coasts: any;
  imageURI: any;
  url: string;
  project_id: any;
  bid_status : any;
  data: { job_category: any; budget: any; work_location: any; };
  value: any;
  constructor(private view: ViewController, public toastCtrl : ToastController ,private transfer: FileTransfer, private camera: Camera, public actionSheetCtrl: ActionSheetController, public alertCtrl : AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
  this.project_id = this.navParams.get('project_id');
  this.provider_email = this.navParams.get('provider_email'); 
  this.value = this.navParams.get('value');
  console.log(this.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobimagemodalPage');
  }

  close()
  {
    this.view.dismiss();
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
    content: 'Uploading Image...',
  });
  loadingCtrl.present();
 
     this.url = "https://purpledimes.com/BoobaJob/WebServices/job_upload_image.php?provider_email=" + this.provider_email + '&project_id=' + this.project_id; 
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl",this.imageURI)
    loadingCtrl.dismissAll()
    console.log("image uploaded");
    let alert = this.alertCtrl.create({
      title: 'Successfully Uploaded',
      buttons: ['OK']
    });
    alert.present();
    
    this.view.dismiss();

  }, err => {
    loadingCtrl.dismissAll()
    //this.presentToast('Error while uploading file.');
    console.log("Failed uploading image", err);
  });

}

}
