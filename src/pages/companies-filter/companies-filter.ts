import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CompaniesFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-companies-filter',
  templateUrl: 'companies-filter.html',
})
export class CompaniesFilterPage {

  filterNames = [{"name": "Bedrijfsmanagement, Office Management & Communicatie", "lookup": "G"}, {"name": "ICT Multimedia & Grafische en Digitale Media", "lookup": "Y"}, {"name": "Wetenschappen & Techniek", "lookup": "R"}, {"name": "Toegepaste Informatica & Electronica ICT", "lookup": "B"}, {"name": "Gezondheid & Onderwijs", "lookup": "GR"}];
  filters: Array<{name: string, isChecked: boolean, lookup: string }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    let excludeGroups = this.navParams.data;

        this.filterNames.forEach(filterName => {
          this.filters.push({
            name: filterName.name,
            isChecked: (excludeGroups.indexOf(filterName.lookup) === -1),
            lookup: filterName.lookup
          });
        });
        console.log(excludeGroups);
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.filters.forEach(filter => {
      filter.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeGroups = this.filters.filter(c => !c.isChecked).map(c => c.lookup);
    this.dismiss(excludeGroups);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

}
