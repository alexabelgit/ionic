import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, MenuController, LoadingController, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';
import { FCM } from '@ionic-native/fcm/ngx';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: any;
  data = {
    email: '',
    password: ''
  };

  constructor(
    public navCtrl: NavController,
    public auth: AuthServiceProvider,
    public navParams: NavParams,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: NativeStorage,
    private rest: RestProvider,
    public plt: Platform,
    private fcm: FCM) {

    var _self = this;
    this.storage.getItem("email")
      .then(
        email => {
          console.log(email)
          this.storage.getItem("token")
            .then(
              token => {
                console.log("Already Logged In")
                console.log(token)
                _self.navCtrl.setRoot(TabsPage);
              },
              error => console.error(error)
            );
        },
        error => console.error(error)
      );
  }

  // login and go to home page
  login() {
    this.showLoading()
    this.auth.login(this.data).subscribe(
      data => {
        this.storage.setItem("token", data.token);
        this.storage.setItem("email", this.data.email);
        if (this.plt.is('android')) {
          var deviceType = 'android';
          this.fcm.getToken().then(token => {
            this.rest.tryDeviceRegistration(token, data.email, data.token, deviceType).subscribe(
              registration => {
                console.log("Sucess Registration" + registration)
              },
              error => console.error(error)
            );
          });
        }
        if (this.plt.is('ios')) {
          this.storage.getItem("deviceToken")
            .then(
              deviceToken => {
                var deviceType = 'ios';
                this.rest.tryDeviceRegistration(deviceToken, data.email, data.token, deviceType).subscribe(
                  registration => {
                    console.log("Sucess Registration" + registration)
                  },
                  error => console.error(error)
                );
                console.log("Retrieving Device Token and sending to api here:")
                console.log(data)
              },
              error => console.error(error)
            );
        console.log("email: " + this.data.email);
        console.log("Token: " + data.token);
        }
        this.navCtrl.setRoot(TabsPage);
      },
      err => {
        this.showError("Access Denied");
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
