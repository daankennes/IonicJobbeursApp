import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding, AlertController, Events, ToastController } from 'ionic-angular';
import { CompaniesFilterPage } from '../companies-filter/companies-filter';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { BeursDataProvider } from '../../providers/beurs-data/beurs-data';
//import { GroupSelectionPipe } from '@angular/common';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    groupedCompanies;
    dataVersion;
    excludeGroups = [];
    favoriteCompanies = [];
    searchableList = [];
    segment;
    waiting: boolean = true;
    i = 0;

    constructor(public http: HttpClient, public navCtrl: NavController, public modalCtrl: ModalController, public beursDataProv: BeursDataProvider, public alertCtrl: AlertController, private storage: Storage, public events: Events, private toastCtrl: ToastController) {

        //set initial segment
        this.segment = "all";

        //check if favorite companies or filter settings were stored from previous use
        this.checkFilterData();
        this.checkFavoriteCompaniesData();

        //this.checkData();
        this.checkDataVersion();
        //check if app was able to get required data
        events.subscribe('downloadfailed', () => {
         //this.checkData();
         this.checkDataVersion();
        });

        //set searchable company items for full text search
        this.searchableList = ['name','description'];
    }

    loadingReady(){
      this.waiting = false;
    }

    //add a favorite company, ask to remove favorite company if already favorite
    addFavorite(slidingItem: ItemSliding, companyData: any) {

      if (this.favoriteCompanies.findIndex(obj => obj.name == companyData.name) > -1) {
        this.removeFavorite(slidingItem, companyData, 'Favoriet al toegevoegd');
      }
      else {
        this.favoriteCompanies.push(companyData);
        this.saveFavorites();
        //this.storage.set("favoriteCompanies", this.favoriteCompanies);
        slidingItem.close();
        // show toast
        let toast = this.toastCtrl.create({
          message: 'Favoriet toegevoegd.',
          duration: 1500,
          position: 'bottom'
        });

        toast.present();
        // create an alert instance
        /*let alert = this.alertCtrl.create({
          title: 'Favorieten',
          message: 'Favoriet toegevoegd.',
          buttons: [{
            text: 'Oké',
            handler: () => {
              // close the sliding item
              slidingItem.close();
            }
          }]
        });
        // now present the alert on top of all other content
        alert.present();*/
      }

    }

    //remove a favorite item
    removeFavorite(slidingItem: ItemSliding, companyData: any, title: string) {
      let alert = this.alertCtrl.create({
        title: title,
        message: 'Dit bedrijf uit favorieten verwijderen?',
        buttons: [
          {
            text: 'Annuleren',
            handler: () => {
              slidingItem.close();
            }
          },
          {
            text: 'Verwijderen',
            handler: () => {
              let index = this.favoriteCompanies.findIndex(obj => obj.name == companyData.name);
              this.favoriteCompanies.splice(index, 1);
              this.saveFavorites();
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      alert.present();
    }

    //check if favorite companies can be found in storage from previous use
    checkFavoriteCompaniesData(){
      let found = false;

      this.storage.forEach( (value, key, index) => {
        if (key === "favoriteCompanies"){
          this.favoriteCompanies = value;
          //console.log("got favorite companies");
          found = true;
        }
      }).then(() => {
          if (!found){
            this.favoriteCompanies = [];
          }
        }, (err) => {
            console.log(err);
      });
    }

    //open page with company selection filters
    presentFilter() {
      let modal = this.modalCtrl.create(CompaniesFilterPage, this.excludeGroups);
      modal.present();

      modal.onWillDismiss((data: any[]) => {
        if (data) {
          this.excludeGroups = data;
          this.storage.set("excludeGroups", this.excludeGroups);
        }
      });

    }

    //present company details
    presentDetails(companyData: any) {
      let modal = this.modalCtrl.create(CompanyDetailPage, { data: companyData, favoriteCompanies: this.favoriteCompanies });
      modal.present();

      modal.onWillDismiss((data: any[]) => {
        //console.log(companyData);
        if (data) {
          this.favoriteCompanies = data;
          this.saveFavorites();
        }
      });

    }

    saveFavorites(){
      this.storage.set("favoriteCompanies", this.favoriteCompanies);
      //console.log("Favorites saved");
    }

    saveDataVersion(){
      this.storage.set("dataVersion", this.dataVersion);
      //console.log("Favorites saved");
    }

    //check if filter settings can be found in storage from previous use
    checkFilterData(){
      let found = false;

      this.storage.forEach( (value, key, index) => {
        if (key === "excludeGroups"){
          this.excludeGroups = value;
          //console.log("got excluded groups");
          found = true;
        }
      }).then(() => {
          if (!found){
            this.excludeGroups = [];
          }
        }, (err) => {
            console.log(err);
      });
    }

    //check if grouped company data is already available in storage, if not download the data

    checkDataVersion() {
      return new Promise(resolve => {
        this.http.get('https://ksawestmalle.be/version.json')
        //this.http.get('assets/data/version.json')
          .subscribe(data => {
            console.log(data);

            this.dataVersion = data["version"];
            //this.groupCompanies(data);
            //resolve(this.groupedCompanies);

            //kijken of er versie opgeslagen is
            var upToDate = false;
            var found = false;

            this.storage.forEach( (value, key, index) => {
              if (key === "dataVersion"){
                //this.dataVersion = value;
                found = true;
                console.log(value);
                console.log("dataVersion found: " + data["version"]);
                if (value === data["version"]) {
                  upToDate = true;
                  console.log("dataVersion up to date");
                } 
              }
            }).then(() => {
              if (!found) {
                //nieuwe dataversie opslaan in geheugen
                console.log("dataversion not up to date");
                this.saveDataVersion();
              }
              if (!upToDate){
                console.log("loading new data");
                this.beursDataProv.load()
                  .then(data => {
                    this.groupedCompanies = data;
                    this.saveData(this.groupedCompanies);
                    this.saveDataVersion();
                    //console.log(data);
                    //this.waiting = false;
                    //this.groupCompanies(this.companies);
                });
                //this.jsonWorkaround();
              }
            }, (err) => {
                console.log(err);
          });


            this.checkData();
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

    checkData() {

    var found = false;

    this.storage.forEach( (value, key, index) => {
      if (key === "groupedCompanyInfo"){
        this.groupedCompanies = value;
        //console.log("saved grouped companyinfo found");
        found = true;
        console.log(this.groupedCompanies);
        //this.waiting = false;
      }
    }).then(() => {
        if (!found){
          this.beursDataProv.load()
            .then(data => {
              this.groupedCompanies = data;
              this.saveData(this.groupedCompanies);
              //console.log(data);
              //this.waiting = false;
              //this.groupCompanies(this.companies);
          });
          //this.jsonWorkaround();
        }
      }, (err) => {
          console.log(err);
    });

  }

  //save the grouped company data to storage
  saveData(groupedCompanies){
      this.storage.set("groupedCompanyInfo", groupedCompanies);
      //console.log("saved grouped company data to storage");
  }

  jsonWorkaround() {
    this.http.get('assets/data/workaround.json').subscribe(data => {
      this.groupedCompanies = data;
    });
    //return "";
  }

  //check if grouped company data is already available in storage, if not download the data

  /*checkMapVersion() {
    return new Promise(resolve => {
      //this.http.get('https://ksawestmalle.be/version.json')
      this.http.get('assets/data/version.json')
        .subscribe(data => {
          console.log(data);

          this.mapVersion = data["mapVersion"];
        
          //kijken of er versie opgeslagen is
          var upToDate = false;
          var found = false;

          this.storage.forEach( (value, key, index) => {
            if (key === "mapVersion"){
              found = true;
              console.log(value);
              console.log("mapVersion found: " + data["mapVersion"]);
              if (value === data["mapVersion"]) {
                upToDate = true;
                console.log("mapVersion up to date");
              } 
            }
          }).then(() => {
            if (!found) {
              //nieuwe dataversie opslaan in geheugen
              console.log("mapversion not up to date");
              this.saveMapVersion();
            }
            if (!upToDate){
              console.log("loading new map");
              //saveMapData();
              //saveMapVersion();
             
              //this.jsonWorkaround();
            }
          }, (err) => {
              console.log(err);
        });


          this.checkMapData();
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
  }*/


}
