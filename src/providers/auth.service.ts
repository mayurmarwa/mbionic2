import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';

import { AngularFire, AuthProviders, FirebaseAuthState, AuthMethods } from 'angularfire2';
import firebase from 'firebase';

export enum AuthMode {
    Facebook,
    GooglePlus
};

@Injectable()
export class AuthService {
    constructor(public af: AngularFire, private platform: Platform, public storage: Storage, private googlePlus: GooglePlus, private fb: Facebook) { }

    getAuth(): Observable<FirebaseAuthState> {
        return this.af.auth;
    }

    login(mode: AuthMode) {

        if (mode === AuthMode.GooglePlus) {
            if (!this.platform.is('cordova'))
                return this.signInWithProvider(AuthProviders.Google);

            return this.googlePlus.login({
                'scopes': 'email profile',
                'webClientId': '639273963235-levd0bsp6858tj6dcgovohs25ehpmmbd.apps.googleusercontent.com'
            }).then(res => {
                return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
            }).catch((error) => Promise.reject(error));
        }
        //return this.signInWithGoogle();

        /**if (mode == AuthMode.Facebook)
          return this.signInWithFacebook();
    
        if (mode == AuthMode.Github)
          return this.signInWithGithub();**/
    }

    login2() {

        //if (mode == AuthMode.Facebook)
        //return this.signInWithFacebook();
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Facebook);

        this.fb.login(['email', 'public_profile'])
            .then((res: FacebookLoginResponse) => {
                return firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
            }).catch((error) => Promise.reject(error));
    }

    loginUser(newEmail: string, newPassword: string): any {
        console.log("loginUser");
        return this.af.auth.login({ email: newEmail, password: newPassword },
            { provider: AuthProviders.Password, method: AuthMethods.Password });
    }

    /**
     * sign in wiht google+
     
    private signInWithGoogle() {
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Google);

        return this.googlePlus.login({
            'scopes': 'email profile',
            'webClientId': '639273963235-levd0bsp6858tj6dcgovohs25ehpmmbd.apps.googleusercontent.com'
        }).then(res => {
            return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
        }).catch((error) => Promise.reject(error));
    }*/

    /**
     * sign in with facebook
     
    private signInWithFacebook() {
        if (!this.platform.is('cordova'))
            return this.signInWithProvider(AuthProviders.Facebook);

        return this.fb.login(['email', 'public_profile'])
            .then((res: FacebookLoginResponse) => {
                return firebase.auth().signInWithCredential(firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken));
            }).catch((error) => Promise.reject(error));
    }*/

    /**
     * sign in with github
     */

    private signInWithProvider(provider: any, method: any = AuthMethods.Popup) {
        return this.af.auth.login({ provider: provider, method: method })
    }

    //private signInWithCredential(credential) {
    //   return firebase.auth().signInWithCredential(credential);
    //}

    createAccount(data): firebase.Promise_Instance<void> {
        return this.af.database.object('users/' + data.uid).set(
            {
                uid: data.uid,
                email: data.email,
                name: data.displayName,
                photoURL: data.photoURL,
                createdAt: firebase.database['ServerValue']['TIMESTAMP'],
                providerData: data.providerData[0]
            });
    }

    createAccount2(authdata, userdata): firebase.Promise_Instance<void> {
        console.log(authdata.auth.uid, userdata.value.email, userdata.value.name);
        return this.af.database.object('users/' + authdata.uid).set(
            {
                name: userdata.value.name,
                mobile: userdata.value.mobile,
                companyname: userdata.value.companyname,
                email: userdata.value.email,
                uid: authdata.auth.uid,
                //photoURL: data.auth.photoURL,
                createdAt: firebase.database['ServerValue']['TIMESTAMP'],
                profiledone: true
                //providerData: authdata.auth.provider

            });
    }

    logout() {
        this.storage.ready().then(() => {
            this.storage.remove('currentuser').then((val) => {

                this.af.auth.logout();
                //this.enquiryList = af.database.list('/users/' + this.currentuser.uid + '/enquiries');

            })
                .catch((err) =>
                    console.log(err));
        }).catch((err) =>
            console.log(err));


    }

    resetPassword(email: string): any {
        return firebase.auth().sendPasswordResetEmail(email);
    }

    signupUser(newEmail: string, newPassword: string): any {
        return this.af.auth.createUser({ email: newEmail, password: newPassword });
    }
    get currentUser(): Observable<any> {
        return this.af.auth.first().map(user => user.auth);
    };

    getFullProfile(uid: string): Observable<any> {
        return this.af.database.object('users/' + uid);
    }

    getEnquiry(uid: string, eqid: string): Observable<any> {
        return this.af.database.object('users/' + uid + '/enquiries/' + eqid);
    }
}
