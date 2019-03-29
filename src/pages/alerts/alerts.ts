import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';
import { SettingsPage } from '../settings/settings';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {

  alerts: string[];
  locations;
  selectedLocation;
  success: string;
  errorMessage: string;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public rest: RestProvider,
    public storage: NativeStorage) {
      this.alerts = [];
      this.selectedLocation = null;
      this.locations = [];
  }

  settings() {
    var modalPage = this.modalCtrl.create(SettingsPage);
    modalPage.present();
    //this.navCtrl.setRoot(SettingsPage);
  }

  map() {
    console.log('Trying Map');
    var modalPage = this.modalCtrl.create(MapPage);
    modalPage.present();
    //this.navCtrl.setRoot(SettingsPage);
  }

  checkAlerts() {
    this.storage.getItem("token")
      .then(
        token => {
          this.rest.getAlerts(token).subscribe(
            data => {
              console.log(data);
              this.alerts = data;
            }
          );
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    this.checkAlerts();
    setInterval(() => {
      this.checkAlerts();
    }, 2000);
  }

}
