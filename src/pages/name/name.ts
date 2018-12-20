import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer } from '@ionic-native/file-transfer';


@Component({
  selector: 'page-name',
  templateUrl: 'name.html',
})
export class NamePage {

  posts: any;
  apiUrl: string;
  email: any;
  constructor(private transfer: FileTransfer, public file : File, private platform: Platform,private document: DocumentViewer, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private http: Http) {
    this.email = this.navParams.get('email');
    console.log("Email frm name page" + this.email);
    this.fetchqualification();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NamePage');
  
  }
  profile1(){
    this.navCtrl.push(ProfilePage, {email : this.email})
  }

  fetchqualification()
  {

    let loader = this.loadingCtrl.create({
      content: "Loading Qualifications..."
    });
    loader.present();

    this.apiUrl = 'http://secedu.info/mycity/fetchqualification.php?email=' + this.email;
     console.log(this.apiUrl);

     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
        
      this.posts = data;
   //  this.posts = Array.of(this.posts); 
  
      loader.dismiss();
      console.log(this.posts);
 
      }, error => {
        console.log(error); // Error getting the data
  
      });
    }


    download(fileloc: string)
    {

      if (fileloc === undefined || fileloc === 'undefined' || fileloc === null || fileloc === 'null')
      {
        console.log("No data to show");
        alert("No file uploaded yet");
      }
      else
      {
        let loader2 = this.loadingCtrl.create({
          content: "Wait while document is loading..."
        });
        loader2.present();

      let path = null;
 
      if (this.platform.is('ios')) {
        path = this.file.documentsDirectory;
      } else if (this.platform.is('android')) {
        path = this.file.dataDirectory;
      }
   
      const transfer = this.transfer.create();
      
        transfer.download( fileloc, path + 'myFile.pdf').then(entry => {     // + fileloc
         
        loader2.dismiss();

          let url = entry.toURL();
          this.document.viewDocument(url, 'application/pdf', {});
        });
      
      }
    }

}
