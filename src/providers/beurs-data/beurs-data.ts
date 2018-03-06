import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
//import { HomePage } from '../../pages/home/home';

/*
  Generated class for the BeursDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeursDataProvider {

  groupedCompanies = [];

  constructor(public http: HttpClient, private alertCtrl: AlertController, public events: Events) {

  }

  //use raw company array to create array grouped by first letter for presentation
  groupCompanies(companies){

      companies = companies.companyinfo;

      let sortedCompanies = companies.sort(function(a, b) {
          return a.name.localeCompare(b.name);
      });
      let currentLetter = false;
      let currentCompanies = [];

      this.groupedCompanies = [];

      sortedCompanies.forEach((value, index) => {

          //value.name = value.charAt(0).toUpperCase() + value.slice(1);

          for (let j = 0; j < value.categories.length; j++){
            let currentColor = value.categories[j];

            if (currentColor == "R")
              value.categories[j] = "#FE4C52";
            if (currentColor == "Y")
              value.categories[j] = "#FED035";
            if (currentColor == "G")
              value.categories[j] = "#69BB7B";
            if (currentColor == "B")
              value.categories[j] = "#0059ff";
            if (currentColor == "GR")
              value.categories[j] = "#8E8D93";

          }

          if(value.name.charAt(0) != currentLetter){

              currentLetter = value.name.charAt(0);

              let newGroup = {
                  letter: currentLetter,
                  companies: []
              };

              currentCompanies = newGroup.companies;
              this.groupedCompanies.push(newGroup);

          }

          currentCompanies.push(value);

      });
      return this.groupedCompanies;
  }

  load() {

    return new Promise(resolve => {
      this.http.get('https://dacques.cloudant.com/jobbeurs/data')
        .subscribe(data => {
          //console.log(data);
          this.groupCompanies(data);
          resolve(this.groupedCompanies);
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
