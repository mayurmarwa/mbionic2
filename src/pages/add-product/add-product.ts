import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth.service';
import firebase from 'firebase';
import { MyProductsPage } from '../my-products/my-products';


/*
  Generated class for the AddProduct page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html'
})
export class AddProductPage {
    public category: any;
    public catDetails: any;
    public currentuser: any;
    //public cattitle: string;
    public loading: any;
    products: FirebaseListObservable<any>;
    userProducts: FirebaseListObservable<any>;
    public coilsForm;
    public sheetsForm;
    public seamlessForm;
    public squareForm;
    public flatsForm;
    public anglesForm;
    public roundbarsForm;
    public deadForm;
    lastImage: string = null;
    public productImage: any = null;
    public productImageRef: any;
    public productImageURL: string = "/assets/img/noimage.png"
    public mrateTrue: number = null;
    public krateTrue: number = null;
    public typeOD: boolean = true;
    public allValid: boolean = false;
    public priceValid: boolean = false;
    public gradeList: FirebaseListObservable<any>;
    public selectedGrade: any;
    public selectedGradeItem: any;
    public gradeval: any;
    public compositiontxt:string;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public formBuilder: FormBuilder, public authService: AuthService, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
        this.category = navParams.get("category");
        this.currentuser = firebase.auth().currentUser;
        //this.cattitle = this.category.title + " ";
        this.products = af.database.list('/products');
        this.userProducts = af.database.list('/users/' + this.currentuser.uid + '/products'); 
        this.productImageRef = firebase.storage().ref('/productImages/');
        this.gradeList = af.database.list('/grades');
        this.compositiontxt = null;
        this.gradeval = "test";
        //this.catDetails = this.af.database.object('productcategories/' + this.catid);
        this.coilsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            weight: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['',],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true',Validators.required]
            //mobile: ['', Validators.compose([Validators.minLength(10), Validators.required, Validators.maxLength(10)])],
            //companyname: ['', Validators.required],
            //email: ['', Validators.compose([Validators.required,
            //EmailValidator.isValid])],
            //password: ['', Validators.compose([Validators.minLength(6),
            //Validators.required])],

        });

        this.sheetsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            finish: ['HR', Validators.required],
            thickness: ['', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            weight: ['',],
            nos: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            composition: ['',],
            origin: ['', Validators.required],
            brand: ['', Validators.required],
            mtc: ['Available', Validators.required],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]           

        });

        this.seamlessForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
            type: ['OD', Validators.required],
            swg: ['',],
            mm: ['',],
            sch: ['',],
            finish:['Polished',],
            quantity: ['', Validators.required],
            unit: ['Kg', Validators.required],             
            mrate: ['',],
            krate: ['',],            
            origin: ['', Validators.required],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.squareForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],            
            finish: ['Polished', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Kg', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['', Validators.required],
            brand: ['',],          
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.flatsForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            width: ['', Validators.required],
            length: ['', Validators.required],
            quality: ['Original', Validators.required],
            composition: ['', Validators.required],            
            thickness: ['', Validators.required],            
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.anglesForm = formBuilder.group({
            name: ['', Validators.required],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['', Validators.required],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            length: ['', Validators.required],                     
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.roundbarsForm = formBuilder.group({
            name: ['', Validators.required],
            ptype: ['Hastealloy',],
            grade: ['', Validators.required],
            gradeval: ['base', Validators.required],
            composition: ['',],
            pcategory: ['Black', Validators.required],
            guarantee: ['Yes', Validators.required],
            sizes: ['', Validators.required],
            thickness: ['', Validators.required],
            quantity: ['', Validators.required],
            unit: ['Mtrs', Validators.required],
            length: ['', Validators.required],
            mrate: ['',],
            krate: ['',],
            origin: ['',],
            brand: ['',],
            mtc: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });

        this.deadForm = formBuilder.group({
            name: ['', Validators.required],
            details: ['', Validators.required],
            quantity: ['',],
            unit: ['Kg',],
            mrate: ['',],
            krate: ['',],
            catid: ['', Validators.required],
            uid: ['', Validators.required],
            islive: ['true', Validators.required]

        });
           
    }

    showConfirm(productForm) {
        if (!productForm.valid) {
            let alert = this.alertCtrl.create({
                title: 'Invalid Entries!',
                subTitle: 'Please fill all required entries',
                buttons: ['OK']
            });
            alert.present();
        }        
        else {
           

            if (this.category.catid === "8c1" || this.category.catid === "8c2" || this.category.catid === "8c3" || this.category.catid === "8c4" || this.category.catid === "8d" || this.category.catid === "8a" || this.category.catid === "8b" || this.category.catid === "9c1" || this.category.catid === "9c2" || this.category.catid === "9c3" || this.category.catid === "9c4" || this.category.catid === "9d" || this.category.catid === "9a" || this.category.catid === "9b") {
                productForm.value.gradeval = productForm.value.grade;
            }
            if (this.category.catid === '4a' || this.category.catid === '4c' || this.category.catid === '8c1' || this.category.catid === '9c1' || this.category.catid === '8c3' || this.category.catid === '9c3') {
                productForm.value.finish = null;
            }

            if (this.category.catid === "4a" || this.category.catid === "4b" || this.category.catid === "4c" || this.category.catid === "8c1" || this.category.catid === "8c2" || this.category.catid === "8c3" || this.category.catid === "9c1" || this.category.catid === "9c2" || this.category.catid === "9c3") {
                if (productForm.value.type === "OD") {
                    productForm.value.sch = null;
                    if ((productForm.value.swg == null && productForm.value.mm == null) || ((productForm.value.swg === "" && (productForm.value.mm === "" || productForm.value.mm === null)) || (productForm.value.mm === "" && (productForm.value.swg === "" || productForm.value.swg === null)))) {

                        this.allValid = false;
                        let alert = this.alertCtrl.create({
                            title: 'Enter Thickness!',
                            subTitle: 'Enter values for either SWG or MM or both',
                            buttons: ['OK']
                        });
                        alert.present();
                    }
                    else {
                        this.allValid = true;
                    }

                }
                else {
                    productForm.value.swg = null;
                    productForm.value.finish = null;
                    if (productForm.value.sch == null || productForm.value.mm == null || productForm.value.sch === "" || productForm.value.mm === "") {
                        this.allValid = false;
                        let alert = this.alertCtrl.create({
                            title: 'Enter Thickness!',
                            subTitle: 'Enter values for SCH and MM',
                            buttons: ['OK']
                        });
                        alert.present();

                    }
                    else {
                        this.allValid = true;
                    }

                }

            }
            else if (this.category.catid === 3) {
                if (productForm.value.weight == null || productForm.value.weight === "") {

                    this.allValid = false;
                    let alert = this.alertCtrl.create({
                        title: 'Enter Weight!',
                        subTitle: 'Enter values for weight',
                        buttons: ['OK']
                    });
                    alert.present();
                }
                else {
                    this.allValid = true;
                }
            }
            else {
                this.allValid = true;
            }
            if ((productForm.value.mrate == null && productForm.value.krate == null) || ((productForm.value.mrate === "" && (productForm.value.krate === "" || productForm.value.krate === null)) || (productForm.value.krate === "" && (productForm.value.mrate === "" || productForm.value.mrate === null)))) {
                
                this.priceValid = false;
                let alert = this.alertCtrl.create({
                    title: 'Enter Price',
                    subTitle: 'Enter either Market Rate or Kalamboli rate or both ',
                    buttons: ['OK']
                });
                alert.present();
            }            
            else {
                this.priceValid = true;
            }


        if (this.allValid && this.priceValid){
            let confirm = this.alertCtrl.create({
                title: 'Submit Product?',
                message: 'Do you want to post this product to the market?',
                buttons: [
                    {
                        text: 'No',

                    },
                    {
                        text: 'Agree',
                        handler: () => {
                            this.submitProduct(productForm);
                        }
                    }
                ]
            });
            confirm.present();

        }
        }
        }

    replacer(key, value) {
        if (key == "Grade") return undefined;
        else if (key == "Other") return undefined;
        else if (value == "-") return undefined;
        else return value;
    }
    gradeSelected() {
       
            
        this.af.database.object('/grades/' + this.selectedGrade)
            .subscribe(
            (result) => {
                
                this.selectedGradeItem = result;
            });
        
        this.compositiontxt = JSON.stringify(this.selectedGradeItem, this.replacer);
        this.compositiontxt = this.compositiontxt.replace(/\"|{|}/g, "");
        this.gradeval = this.selectedGradeItem.Grade; 
        //console.log(this.composition.replace(/\"|{|}/g, ""));
       
    }


  ionViewDidLoad() {
      console.log('ionViewDidLoad AddProductPage');
      //console.log(this.currentuser.uid);
    }

  onTypeChange() {

      //console.log(this.typeOD);
      //console.log(this.seamlessForm.value.type);

      if (this.seamlessForm.value.type === "OD") {
          this.typeOD = true;
      }
      else {
          this.typeOD = false;
      }
      console.log(this.typeOD);

  }

  submitProduct(productForm) {

      this.loading = this.loadingCtrl.create({
         content: 'Submitting, Please Wait...'
      });

            
          if(this.allValid && this.priceValid) {
              console.log( productForm.value);
              this.products.push( productForm.value).then(data => {


                  if (this.productImage != null) {
                      this.productImageRef.child(data.key).child('productImage.png')
                          .putString(this.productImage, 'base64', { contentType: 'image/png' })
                          .then((savedPicture) => {
                              /**this.eventList.child(eventId).child('guestList').child(newGuest.key)
                                  .child('profilePicture')
                                  .set(savedPicture.downloadURL);**/
                              this.productImageURL = savedPicture.downloadURL;
                          });
                  }
                  this.af.database.object('products/' + data.key).update(
                      {
                          islive: true,
                          timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                          productImage: this.productImageURL
                      }
                  )
                  if (this.category.catid === 10) {
                      this.af.database.object('users/' + this.currentuser.uid + '/products/' + data.key).set(
                          {

                              islive: true,
                              timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              name: productForm.value.name,                              
                              mrate: productForm.value.mrate,
                              krate: productForm.value.krate,
                              productImage: this.productImageURL
                          }



                      ).then(info => {
                          //console.log("success");
                          this.loading.present();

                          setTimeout(() => {
                              this.navCtrl.popToRoot({ animate: false });
                              this.navCtrl.push(MyProductsPage,{ animate: false });
                              //this.navCtrl.pop({ animate: false });
                          }, 1000);

                          setTimeout(() => {
                              this.loading.dismiss();
                          }, 3000);
                          
                         

                      })
                  }
                  else {

                      this.af.database.object('users/' + this.currentuser.uid + '/products/' + data.key).set(
                          {

                              islive: true,
                              timestamp: firebase.database['ServerValue']['TIMESTAMP'],
                              name: productForm.value.name,
                              grade: productForm.value.grade,
                              mrate: productForm.value.mrate,
                              krate: productForm.value.krate,
                              productImage: this.productImageURL
                          }



                      ).then(info => {

                          //console.log("success");
                          this.loading.present();

                          setTimeout(() => {
                              this.navCtrl.popToRoot({ animate: false });
                              this.navCtrl.push(MyProductsPage, { animate: false });
                          }, 1000);

                          setTimeout(() => {
                              this.loading.dismiss();
                          }, 3000);

                      })

                  }
              })
          }
      }

  public presentActionSheet() {
      let actionSheet = this.actionSheetCtrl.create({
          title: 'Select Image Source',
          buttons: [
              {
                  text: 'Load from Library',
                  handler: () => {
                      //this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                      this.getPicture();
                  }
              },
              {
                  text: 'Use Camera',
                  handler: () => {
                      //this.takePicture(Camera.PictureSourceType.CAMERA);
                      this.takePicture();
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel'
              }
          ]
      });
      actionSheet.present();
  }

  takePicture() {
      Camera.getPicture({
          quality: 95,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          //console.log(this.productImage);
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  getPicture() {
      Camera.getPicture({
          quality: 95,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: Camera.EncodingType.PNG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.productImage = imageData;
          //console.log(this.productImage);
      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  }
}
