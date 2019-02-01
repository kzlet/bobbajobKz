import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  value1:any;
  value2:any = 'GBP';
  value3:any = 'paying for task for BoobaJob';
  value4:any = 'sales';

  payment : any = 'Paypal';
  currencies = ['GBP'];
  payPalEnvironment: string = 'payPalEnvironmentSandbox';

  payPalEnvironmentSandbox : any = 'AXg409-ZD7lFcgk2JdHkLkggX8u7LnT7cfkGL2AG0y7bx5OAvOmErpKKz5D68kzXRxbfe_KRlFf681rk';
  payPalEnvironmentProduction: any  = '';
  client_email: any;
  provider_email: any;
  project_id: any;
  apiUrl: string;

  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, private payPal: PayPal, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  this.value1 = this.navParams.get('amount_charged');
  this.client_email = this.navParams.get("client_email");
  this.provider_email = this.navParams.get("provider_email"); 
  this.project_id = this.navParams.get("project_id");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  close() {
    this.view.dismiss();
  }

  transaction()
 {
  let payment: PayPalPayment = new PayPalPayment(this.value1, this.value2, this.value3, this.value4);
  this.payPal.init({
    PayPalEnvironmentProduction: this.payPalEnvironmentProduction,
    PayPalEnvironmentSandbox: this.payPalEnvironmentSandbox
  }).then(() => {
    this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
      this.payPal.renderSinglePaymentUI(payment).then((response) => {
        alert(`Successfully paid. Status = ${response.response.state}`);


        //Task add function here... And then naviagate to Home Screen.
        //Assign job function Started

         this.post_task();

        //Assign job function completed

        console.log(response);
      }, () => {
        console.error('Error or render dialog closed without being successful');
      });
    }, () => {
      console.error('Error in configuration');
    });
  }, () => {
    console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
  });
 }


 post_task()
 {
  console.log("Post job function called");
  let loader = this.loadingCtrl.create({
    content: "Assigning Job, Please wait..."
  });
  loader.present();
  this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/assign_job.php?provider_email=' + this.provider_email + '&client_email=' + this.client_email + '&project_id=' + this.project_id + '&amount_charged=' + this.value1;  //change api
  this.http.get(this.apiUrl).map(res => res.json())
    .subscribe(data => {
      console.log(data);
      var status = data.Status;
      if (status === 'success') {
        loader.dismiss();

        //updating progress status = 2 in Jobs table
        this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/change_job_status.php?id=' + this.project_id;  //change api
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
            console.log(data);
            var status = data.Status;
            if (status === 'success') {
              let alert = this.alertCtrl.create({
                title: 'Job Assigned Successfully',
                buttons: ['OK']
              });
              alert.present();
              loader.dismiss();
              this.post_notification();
              this.view.dismiss();
            }
            else {
              loader.dismiss();
            }
          }, error => {
            console.log(error);
          });

          //function end
      }
      else {
        loader.dismiss();
      }
    }, error => {
      console.log(error);
    });
 }

 post_notification()
  {
    this.apiUrl = 'https://purpledimes.com/BoobaJob/WebServices/jobassignnotification.php?email=' +  this.provider_email;
    console.log(this.apiUrl);
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
      }, error => {
        console.log(error); // Error getting the data
      });
  }

}
