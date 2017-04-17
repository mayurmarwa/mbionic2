import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { VerifyMobilePage } from '../verify-mobile/verify-mobile';
import firebase from 'firebase';


/*
  Generated class for the CreateProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-create-profile',
    templateUrl: 'create-profile.html'
})
export class CreateProfilePage {
    public currentuser: any;
    public userid: any;
    public profileForm;
    constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

        this.currentuser = firebase.auth().currentUser;
        this.userid = this.currentuser.uid;

        this.profileForm = formBuilder.group({
            //name: ['', Validators.required],
            mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            companyname: ['', Validators.required],
            address: ['', Validators.required],
            companyprofile: ['', Validators.required]


        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CreateProfilePage');
        console.log(this.userid);
    }
    elementChanged(input) {
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
    }
    createProfile() {
        //this.submitAttempt = true;



        if (!this.profileForm.valid) {
            let toast = this.toastCtrl.create({
                message: 'Invalid Entries',
                duration: 2000,
                position: 'middle'
            });
            toast.present();
        } else {

            this.navCtrl.push(VerifyMobilePage, { form: this.profileForm, type: "social", userid: this.userid });

        }



    }
}
