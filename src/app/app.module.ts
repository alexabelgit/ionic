import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';

import { LoginPage } from '../pages/login/login';
import { InsightsPage } from '../pages/insights/insights';
import { PlansPage } from '../pages/plans/plans';
import { AlertsPage } from '../pages/alerts/alerts';
import { ActivatePage } from '../pages/activate/activate';
import { SettingsPage } from '../pages/settings/settings';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Push } from '@ionic-native/push';
import { GlobalProvider } from '../providers/global/global';
import { FCM } from '@ionic-native/fcm';

@NgModule({
  declarations: [
    MyApp,
    InsightsPage,
    PlansPage,
    AlertsPage,
    SettingsPage,
    MapPage,
    TabsPage,
    LoginPage,
    ActivatePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InsightsPage,
    PlansPage,
    AlertsPage,
    SettingsPage,
    MapPage,
    TabsPage,
    ActivatePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthServiceProvider,
    NativeStorage,
    Push,
    GlobalProvider,
    ThemeableBrowser,
    FCM
  ]
})
export class AppModule {}
