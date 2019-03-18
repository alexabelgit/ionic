import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { GlobalProvider } from '../global/global';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  constructor(
    public http: HttpClient,
    public platform: Platform,
    private globals: GlobalProvider) {
    this.platform.ready().then(() => {
      if (platform.is('ios') || platform.is('android')) {
        //
      } else {
        //
      }
    });
  }

  tryLogin(credentials): Observable<any> {
    let body = {
      email: "test@test.com",
      password: "testing"
    };
    return this.http.post(this.globals.apiUrl + 'login', JSON.stringify(body), {
      headers: {
        'content': "application/json",
        'content-type': "application/x-www-form-urlencoded"
      }
    }).catch(this.handleError);
  }

  public tryDeviceRegistration(deviceToken, userEmail, userToken, type): Observable<any> {
    let body = {
      UserId: "1",
      token: userToken,
      type: type,
      name: userEmail + "'s "+type+" Device",
      app_token: deviceToken
    };
    return this.http.post(this.globals.apiUrl + 'users/pcds', JSON.stringify(body), {
      headers: {
        'content': "application/json",
        'content-type': "application/json"
      }
    }).catch(this.handleError);
  }

  getCountries(): Observable<string[]> {
    return this.http.get(this.globals.apiUrl)
      .catch(this.handleError);
  }

  getAlerts(token): Observable<string[]> {
    return this.http.get(this.globals.apiUrl + 'alerts?token=' + token)
      .catch(this.handleError);
  }

  getAlertOptions() {
    return [{
      name: "LockDown",
      color: "#ef3c2c",
      altColor: "#FFFFFF",
      action: "lockdown",
      icon: "lock.png"
    },
    {
      name: "Lockout",
      color: "#0066b4",
      altColor: "#FFFFFF",
      action: "lockout",
      icon: "lockout.png"
    },
    {
      name: "Hold",
      color: "#e1e1e1",
      altColor: "#565656",
      action: "hold",
      icon: "hold.png"
    },
    {
      name: "Shelter",
      color: "#ffdf1b",
      altColor: "#3f3f3f",
      action: "shelter",
      icon: "shelter.png"
    },
    {
      name: "Evacuate",
      color: "#01ad75",
      altColor: "#FFFFFF",
      action: "evacuate",
      icon: "evacuate.png"
    }];
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
