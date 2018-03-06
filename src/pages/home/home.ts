import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding, AlertController, Events, ToastController } from 'ionic-angular';
import { CompaniesFilterPage } from '../companies-filter/companies-filter';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { BeursDataProvider } from '../../providers/beurs-data/beurs-data';
//import { GroupSelectionPipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    groupedCompanies;
    excludeGroups = [];
    favoriteCompanies = [];
    searchableList = [];
    segment;
    waiting: boolean = true;
    i = 0;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public beursDataProv: BeursDataProvider, public alertCtrl: AlertController, private storage: Storage, public events: Events, private toastCtrl: ToastController) {

        //set initial segment
        this.segment = "all";

        //check if favorite companies or filter settings were stored from previous use
        this.checkFilterData();
        this.checkFavoriteCompaniesData();

        this.checkData();
        //check if app was able to get required data
        events.subscribe('downloadfailed', () => {
         this.checkData();
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
    checkData() {

    var found = false;

    this.storage.forEach( (value, key, index) => {
      if (key === "groupedCompanyInfo"){
        this.groupedCompanies = value;
        //console.log("saved grouped companyinfo found");
        found = true;
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


}
