import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { ResetpasswordPage } from '../resetpassword/resetpassword';
import { SignupPage } from '../signup/signup';
//import { CreateProfilePage } from '../create-profile/create-profile';
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService, AuthMode } from '../../providers/auth.service';
import { EmailValidator } from '../../validators/email';
import { App } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    homePage: any = TabsPage;
    submitAttempt: boolean = false;
    public loading: any;
    public loginForm: any;
    public localstore: any;
    constructor(
        public navCtrl: NavController,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public authService: AuthService,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        private app: App,
        private zone: NgZone,
        public storage: Storage
    ) {
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required,
            EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6),
            Validators.required])]
        });


    }

    /**
     * login with facebook
     */
    loginWithFacebook() {
        this.login2()
    }

    /**
     * login with google
     */
    loginWithGoogle() {
        this.login(AuthMode.GooglePlus);
    }

    /**
     * login with Github
     */

    elementChanged(input) {
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }
    loginUser() {
        this.submitAttempt = true;
        this.loading = this.loadingCtrl.create();
        this.loading.present().then(() => {

            if (!this.loginForm.valid) {
                this.loading.dismiss().then(() => {
                    //console.log(error);
                    let toast = this.toastCtrl.create({
                        message: 'Invalid Entries',
                        duration: 2000,
                        position: 'middle'
                    });
                    toast.present();
                });
            } else {
                this.authService.loginUser(this.loginForm.value.email,
                    this.loginForm.value.password).then(data => {

                        this.loading.dismiss();
                        //this.storage.ready().then(() => {
                        // set a key/value
                        //this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                        //this.loading.dismiss().then(() => {
                        //console.log(error);
                        //  this.navCtrl.setRoot(TabsPage);
                        //});
                        //}).catch((err) =>
                        //console.log(err));
                        // Or to get a key/value pair
                        // this.storage.get('currentuser').then((val) => {
                        //     console.log('Current User', JSON.parse(val));
                        //})
                        //}).catch((err) =>
                        //console.log(err));

                    }).catch((err) => {
                        this.loading.dismiss().then(() => {
                            console.log(err);
                            let alert = this.alertCtrl.create({
                                message: err.message,
                                buttons: [{ text: "Ok", role: 'cancel' }]
                            });
                            alert.present();
                        });
                    });


            }
        });
    }


    goToResetPassword() {
        this.navCtrl.push(ResetpasswordPage);
    }

    createAccount() {
        this.navCtrl.push(SignupPage);
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    private login(mode) {
        this.loading = this.loadingCtrl.create();
        this.loading.present().then(() => {

            this.authService.login(mode)
                .then((data) => {
                    this.loading.dismiss();
                    /* this.authService.getFullProfile(data.uid)
                       .first()
                       .subscribe((user) => {
                           if (!user.profiledone) {
                               console.log("Null User");
                           this.authService.createAccount(data)
                             .then( _=> {
                                 this.loading.dismiss().then(() => {
                                     //console.log(error);
                                     this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                                 });
                               
                             }).catch( (error)=> this.showMessage(error.message || 'Unknown error'));
                           } else {
             
                               this.storage.ready().then(() => {
                                   // set a key/value
                                   this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                                       this.loading.dismiss().then(() => {
                                           //console.log(error);
                                           this.navCtrl.setRoot(TabsPage);
                                       });
                                   }).catch((err) =>
                                       console.log(err));
                                   // Or to get a key/value pair
                                   // this.storage.get('currentuser').then((val) => {
                                   //     console.log('Current User', JSON.parse(val));
                                   //})
                               }).catch((err) =>
                                   console.log(err));
                               
                           
                         }
                       }, (error)=> {
                           this.loading.dismiss().then(() => {
                               //console.log(error);
                               this.showMessage(error.message || 'Unknown error');
                           });
                         
                       });*/
                })
                .catch((error) => {
                    this.loading.dismiss().then(() => {
                        //console.log(error);
                        this.showMessage(error.message || 'Unknown error');
                    });

                });
        });
    }

    private login2() {
        this.loading = this.loadingCtrl.create();
        this.loading.present().then(() => {

            this.authService.login2()
                .then((data) => {
                    this.loading.dismiss()
                    /*console.log(data);
                    this.authService.getFullProfile(data.uid)
                        .first()
                        .subscribe((user) => {
                            //console.log();
                            if (!user.profiledone) {
                                console.log("Null User");
                                this.authService.createAccount(data)
                                    .then(_ => {
                                        this.loading.dismiss().then(() => {
                                            //console.log(error);
                                            this.navCtrl.setRoot(CreateProfilePage, { userid: data.uid });
                                        });
                                        
                                    }) .catch( (error) => this.showMessage(error.message || 'Unknown error'));
                            } else {
      
                                this.storage.ready().then(() => {
                                    // set a key/value
                                    this.storage.set('currentuser', JSON.stringify(data)).then(() => {
                                        this.loading.dismiss().then(() => {
                                            //console.log(error);
                                            this.navCtrl.setRoot(TabsPage);
                                        });
                                    }).catch((err) =>
                                        console.log(err));
                                    // Or to get a key/value pair
                                    // this.storage.get('currentuser').then((val) => {
                                    //     console.log('Current User', JSON.parse(val));
                                    //})
                                }).catch((err) =>
                                    console.log(err));
                            }
                        }, (error) => {
                            this.loading.dismiss().then(() => {
                                //console.log(error);
                                this.showMessage(error.message || 'Unknown error');
                            });
                        });*/
                })
                .catch((error) => {
                    this.loading.dismiss().then(() => {
                        //console.log(error);
                        this.showMessage(error.message || 'Unknown error');
                    });


                });
        });
    }

    private showMessage(message: string) {
        this.toastCtrl.create({ message: message, duration: 3000 }).present();
    }
}
