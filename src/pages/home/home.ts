import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding, AlertController } from 'ionic-angular';
import { CompaniesFilterPage } from '../companies-filter/companies-filter';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { BeursDataProvider } from '../../providers/beurs-data/beurs-data';

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

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public beursDataProv: BeursDataProvider, public alertCtrl: AlertController) {

        this.segment = "all";
        this.excludeGroups = [];
        this.favoriteCompanies = [];

        this.beursDataProv.load().then(data => {
          this.companies = data.companyinfo;
          this.groupCompanies(this.companies);
        });

        this.searchableList = ['name','description'];

        console.log(this.companies);

    }

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
        this.segment = "all"; //geeft nog visuele fout: lijkt alsof favorieten nog steeds geselecteerd is
        console.log(this.segment);
        alert.present();
      }
    }

    addFavorite(slidingItem: ItemSliding, companyData: any) {

      if (this.favoriteCompanies.indexOf(companyData) > -1) {
        this.removeFavorite(slidingItem, companyData, 'Favoriet al toegevoegd');
      }
      else {
        this.favoriteCompanies.push(companyData);

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
              let index = this.favoriteCompanies.indexOf(companyData);
              this.favoriteCompanies.splice(index, 1);
              slidingItem.close();
            }
          }
        ]
      });
      // now present the alert on top of all other content
      alert.present();
    }

    updateCompanies(){
      /*console.log("update companies");
      console.log(this.excludeGroups);*/
    }

    goToCompanyDetail(companyData: any){
      this.navCtrl.push(CompanyDetailPage, companyData);
    }

    presentFilter() {
      let modal = this.modalCtrl.create(CompaniesFilterPage, this.excludeGroups);
      modal.present();

      modal.onWillDismiss((data: any[]) => {
        if (data) {
          this.excludeGroups = data;
          this.groupCompanies(this.companies);
        }
      });

    }

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

        console.log(this.groupedCompanies);

    }


}
