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

    
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.email = data;
        //this.fetchprice();

        let loader = this.loadingCtrl.create({
          content: "Loading Data..."
        });
        loader.present();
    
        this.apiUrl = 'http://secedu.info/mycity/getlogindetails.php?email=' + this.email;
         console.log(this.apiUrl);
    
         this.http.get(this.apiUrl).map(res => res.json())
         .subscribe(data => {
            
          this.posts = data;
          console.log(this.posts);
    
          this.name = this.posts[0].name;
          this.number = this.posts[0].number;
          this.address = this.posts[0].address;
    
          console.log("name from posts" + this.name);
          console.log( this.number);
          console.log( this.address);
    
          loader.dismiss();
          console.log(this.posts);
     
          }, error => {
            console.log(error); // Error getting the data
      
          });

      },
      error => console.error(error)
    );

    //this.email = 'sajid@gmail.com'; 
  //  this.fetchprice();
//   this.name = 'kumail';
 //  this.number = '03452130046';
 //  this.address= '221 Bakers Street'; 

   console.log('Here it comes');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvprofeditPage');
  }

  // fetchprice()
  // {
  //  console.log("From fetch price function");
  //  console.log("Email:" + this.email);
  //   let loader = this.loadingCtrl.create({
  //     content: "Loading Data..."
  //   });
  //   loader.present();

  //   this.apiUrl = 'http://secedu.info/mycity/getlogindetails.php?email=' + this.email;
  //    console.log(this.apiUrl);

  //    this.http.get(this.apiUrl).map(res => res.json())
  //    .subscribe(data => {
        
  //     this.posts = data;
  //     console.log(this.posts);

  //     this.name = this.posts[0].name;
  //     this.number = this.posts[0].number;
  //     this.address = this.posts[0].address;

  //     console.log("name from posts" + this.name);
  //     console.log( this.number);
  //     console.log( this.address);

  //     loader.dismiss();
  //     console.log(this.posts);
 
  //     }, error => {
  //       console.log(error); // Error getting the data
  
  //     });
  //   }

 check()
 {
  console.log("name from signup" + this.name);
  console.log( this.number);
  console.log( this.address);
 }

  signup() {
    if (this.name === undefined ||  this.number === undefined || this.address === undefined) {

        let alert = this.alertCtrl.create({
            title: 'No Change Occured',
            buttons: ['OK']
          });
          alert.present();        
    }

    else {

      console.log("name from signup" + this.name);
      console.log( this.number);
      console.log( this.address);
      console.log( this.email);

         let loader = this.loadingCtrl.create({
            content: "Updating Profile..."
        });
        loader.present();

        this.apiUrl = 'http://secedu.info/mycity/custupdate.php?name=' + this.name + '&address='+ this.address + '&number=' + this.number + '&email=' + this.email;

    
        var data = { name: this.name, address: this.address, number : this.number, email: this.email };
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

                  this.nativeStorage.setItem('name', this.name)
                  .then(
                    () => console.log('Name Stored!'),
                    error => console.error('Error storing item', error)
                  );
          
                  this.nativeStorage.setItem('number', this.number)
                  .then(
                    () => console.log('number Stored!'),
                    error => console.error('Error storing item', error)
                  );

                  this.nativeStorage.setItem('profile_picture', this.imageURI)
                  .then(
                    () => console.log('Image Stored!'),
                    error => console.error('Error storing item', error)
                  );


                  let loader = this.loadingCtrl.create({
                    content: "Validating Resources..."
                });
                loader.present();
              
                console.log("Image URI" + this.imageURI);
               
                if(this.imageURI === 'undefined' || this.imageURI === undefined)
                {
                  loader.dismiss();

                  this.navCtrl.push(ProvdashboardPage);
                  
                }
                else
                {
                this.uploadImage();
                loader.dismiss();

                    this.navCtrl.push(ProvdashboardPage);
                }


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
