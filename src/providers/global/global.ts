import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public apiUrl = 'https://centegix-api-dev.herokuapp.com/v1/';
  public frontendUrl = 'https://centegix-web-app-dev.herokuapp.com/';
  public loginState: boolean = false;
  constructor(public http: HttpClient) { }
}
