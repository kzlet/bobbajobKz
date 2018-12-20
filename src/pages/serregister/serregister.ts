import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController, ActionSheetController } from 'ionic-angular';
import { SerloginPage } from '../serlogin/serlogin';
import { ProvdashboardPage } from '../provdashboard/provdashboard';
import { ProvservicePage } from '../provservice/provservice';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//Camera options
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-serregister',
  templateUrl: 'serregister.html',
})
export class SerregisterPage {

  url: string;
  imageURI:any;
imageFileName:any;

  country: any;
  city: any;
  apiUrl: string;
  conpassword: any;
  address: any;
  number: any;
  email: any;
  name: any;
  password: any;
  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SerregisterPage');

    this.nativeStorage.getItem('city')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.city = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('country')
    .then(
      data => {
        console.log("Checking for country name:" + data);
        this.country = data;
      },
      error => console.error(error)
    );
  }

  back1()
  {
    this.navCtrl.push(SerloginPage);
  }

  goto1()
  {
    this.navCtrl.push(ProvservicePage);
  }

  signup() {

    this.nativeStorage.setItem('email', this.email)
    .then(
      () => console.log('City Stored!'),
      error => console.error('Error storing item', error)
    );


    if (this.name === undefined ||  this.email === undefined || this.number === undefined || this.address === undefined|| this.password === undefined) {
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

        this.apiUrl = 'http://secedu.info/mycity/custregister.php?name=' + this.name + '&password=' + this.password +'&email=' + this.email + '&number='+ this.number + '&address='+ this.address+ '&city='+ this.city+ '&country='+ this.country;

    
        var data = { name: this.name, password: this.password, email: this.email, number: this.number, address: this.address, city: this.city, country: this.country };
        console.log(data);
        console.log("password:" + this.password);
       
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
                    this.address='';
                    this.city='';
                    this.country='';
                   
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

                  let auth = 0;
                  this.nativeStorage.setItem('auth', auth)
                  .then(
                    () => console.log('Profiler User Profile'),
                    error => console.error('Error storing item', error)
                  );

                  let alert = this.alertCtrl.create({
                    title: 'Registeration Successful',
                    buttons: ['OK']
                  });
                  alert.present();

                  let loader = this.loadingCtrl.create({
                    content: "Validating Resources..."
                });
                loader.present();
              
                this.uploadImage();
              
                loader.dismiss();

                    this.navCtrl.push(ProvservicePage);
                    
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
    content: 'Uploading...',
  });
  loadingCtrl.present();
 
     this.url = "http://secedu.info/mycity/image.php?email=" + this.email; 
  //  this.url = "http://www.luxurri.com/luxurri_App/uploadphoto/UploadNIC.php"
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl",this.imageURI)
    loadingCtrl.dismissAll()
   // this.signup();
    //this.presentToast('Image succesful uploaded.');
    console.log("image uploaded");
    console.log("data",data)
    let alert = this.alertCtrl.create({
      title: 'Profile Created Successfully!',
      buttons: ['OK']
    });
    alert.present();
  }, err => {
    loadingCtrl.dismissAll()
    //this.presentToast('Error while uploading file.');
    console.log("Failed uploading image", err);
  });

}

}
