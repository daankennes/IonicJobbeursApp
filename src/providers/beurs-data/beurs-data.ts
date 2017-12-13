import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';

/*
  Generated class for the BeursDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeursDataProvider {

  data: any;

  constructor(public http: HttpClient, private alertCtrl: AlertController, public events: Events) {
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
          resolve(data);
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Data onbereikbaar',
            subTitle: "Kan benodigde data niet downloaden. Internetverbinding beschikbaar?",
            buttons: [
            {
              text: 'Opnieuw proberen',
              handler: () => {
                this.events.publish('downloadfailed');
              }
            }
          ]
          });
          alert.present();
        });
    });
  }

}
