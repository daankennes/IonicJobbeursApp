import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding, AlertController, Events } from 'ionic-angular';
import { CompaniesFilterPage } from '../companies-filter/companies-filter';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { BeursDataProvider } from '../../providers/beurs-data/beurs-data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

    companies;
    groupedCompanies = [];
    excludeGroups = [];
    favoriteCompanies = [];
    searchableList = [];
    segment;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public beursDataProv: BeursDataProvider, public alertCtrl: AlertController, private storage: Storage, public events: Events) {

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

    /*ionViewWillEnter(){
      this.checkData();
    }*/

    //check if favorite segment has been selected, show message if no favorites are available
    segmentChanged(){

      //slidingItem.close(); close all open items

      if (this.segment == "favorites" && this.favoriteCompanies.length < 1){
        let alert = this.alertCtrl.create({
          title: 'Favorieten',
          subTitle: 'Nog geen favorieten toegevoegd.',
          buttons: [{
              text: 'Oké',
            }]
          });
        alert.present();
        this.segment = "all"; //geeft nog visuele fout: lijkt alsof favorieten nog steeds geselecteerd is
      }
    }

    //add a favorite company, ask to remove favorite company if already favorite
    addFavorite(slidingItem: ItemSliding, companyData: any) {

      if (this.favoriteCompanies.findIndex(obj => obj.name == companyData.name) > -1) {
        this.removeFavorite(slidingItem, companyData, 'Favoriet al toegevoegd');
      }
      else {
        this.favoriteCompanies.push(companyData);
        this.storage.set("favoriteCompanies", this.favoriteCompanies);
        console.log(this.favoriteCompanies);
        // create an alert instance
        let alert = this.alertCtrl.create({
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
        alert.present();
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
              this.storage.set("favoriteCompanies", this.favoriteCompanies);
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
          console.log(this.favoriteCompanies);
          console.log("got favorite companies");
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

    updateCompanies(){
      /*console.log("update companies");
      console.log(this.excludeGroups);*/
    }

    //open page with company details
    goToCompanyDetail(companyData: any){
      this.navCtrl.push(CompanyDetailPage, companyData);
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

    //check if filter settings can be found in storage from previous use
    checkFilterData(){
      let found = false;

      this.storage.forEach( (value, key, index) => {
        if (key === "excludeGroups"){
          this.excludeGroups = value;
          console.log("got excluded groups");
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

    //use raw company array to create array grouped by first letter for presentation
    groupCompanies(companies){

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

        this.saveData();
        console.log(this.groupedCompanies);
    }

    //check if grouped company data is already available if storage, if not download the data
    checkData() {

    var found = false;

    this.storage.forEach( (value, key, index) => {
      if (key === "groupedCompanyInfo"){
        this.groupedCompanies = value;
        console.log("saved grouped companyinfo found");
        found = true;
      }
    }).then(() => {
        if (!found){
          this.beursDataProv.load()
            .then(data => {
              this.companies = data.companyinfo;
              this.groupCompanies(this.companies);
          });
        }
      }, (err) => {
          console.log(err);
    });

  }

  //save the grouped company data to storage
  saveData(){
      this.storage.set("groupedCompanyInfo", this.groupedCompanies);
      console.log("saved grouped company data to storage");
  }


}
