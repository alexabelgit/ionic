import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalProvider } from '../global/global';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

export class User {
  name: string;
  email: string;
  loggedIn: boolean;
  token: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;

  constructor(public http: HttpClient,
    private globals: GlobalProvider) {
    console.log('Hello AuthServiceProvider Provider');
  }

  public login(credentials): Observable<any> {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let body = {
        email: credentials.email,
        password: credentials.password
      };

      return this.http.post(this.globals.apiUrl+'login', JSON.stringify(body), {
        headers:{
          'content':"application/json",
          'content-type':"application/json"
        }
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
