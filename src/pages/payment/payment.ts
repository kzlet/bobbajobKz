import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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

  constructor(private payPal: PayPal, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  this.value1 = this.navParams.get('amount_charged');
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

}
