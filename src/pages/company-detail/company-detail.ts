import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {

  filterNames = [{"name": "Bedrijfsmanagement, Office Management & Communicatie", "color": "#69BB7B"}, {"name": "ICT Multimedia & Grafische en Digitale Media", "color": "#FED035"}, {"name": "Wetenschappen & Techniek", "color": "#FE4C52"}, {"name": "Toegepaste Informatica & Electronica ICT", "color": "#0059ff"}, {"name": "Gezondheid & Onderwijs", "color": "#8E8D93"}];
  filters: Array<{name: string, color: string }> = [];

  company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  
	  this.company = this.navParams.data;

        this.filterNames.forEach(filterName => {
		  this.company.categories.forEach(color => {
			if(color === filterName.color){
			  this.filters.push({
				name: filterName.name,
				color: filterName.color
			  })
			}
          });
        });
	  }

  ionViewDidLoad() {
    console.log(this.company);
  }

}
