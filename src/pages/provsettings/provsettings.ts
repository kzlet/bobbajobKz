import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ProvprofeditPage } from '../provprofedit/provprofedit';
import { UserselectPage } from '../userselect/userselect';

@Component({
  selector: 'page-provsettings',
  templateUrl: 'provsettings.html',
})
export class ProvsettingsPage {

  constructor(public alertCtrl : AlertController ,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProvsettingsPage');
    
  }

  edit()
  {
     this.navCtrl.push(ProvprofeditPage);
  }

  logout()
{
  const confirm = this.alertCtrl.create({
    title: 'Are you sure?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Ok',
        handler: () => {
          console.log('Agree clicked');
         this.navCtrl.setRoot(UserselectPage);
        }
      }
    ]
  });
  confirm.present();
}

}
