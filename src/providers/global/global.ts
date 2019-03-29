import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public apiUrl = 'https://api.centegix.com/v1/';
  public frontendUrl = 'https://web.centegix.com/';
  public loginState: boolean = false;
  constructor(public http: HttpClient) { }
}
