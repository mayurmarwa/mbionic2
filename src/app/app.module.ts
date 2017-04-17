import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CustomIconsModule } from 'ionic2-custom-icons';
import { IonicStorageModule } from '@ionic/storage';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera } from '@ionic-native/camera';
import { CallNumber } from '@ionic-native/call-number';
import { Push } from '@ionic-native/push';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { Market } from '@ionic-native/market';


import { MarketPage } from '../pages/market/market';
import { QuickFilterPage } from '../pages/quick-filter/quick-filter';
import { SearchCategoriesPage } from '../pages/search-categories/search-categories';
import { PricesPage } from '../pages/prices/prices';
import { EnquiriesPage } from '../pages/enquiries/enquiries';
import { NotificationsPage } from '../pages/notifications/notifications';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { MyProductsPage } from '../pages/my-products/my-products';
import { SelectCategoryPage } from '../pages/select-category/select-category';
import { AddProductPage } from '../pages/add-product/add-product';
import { EditProductPage } from '../pages/edit-product/edit-product';
import { ProductPagePage } from '../pages/product-page/product-page';
import { CategoryProductsPage } from '../pages/category-products/category-products';
import { SelectSubcatPage } from '../pages/select-subcat/select-subcat';
import { SendEnquiryPage } from '../pages/send-enquiry/send-enquiry';
import { EnquirySentPage } from '../pages/enquiry-sent/enquiry-sent';
import { EnquiryDetailsPage } from '../pages/enquiry-details/enquiry-details';
import { PostBuyRequirementsPage } from '../pages/post-buy-requirements/post-buy-requirements';
import { MyRequirementsPage } from '../pages/my-requirements/my-requirements';
import { BrowseRequirementsPage } from '../pages/browse-requirements/browse-requirements';
import { SendQuotationPage } from '../pages/send-quotation/send-quotation';
import { RequirementDetailsPage } from '../pages/requirement-details/requirement-details';
import { DirectoryPage } from '../pages/directory/directory';
import { MemberDetailsPage } from '../pages/member-details/member-details';
import { SpeedDialPage } from '../pages/speed-dial/speed-dial';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { FilterOptionsPage } from '../pages/filter-options/filter-options';
import { TabContactsPage } from '../pages/tab-contacts/tab-contacts';
import { TabProfilePage } from '../pages/tab-profile/tab-profile';
import { TabChatsPage } from '../pages/tab-chats/tab-chats';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ShareAppPage } from '../pages/share-app/share-app';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SignupPage } from '../pages/signup/signup';
import { VerifyMobilePage } from '../pages/verify-mobile/verify-mobile';
import { MetalCalculatorPage } from '../pages/metal-calculator/metal-calculator';
import { CreateProfilePage } from '../pages/create-profile/create-profile';

import { ProfileData } from '../providers/profile-data';
import { ProductData } from '../providers/product-data';
import { DirectoryProvider } from '../providers/directory-provider';
import { AuthService } from '../providers/auth.service';
import { ChatsService } from '../providers/chats.service';

import { ParallaxHeader } from '../components/parallax-header/parallax-header';
import { OrderBy } from '../pipes/orderBy';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBLx3cXHMhd6TOWWDGZS-J1stb2w34B47A",
    authDomain: "metbazaar.firebaseapp.com",
    databaseURL: "https://metbazaar.firebaseio.com",
    projectId: "metbazaar",
    storageBucket: "metbazaar.appspot.com",
    messagingSenderId: "639273963235"
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MarketPage,
    QuickFilterPage,
    SearchCategoriesPage,
    PricesPage,
    NotificationsPage,
    EnquiriesPage,
    ParallaxHeader,
    MyProfilePage,
    MyProductsPage,
    SelectCategoryPage,
    AddProductPage,
    EditProductPage,
	ProductPagePage,
    CategoryProductsPage,
    SelectSubcatPage,
	SendEnquiryPage,
    EnquirySentPage,
	EnquiryDetailsPage,
    PostBuyRequirementsPage,
    BrowseRequirementsPage,
    MyRequirementsPage,
	SendQuotationPage,
	RequirementDetailsPage,
    DirectoryPage,
    MemberDetailsPage,
    SpeedDialPage,
    SettingsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    LoginPage,
    AboutPage,
    ShareAppPage,
    ResetpasswordPage,
    SignupPage,
    VerifyMobilePage,
    CreateProfilePage,
    OrderBy,
    MetalCalculatorPage,
    FilterOptionsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    CustomIconsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MarketPage,
    QuickFilterPage,
    SearchCategoriesPage,
    PricesPage,
    EnquiriesPage,
    NotificationsPage,
    MyProfilePage,
    MyProductsPage,
    SelectCategoryPage,
    SelectSubcatPage,
    AddProductPage,
    EditProductPage,
	ProductPagePage,
    CategoryProductsPage,
	SendEnquiryPage,
    EnquirySentPage,
	EnquiryDetailsPage,
    PostBuyRequirementsPage,
    BrowseRequirementsPage,
    MyRequirementsPage,
	SendQuotationPage,
	RequirementDetailsPage,
    DirectoryPage,
    MemberDetailsPage,
    SpeedDialPage,
    SettingsPage,
    TabContactsPage,
    TabProfilePage,
    TabChatsPage,
    LoginPage,
    AboutPage,
    ShareAppPage,
    ResetpasswordPage,
    SignupPage,
    VerifyMobilePage,
    CreateProfilePage,
    MetalCalculatorPage,
    FilterOptionsPage
  ],
  providers: [AuthService, ChatsService, ProfileData, ProductData, DirectoryProvider , StatusBar,SplashScreen, Camera,CallNumber, Push, SocialSharing, GooglePlus, Facebook, Market, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
