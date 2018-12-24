import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IntroPage } from '../pages/intro/intro';
import { SerloginPage } from '../pages/serlogin/serlogin';
import { SerregisterPage } from '../pages/serregister/serregister';
import { UserselectPage } from '../pages/userselect/userselect';
import { ProvdashboardPage } from '../pages/provdashboard/provdashboard';
import { ProvservicePage } from '../pages/provservice/provservice';
import { ProvservicenamePage } from '../pages/provservicename/provservicename';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { LaundryPage } from '../pages/laundry/laundry';
import { LaundrySamedayPage } from '../pages/laundry-sameday/laundry-sameday';
import { NamePage } from '../pages/name/name';
import { NannyPage } from '../pages/nanny/nanny';
import { PricePage } from '../pages/price/price';
import { ProfilePage } from '../pages/profile/profile';
import { UserloginPage } from '../pages/userlogin/userlogin';
import { UserregisterPage } from '../pages/userregister/userregister';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { SpecialPage } from '../pages/special/special';
import { FavoritePage } from '../pages/favorite/favorite';
import { Toast } from '@ionic-native/toast';
import { ChatPage } from '../pages/chat/chat';
import { HistoryPage } from '../pages/history/history';
import { ProvchatPage } from '../pages/provchat/provchat';
import { ProvprofilePage } from '../pages/provprofile/provprofile';
import { ProvideractiveservicesPage } from '../pages/provideractiveservices/provideractiveservices';
import { ProvidersChatPage } from '../pages/providers-chat/providers-chat';
import { ProviderjobPage } from '../pages/providerjob/providerjob';
import { ModalPage } from '../pages/modal/modal';
import { CitymodalPage } from '../pages/citymodal/citymodal';
import { ProvprofeditPage } from '../pages/provprofedit/provprofedit';
import { ProvnamePage } from '../pages/provname/provname';
import { ProvpricePage } from '../pages/provprice/provprice';
import { EditqualificationsPage } from '../pages/editqualifications/editqualifications';
import { UpdateprovpasswordPage } from '../pages/updateprovpassword/updateprovpassword';
import { UpdateuserpasswordPage } from '../pages/updateuserpassword/updateuserpassword';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { OneSignal } from '@ionic-native/onesignal';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import { FileChooser } from '@ionic-native/file-chooser';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { AndroidPermissions } from '@ionic-native/android-permissions';

//firebase setup
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { Firebase } from '@ionic-native/firebase';
import { FilterPage } from '../pages/filter/filter';
import { OfferPage } from '../pages/offer/offer';
import { MypostingsPage } from '../pages/mypostings/mypostings';

const firebaseAuth = {
  apiKey: "AIzaSyAyXiH-4XapuocumZskNZM3l15XJ8bAeqc",
  authDomain: "bobbajob-f14c9.firebaseapp.com",
  databaseURL: "https://bobbajob-f14c9.firebaseio.com",
  projectId: "bobbajob-f14c9",
  storageBucket: "",
  messagingSenderId: "234181533936"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    SerloginPage,
    SerregisterPage,
    UserselectPage,
    ProvdashboardPage,
    ProvservicePage,
    ProvservicenamePage,
    LaundryPage,
    LaundrySamedayPage,
    NamePage,
    NannyPage,
    PricePage,
    ProfilePage,
    UserloginPage,
    UserregisterPage,
    SpecialPage,
    FavoritePage,
    ChatPage,
    HistoryPage,
    ProvchatPage,
    ProvprofilePage,
    ProvideractiveservicesPage,
    ProvidersChatPage,
    ProviderjobPage,
    ModalPage,
    CitymodalPage,
    ProvprofeditPage,
    ProvnamePage,
    ProvpricePage,
    EditqualificationsPage,
    UpdateprovpasswordPage,
    UpdateuserpasswordPage,
    UserprofilePage,
    FilterPage,
    OfferPage,
    MypostingsPage
  
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule, // Put ionic2-rating module here
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    IntroPage,
    SerloginPage,
    SerregisterPage,
    UserselectPage,
    ProvdashboardPage,
    ProvservicePage,
    ProvservicenamePage,
    LaundryPage,
    LaundrySamedayPage,
    NamePage,
    NannyPage,
    PricePage,
    ProfilePage,
    UserloginPage,
    UserregisterPage,
    SpecialPage,
    FavoritePage,
    ChatPage,
    HistoryPage,
    ProvchatPage,
    ProvprofilePage,
    ProvideractiveservicesPage,
    ProvidersChatPage,
    ProviderjobPage,
    ModalPage,
    CitymodalPage,
    ProvprofeditPage,
    ProvnamePage,
    ProvpricePage,
    EditqualificationsPage,
    UpdateprovpasswordPage,
    UpdateuserpasswordPage,
    UserprofilePage,
    FilterPage,
    OfferPage,
    MypostingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    Geolocation,
    NativeStorage,
    FileTransfer,
    FileTransferObject,
    File,
    FileChooser,
    Camera,
    EmailComposer,
    Toast,
    DocumentViewer,
    AndroidPermissions,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
