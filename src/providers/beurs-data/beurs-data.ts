import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BeursDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeursDataProvider {

  data: any;

  constructor(public http: HttpClient) {
    this.data = null;
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('https://dacques.cloudant.com/jobbeurs/data')
        .subscribe(data => {
          this.data = data;
          console.log(data);
          resolve(data);
        });
    });
  }

}
