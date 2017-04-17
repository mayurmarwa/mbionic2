import { Component, ViewChild } from '@angular/core';
import { Nav, App, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Push, RegistrationEventResponse, NotificationEventResponse } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Market } from '@ionic-native/market';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { CreateProfilePage } from '../pages/create-profile/create-profile';
import { PostBuyRequirementsPage } from '../pages/post-buy-requirements/post-buy-requirements';
import { BrowseRequirementsPage } from '../pages/browse-requirements/browse-requirements';
import { DirectoryPage } from '../pages/directory/directory';
import { SpeedDialPage } from '../pages/speed-dial/speed-dial';
//import { SettingsPage } from '../pages/settings/settings';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';

import { AuthService } from '../providers/auth.service';
import { DirectoryProvider } from '../providers/directory-provider';





@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    public currentuser: any;
    public loading: any;
    public directory: any;
    public currentprofile: any;
    public sub1: any;
    public updateRef: any;
    public update: any;
    public sharetxt: any;
    public shareURL: any;
    public alert: any;
    public version: string = "1.0";

    openPages: Array<{ title: string, component: any, icon: string }>;
    pushPages: Array<{ title: string, component: any, icon: string }>;

    constructor(
        public platform: Platform,
        public app: App,
        public loadingCtrl: LoadingController,
        public authService: AuthService,
        public storage: Storage,
        public alertCtrl: AlertController,
        private socialSharing: SocialSharing,
        private pushplugin: Push,
        private splashScreen: SplashScreen,
        public directoryData: DirectoryProvider,
        private statusBar: StatusBar,
        private market: Market

    ) {
        this.initializeApp();

        this.loading = this.loadingCtrl.create();
        //this.loading.present().then(() => { 

        this.authService.getAuth()
            .map(state => !!state)
            .subscribe(authenticated => {

                if (authenticated) {

                    this.currentuser = firebase.auth().currentUser;




                    this.storage.ready().then(() => {
                        // set a key/value
                        console.log(this.currentuser);
                        this.storage.set('currentuser', JSON.stringify(this.currentuser)).then(() => {
                            this.sub1 = this.authService.getFullProfile(this.currentuser.uid).first()
                                .subscribe(user => {
                                    if (user.profiledone) {
                                        this.currentprofile = user;
                                        console.log(user);
                                        this.rootPage = TabsPage;
                                    }
                                    else {
                                        console.log(user);
                                        this.authService.createAccount(this.currentuser)
                                            .then(_ => {
                                                //this.loading.dismiss().then(() => {
                                                //console.log(error);
                                                this.rootPage = CreateProfilePage;
                                                //});

                                            }).catch((error) => {
                                                let alert = this.alertCtrl.create({
                                                    title: 'Error! Try Again',
                                                    message: error.message || 'Unknown error',
                                                    enableBackdropDismiss: false,
                                                    buttons: [

                                                        {
                                                            text: 'ok',
                                                            role: 'cancel',
                                                            handler: () => {
                                                                this.alert = null;
                                                            }
                                                        }
                                                    ]
                                                });
                                                alert.present();

                                            });
                                    }

                                }, (error) => {
                                    //loading.dismiss();
                                    console.log('Error: ' + JSON.stringify(error));
                                });

                        })


                            .catch((err) =>
                                console.log(err));


                        //console.log(this.currentprofile);
                        // Or to get a key/value pair
                        // this.storage.get('currentuser').then((val) => {
                        //     console.log('Current User', JSON.parse(val));
                        //})
                        this.directoryData.setDirectory();
                        this.checkUpdate();

                        this.initPushNotification();
                        //this.loading.dismiss().then(() => {
                        //console.log(error);


                        //});

                    }).catch((err) =>
                        console.log(err));
                    // console.log(this.currentuser);

                }
                else {
                    //this.loading.dismiss().then(() => {
                    //console.log(error);
                    //if (this.currentprofile) {
                    //this.sub1.unsubscribe();
                    //}
                    this.rootPage = LoginPage;
                    //}); 
                }
                //this.rootPage = (authenticated) ? TabsPage : LoginPage;
            }, (error) => {
                //this.loading.dismiss().then(() => {
                //console.log(error);
                this.rootPage = LoginPage;
                //});

                console.log('Error: ' + JSON.stringify(error));

            });

        // used for an example of ngFor and navigation
        this.openPages = [
            { title: 'Home', component: TabsPage, icon: 'home' }
        ];

        this.pushPages = [
            { title: 'Profile', component: TabProfilePage, icon: 'profile' },
            { title: 'Post A Requirement', component: PostBuyRequirementsPage, icon: 'post' },
            { title: 'Browse Requirements', component: BrowseRequirementsPage, icon: 'search' },
            { title: 'My Products', component: MyProductsPage, icon: 'products' },
            { title: 'Directory', component: DirectoryPage, icon: 'directory' },
            { title: 'Speed Dial', component: SpeedDialPage, icon: 'dialer' },
            //{ title: 'Settings', component: SettingsPage, icon: 'settings' },        
            { title: 'About', component: AboutPage, icon: 'about' },
        ];
        // });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();

            setTimeout(() => {
                this.splashScreen.hide();
            }, 500);
            this.platform.registerBackButtonAction(() => {


                //uncomment this and comment code below to to show toast and exit app
                // if (this.backButtonPressedOnceToExit) {
                //   this.platform.exitApp();
                // } else if (this.nav.canGoBack()) {
                //   this.nav.pop({});
                // } else {
                //   this.showToast();
                //   this.backButtonPressedOnceToExit = true;
                //   setTimeout(() => {

                //     this.backButtonPressedOnceToExit = false;
                //   },2000)
                // }

                let navi = this.app.getActiveNav();
                if (navi.canGoBack()) { //Can we go back?
                    navi.pop();
                } else {
                    if (this.alert) {
                        this.alert.dismiss();
                        this.alert = null;
                    } else {
                        this.showAlert();
                    }
                }
            });


        });
    }

    showAlert() {
        this.alert = this.alertCtrl.create({
            title: 'Exit?',
            message: 'Do you want to exit the app?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        this.alert = null;
                    }
                },
                {
                    text: 'Exit',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        });
        this.alert.present();
    }

    /**
    showToast() {
        let toast = this.toastCtrl.create({
            message: 'Press Again to exit',
            duration: 2000,
            position: 'bottom'
        });
  
        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
  
        toast.present();
    }
      **/

    checkUpdate() {

        this.updateRef = firebase.database().ref('/update');
        this.updateRef.on('value', snapshot => {
            //console.log(snapshot.val());
            //console.log(snapshot.val().version);
            //console.log(this.version);
            this.sharetxt = snapshot.val().sharetxt;
            this.shareURL = snapshot.val().playURL

            if (!(snapshot.val().version === this.version)) {

                if (snapshot.val().force) {
                    let alert = this.alertCtrl.create({
                        title: 'Update Required !!!',
                        message: 'Kindly update the application to continue',
                        enableBackdropDismiss: false,
                        buttons: [

                            {
                                text: 'Update',
                                handler: () => {
                                    if (!this.platform.is('cordova')) {
                                        window.open(snapshot.val().playURL, '_system')
                                        this.logout();
                                    }
                                    else {
                                        this.market.open('com.croogster.metbzr');
                                        this.logout();
                                    }

                                }
                            }
                        ]
                    });
                    alert.present();

                }
                else {

                    let alert = this.alertCtrl.create({
                        title: 'New Update Available!',
                        message: 'Update the app for the best experience',
                        buttons: [
                            {
                                text: 'Later',
                                role: 'cancel',
                                handler: () => {
                                    console.log('Update Later');
                                }
                            },
                            {
                                text: 'Update',
                                handler: () => {
                                    if (!this.platform.is('cordova')) {
                                        window.open(snapshot.val().playURL, '_system')
                                        this.logout();
                                    }
                                    else {
                                        this.market.open('com.croogster.metbzr');
                                        this.logout();
                                    }
                                }
                            }
                        ]
                    });
                    alert.present();


                }
            }
        });

    }

    initPushNotification() {
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
            return;
        }
        let push = this.pushplugin.init({
            android: {
                senderID: "639273963235"
            },
            ios: {
                alert: "true",
                badge: true,
                sound: "true"
            },
            windows: {}
        });

        push.on('registration').subscribe((data: RegistrationEventResponse) => {
            console.log("device token ->", data.registrationId);
            //TODO - send device token to server
            //var newPostKey = firebase.database().ref().child('fcmtokens').push().key;
            //var postData = {
            //    fcmtoken: data.registrationId
            //};
            firebase.database().ref('/users/' + this.currentuser.uid + '/fcmtokens/').set({
                fcmtoken: data.registrationId
            });
            return firebase.database().ref('/fcmtokens/' + this.currentuser.uid + '/').set({
                fcmtoken: data.registrationId
            });


            // Write the new post's data simultaneously in the posts list and the user's post list.
            //var updates = {};
            // updates['/fcmtokens/' + this.currentuser.uid + '/' + newPostKey] = postData;
            // updates['/users/' + this.currentuser.uid + '/fcmtokens/' + newPostKey] = postData;

            //return firebase.database().ref().update(updates);
        });
        push.on('notification').subscribe((data: NotificationEventResponse) => {
            console.log('message', data.message);
            //let self = this;
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                let confirmAlert = this.alertCtrl.create({
                    title: 'New Notification',
                    message: data.message,
                    buttons: [
                        //{
                        //text: 'Ignore',
                        //role: 'cancel'
                        //},
                        {
                            text: 'Ok',
                            handler: () => {
                                //TODO: Your logic here
                                //this.nav.push(DetailsPage, { message: data.message });
                                console.log(data.message);

                            }
                        }]
                });
                confirmAlert.present();
            } else {
                //if user NOT using app and push notification comes
                //TODO: Your logic on click of push notification directly
                //self.nav.push(DetailsPage, { message: data.message });
                console.log("Push notification clicked");
                console.log(data.message);

            }
        });
        push.on('error').subscribe((e: Error) => {
            console.log(e.message);
        });
    }


    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    pushPage(page) {
        this.nav.push(page.component);
    }

    logout() {
        this.authService.logout();
        //this.nav.setRoot(LoginPage);
    }

    shareApp() {
        this.socialSharing.share(this.sharetxt, null, null, this.shareURL);
    }

}
