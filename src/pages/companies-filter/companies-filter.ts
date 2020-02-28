import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CompaniesFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-companies-filter',
  templateUrl: 'companies-filter.html',
})
export class CompaniesFilterPage {

  filterNames = [{"name": "Bedrijfsmanagement, Office Management & Communicatie", "color": "#69BB7B", "lookup": "G"}, {"name": "ICT Multimedia & Grafische en Digitale Media", "color": "#FED035", "lookup": "Y"}, {"name": "Wetenschappen & Techniek", "color": "#FE4C52", "lookup": "R"}, {"name": "Toegepaste Informatica & Electronica ICT", "color": "#0059ff", "lookup": "B"}, {"name": "Gezondheid & Onderwijs", "color": "#8E8D93", "lookup": "GR"}];
  // zonder grijs: filterNames = [{"name": "Bedrijfsmanagement, Office Management & Communicatie", "color": "#69BB7B", "lookup": "G"}, {"name": "ICT Multimedia & Grafische en Digitale Media", "color": "#FED035", "lookup": "Y"}, {"name": "Wetenschappen & Techniek", "color": "#FE4C52", "lookup": "R"}, {"name": "Toegepaste Informatica & Electronica ICT", "color": "#0059ff", "lookup": "B"}];
  filters: Array<{name: string, isChecked: boolean, color: string, lookup: string }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {

    let excludeGroups = this.navParams.data;

        this.filterNames.forEach(filterName => {
          this.filters.push({
            name: filterName.name,
            isChecked: (excludeGroups.indexOf(filterName.color) === -1),
            color: filterName.color,
            lookup: filterName.lookup
          });
        });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.filters.forEach(filter => {
      filter.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludeGroups = this.filters.filter(c => !c.isChecked).map(c => c.color);
    this.dismiss(excludeGroups);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }

}
