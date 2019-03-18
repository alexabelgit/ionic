import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import { DomSanitizer } from '@angular/platform-browser';
//import { GlobalProvider } from '../../providers/global/global';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  public userMapLink;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    // private storage: NativeStorage,
    // private globals: GlobalProvider,
    public sanitizer: DomSanitizer) {
      /*
      this.storage.getItem("token")
      .then(
            token => {
              //this.userMapLink = this.globals.frontendUrl+'auth/loginToken?username=username&password='+token;
              console.log(token);
              const browser = this.iab.open('https://ionicframework.com/');
              //browser.show();
            },
            error => console.error(error)
          );
      */
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //const browser = this.themeBrowser.create('http://apache.org', '_blank', {
    //  fullscreen: false
    //});
  }

  goBack(){
    this.navCtrl.pop();
  }
}
