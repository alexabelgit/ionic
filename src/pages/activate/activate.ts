import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';
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
  locations: any;
  selectedLocation: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public rest: RestProvider,
    public storage: NativeStorage,
    public alertCtrl: AlertController) {
  }

  settings() {
    var modalPage = this.modalCtrl.create(SettingsPage);
    modalPage.present();
    //this.navCtrl.setRoot(SettingsPage);
  }

  alert(alert_id, name, location) {
    console.log("Location:"+location)
    console.log("alert_id:"+alert_id)
    let alert = this.alertCtrl.create({
      title: 'Confirm '+name,
      message: 'Would you like to start a '+name+'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Start Alert',
          handler: () => {
            this.storage.getItem("token")
              .then((token) => {
                  this.rest.startAlert(token,alert_id,location).subscribe(response=>{
                    console.log(response);
                  },(error)=>{
                    const toast = this.toastCtrl.create({
                      position: 'top',
                      message: 'Your account cannot start this alert.',
                      duration: 5000
                    });
                    toast.present();
                  });
              })
            }
        }
      ]
    });
    alert.present();
  }

  getLocations() {
    console.log("Running getLocations");
    this.storage.getItem("token")
      .then(
        (token) => {
          console.log("Got Token");
          this.rest.getLocations(token).subscribe(
            data => {
              console.log(data);
              this.locations = data;
              this.selectedLocation = this.locations[0].id;
              this.getAlerttypes();
            }
          );
        },
        error => console.error(error)
      );
  }

  getAlerttypes() {
    console.log("Running getAlerttypes");
    this.storage.getItem("token")
      .then(
        (token) => {
          console.log("Got Token");
          this.rest.getAlertTypes(token, this.selectedLocation).subscribe(
            data => {
              console.log(data);
              this.alertOptions = data;
            }
          );
        },
        error => console.error(error)
      );
  }

  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
    this.getAlerttypes();
  }

  ionViewDidLoad() {
    this.getLocations();
  }

}
