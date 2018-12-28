import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//Camera options
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProvdashboardPage } from '../provdashboard/provdashboard';

@Component({
  selector: 'page-provprofedit',
  templateUrl: 'provprofedit.html',
})
export class ProvprofeditPage {
  myname: any;
  mynumber: any;
  myaddress: any;
  posts: any;
  apiUrl: string;
  conpassword: any;
  password: any;
  address: any;
  number: any;
  name: any;
  profile_picture: any;
  email: any;
  url: string;
  imageURI:any;
  imageFileName:any;
  
  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.profile_picture = data;
      },
      error => console.error(error)
    );
    
    this.nativeStorage.getItem('provider_email')
    .then(
      data => {
        console.log("Checking for PRovider name:" + data);
        this.email = data;
        this.fetch_user_data();
      });

      this.nativeStorage.getItem('provider_name')
      .then(
        data => {
          console.log("Checking for PRovider name:" + data);
          this.name = data;
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvprofeditPage');
  }

  ionViewDidEnter() {
    console.log('Testing View Enter');
  }

  fetch_user_data()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Profile..."
    });
    loader.present();

    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/get_provider_data.php?email=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
      console.log(this.posts);

      this.name = this.posts.name;
      this.number = this.posts.number;
      this.address = this.posts.address;
      this.profile_picture = this.posts.profile_picture;
      
      console.log("name from posts" + this.name);
      console.log( this.number);

      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
  }


//   signup() {
//     if (this.name === undefined ||  this.number === undefined ||  this.address === undefined ) {

//         let alert = this.alertCtrl.create({
//             title: 'You cannot leave these fields empty ! ',
//             buttons: ['OK']
//           });
//           alert.present();        
//     }

//     else {
//          let loader = this.loadingCtrl.create({
//             content: "Updating Profile..."
//         });
//         loader.present();

//         this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/update_user_profile.php?name=' + this.name + '&number=' + this.number + '&email=' + this.user_email;
       
//         this.http.get(this.apiUrl).map(res => res.json())
//           .subscribe(data => {
//            loader.dismiss();

//                 console.log("After upload" + JSON.stringify(data));
      
//                 var status = data.Status;

//                 if(status === 'success')
//                 {
//                   let alert = this.alertCtrl.create({
//                     title: 'Updated Successful',
//                     buttons: ['OK']
//                   });
//                   alert.present();

//                   if(this.image_value === '1')
//                   {
//                     this.uploadImage();
//                   }
//                   else{
//                     this.events.publish('user:provider'); //refresh native storage
//                     this.navCtrl.push(UserprofilePage);
//                   }
//         }
//               else
//                 {
//                   let alert = this.alertCtrl.create({
//                     title: 'Profile Updation Failed ! Server Problem',
//                     buttons: ['OK']
//                   });
//                   alert.present();
//                 }
               
//             }, error => {
//                 console.log(error);// Error getting the data
//             });
//     }
// }


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


public uploadImage() {
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
    content: 'Validating Resources...',
  });
  loadingCtrl.present();
 
     this.url = "https://purpledimes.com/BoobaJob/WebServices/provider_image.php?email=" + this.email; 
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl",this.imageURI)
    loadingCtrl.dismissAll()
    console.log("image uploaded");
    let alert = this.alertCtrl.create({
      title: 'Registeration Successful',
      buttons: ['OK']
    });
    alert.present();
    console.log("data",data)
  }, err => {
    loadingCtrl.dismissAll()
    //this.presentToast('Error while uploading file.');
    console.log("Failed uploading image", err);
  });

}

}
