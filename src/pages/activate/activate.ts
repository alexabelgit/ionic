import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the ActivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {
  alertOptions: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController, 
    public navParams: NavParams, 
    public rest: RestProvider) {
  }

  settings() {
    var modalPage = this.modalCtrl.create(SettingsPage);
    modalPage.present();
    //this.navCtrl.setRoot(SettingsPage);
  }

  alert() {
    let toast = this.toastCtrl.create({
      message: 'You Do Not Have Access to Activate an Alert',
      duration: 3000,
      position: 'top',
      cssClass: 'dark-trans',
      closeButtonText: 'OK',
      showCloseButton: true
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivatePage');
    this.alertOptions = this.rest.getAlertOptions();
  }

}
