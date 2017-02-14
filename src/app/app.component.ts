import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { PostBuyRequirementsPage } from '../pages/post-buy-requirements/post-buy-requirements';
import { BrowseRequirementsPage } from '../pages/browse-requirements/browse-requirements';
import { DirectoryPage } from '../pages/directory/directory';
import { SpeedDialPage } from '../pages/speed-dial/speed-dial';
import { SettingsPage } from '../pages/settings/settings';

import { AuthService } from '../providers/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  openPages: Array<{title: string, component: any}>;
  pushPages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public authService: AuthService
  ) {
    this.initializeApp();

    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.getAuth()
      .map(state => !!state)
      .subscribe(authenticated => {
        loading.dismiss();
        this.rootPage = (authenticated) ? TabsPage : LoginPage;
      }, (error) => {
        loading.dismiss();
        this.rootPage = LoginPage;
        console.log('Error: ' + JSON.stringify(error));
      });

    // used for an example of ngFor and navigation
    this.openPages = [
      { title: 'Home', component: TabsPage }
    ];

    this.pushPages = [
        { title: 'Profile', component: TabProfilePage },
        { title: 'Post Buy Requirement', component: PostBuyRequirementsPage },
        { title: 'Browse Requirements', component: BrowseRequirementsPage },
        { title: 'My Products', component: MyProductsPage },
        { title: 'Directory', component: DirectoryPage },
        { title: 'Speed Dial', component: SpeedDialPage },
        { title: 'Settings', component: SettingsPage },
        { title: 'Share App', component: TabProfilePage },
        { title: 'About', component: AboutPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
    this.nav.setRoot(LoginPage);
  }
}
