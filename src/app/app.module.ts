import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SerloginPage } from '../pages/serlogin/serlogin';
import { SerregisterPage } from '../pages/serregister/serregister';
import { UserselectPage } from '../pages/userselect/userselect';
import { ProvdashboardPage } from '../pages/provdashboard/provdashboard';
import { ProvservicenamePage } from '../pages/provservicename/provservicename';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpModule } from '@angular/http';
import { LaundryPage } from '../pages/laundry/laundry';
import { LaundrySamedayPage } from '../pages/laundry-sameday/laundry-sameday';
import { ProfilePage } from '../pages/profile/profile';
import { UserloginPage } from '../pages/userlogin/userlogin';
import { UserregisterPage } from '../pages/userregister/userregister';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { Toast } from '@ionic-native/toast';
import { ProvprofilePage } from '../pages/provprofile/provprofile';
import { ProviderjobPage } from '../pages/providerjob/providerjob';
import { ProvprofeditPage } from '../pages/provprofedit/provprofedit';
import { EditqualificationsPage } from '../pages/editqualifications/editqualifications';
import { UpdateprovpasswordPage } from '../pages/updateprovpassword/updateprovpassword';
import { UpdateuserpasswordPage } from '../pages/updateuserpassword/updateuserpassword';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { OneSignal } from '@ionic-native/onesignal';

//PAyment Integration
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

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
import { ViewjobPage } from '../pages/viewjob/viewjob';
import { PaymentPage } from '../pages/payment/payment';
import { UserConnectionsPage } from '../pages/user-connections/user-connections';
import { UserChatPage } from '../pages/user-chat/user-chat';
import { ReviewproviderPage } from '../pages/reviewprovider/reviewprovider';
import { RateproviderPage } from '../pages/rateprovider/rateprovider';
import { ProvidertabPage } from '../pages/providertab/providertab';
import { ProvsettingsPage } from '../pages/provsettings/provsettings';
import { ProviderConnectionsPage } from '../pages/provider-connections/provider-connections';
import { ProviderChatPage } from '../pages/provider-chat/provider-chat';
import { JobHistoryPage } from '../pages/job-history/job-history';

//image viewer
import { IonicImageViewerModule } from 'ionic-img-viewer';

//progress bar
import {ProgressBarModule} from "angular-progress-bar"

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
    SerloginPage,
    SerregisterPage,
    UserselectPage,
    ProvdashboardPage,
    ProvservicenamePage,
    LaundryPage,
    LaundrySamedayPage,
    ProfilePage,
    UserloginPage,
    UserregisterPage,
    ProvprofilePage,
    ProviderjobPage,
    ProvprofeditPage,
    EditqualificationsPage,
    UpdateprovpasswordPage,
    UpdateuserpasswordPage,
    UserprofilePage,
    FilterPage,
    OfferPage,
    MypostingsPage,
    ViewjobPage,
    PaymentPage,
    UserConnectionsPage,
    UserChatPage,
    ReviewproviderPage,
    RateproviderPage,
    ProvidertabPage,
    ProvsettingsPage,
    ProviderConnectionsPage,
    ProviderChatPage,
    JobHistoryPage
  ],
  imports: [    
    BrowserModule,
    IonicImageViewerModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ProgressBarModule,
    Ionic2RatingModule, // Put ionic2-rating module here
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SerloginPage,
    SerregisterPage,
    UserselectPage,
    ProvdashboardPage,
    ProvservicenamePage,
    LaundryPage,
    LaundrySamedayPage,
    ProfilePage,
    UserloginPage,
    UserregisterPage,
    ProvprofilePage,
    ProviderjobPage,
    ProvprofeditPage,
    EditqualificationsPage,
    UpdateprovpasswordPage,
    UpdateuserpasswordPage,
    UserprofilePage,
    FilterPage,
    OfferPage,
    MypostingsPage,
    ViewjobPage,
    PaymentPage,
    UserConnectionsPage,
    UserChatPage,
    ReviewproviderPage,
    RateproviderPage,
    ProvidertabPage,
    ProvsettingsPage,
    ProviderConnectionsPage,
    ProviderChatPage,
    JobHistoryPage
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
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
