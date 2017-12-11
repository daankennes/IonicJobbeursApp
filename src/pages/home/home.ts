import { Component } from '@angular/core';
import { NavController, ModalController, ItemSliding } from 'ionic-angular';
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
    segment;

    constructor(public navCtrl: NavController, public modalCtrl: ModalController, public beursDataProv: BeursDataProvider) {

        this.segment = "all";
        this.excludeGroups = [];

        /*this.companies = this.beursDataProv.load().then(function(value) {
          this.groupCompanies(value);
        }, function(err) {
          console.log(err);
        });*/

        this.companies = [
          {"name": "3-it bvba", "categories": ["G", "Y", "R", "B", "GR"], "description": "Test", "standno": 4},
          {"name": "Acco Accountants bvba", "categories": ["G"], "description": "", "standno": 6},
          {"name": "AC Partners", "categories": ["G", "Y", "R", "B"], "description": "", "standno": 2},
          {"name": "ACA IT-Solutions", "categories": ["Y", "B"], "description": "", "standno": 5}
        ];

        console.log(this.companies);

        /*for (let i = 0; i < 100; i++){
          this.companies.push({"name": "blabla" + i, "categories": ["G", "Y", "R", "B", "GR"], "description": "", "standno": 5});
        }*/

        this.groupCompanies(this.companies);

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
