import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { CitymodalPage } from '../citymodal/citymodal';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  items: any;
  city: any;
  countrylink: any;
  name: any;
  country: any;

  constructor(private nativeStorage: NativeStorage, private loadingCtrl: LoadingController, private http: Http, private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {

    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    //this.check();
  }

  close() {
    this.view.dismiss();
  }

  check() {
    let loader = this.loadingCtrl.create({
      content: "Fetching Data..."
    });
    loader.present();
    this.countrylink = 'http://secedu.info/api/fetch.php';  //   http://secedu.info/api/fetch.php  https://restcountries.eu/rest/v2/all
    this.http.get(this.countrylink).map(res => res.json())
      .subscribe(data => {

        console.log(data);

        this.country = data;

        loader.dismissAll();
      }, error => {
        console.log(error); // Error getting the data
      });


  }

  send(id: String, Name: String) {
    console.log("Name" + Name);
    console.log("ID" + id);

    // this.navCtrl.push(CitymodalPage, {city : id, Flag : Flag});

    this.nativeStorage.setItem('country', Name)
      .then(
        () => {
          console.log('Country Stored!');
          this.navCtrl.push(CitymodalPage, { city: id });
        },
        error => console.error('Error storing item', error)
      );
  }

  initializeItems() {
    this.items = [
      'Afghanistan',



      "Albania",

      "Algeria",

      "American Samoa",

      "Andorra",

      "Angola",

      "Anguilla",

      "Antarctica",

      "Antigua And Barbuda",

      "Argentina",

      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Cayman Islands",
      "Central African Republic",

      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands",
      "Colombia",
      "Comoros",
      "Congo",
      "Congo The Democratic Republic Of The",
      "Cook Islands",
      "Costa Rica",
      "Cote D''Ivoire (Ivory Coast)",
      "Croatia (Hrvatska)",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",

      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Ethiopia",
      "External Territories of Australia",
      "Falkland Islands",
      "Faroe Islands",
      "Fiji Islands",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",

      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey and Alderney",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard and McDonald Islands",
      "Honduras",
      "Hong Kong S.A.R.",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea North",
      "Korea South",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",

      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macau S.A.R.",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",

      "Man (Isle of)",
      "Marshall Islands",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands Antilles",
      "Netherlands",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "Northern Mariana Islands",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestinian",
      "Panama",
      "Papua new Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Pitcairn Island",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Reunion",
      "Romania",
      "Russia",
      "Rwanda",

      "Saint Helena",
      "Saint Kitts And Nevis",
      "Saint Lucia",
      "Saint Pierre and Miquelon",
      "Saint Vincent And The Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Smaller Territories of the UK",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Svalbard And Jan Mayen Islands",
      "Swaziland",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad And Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks And Caicos Islands",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "United States Minor Outlying Islands",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City State (Holy See)",
      "Venezuela",
      "Vietnam",
      "Virgin Islands (British)",

      "Virgin Islands (US)",

      "Wallis And Futuna Islands",
      "Western Sahara",
      "Yemen",
      "Yugoslavia",
      "Zambia",
      "Zimbabwe",
          
    ];
}

getItems(ev) {
  // Reset items back to all of the items
  this.initializeItems();

  // set val to the value of the ev target
  var val = ev.target.value;

  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    this.items = this.items.filter((item) => {
      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }
}

data(item:string)
{
console.log(item);
this.nativeStorage.setItem('country', item)
.then(
  () => console.log('Country Stored!'),
  error => console.error('Error storing item', error)
);
this.navCtrl.push(CitymodalPage);
}

  

}
