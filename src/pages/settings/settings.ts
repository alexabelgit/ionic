import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  login = LoginPage;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logOut(){
    this.storage.clear().then(()=>{
      this.navCtrl.push(this.login);
    });
  }

  goBack(){
    this.navCtrl.pop();
  }

}
