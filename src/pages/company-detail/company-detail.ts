import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Clipboard } from '@ionic-native/clipboard';

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
  favorited: boolean = false;
  favoriteCompanies: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private clipboard: Clipboard, private toastCtrl: ToastController) {

	  this.company = this.navParams.data.data;
    this.favoriteCompanies = this.navParams.data.favoriteCompanies;

    if (this.favoriteCompanies.findIndex(obj => obj.name == this.company.name) == -1) this.favorited = false;
    else this.favorited = true;

      this.filterNames.forEach(filterName => {
  		  this.company.categories.forEach(color => {
    			if(color === filterName.color){
    			  this.filters.push({
      				name: filterName.name,
      				color: filterName.color
            })
  			  }
        })
      })

      this.company.description = this.company.description.replace(/(\r\n|\n\r|\r|\n)/gm, "<br>");;
	  }

  ionViewDidLoad() {
    console.log(this.company);
  }

  clickFavorite() {
    if (this.favorited) {
      this.favorited = false;
      this.removeFavorite();
    }
    else {
      this.favorited = true;
      this.addFavorite();
    }
    console.log(this.favoriteCompanies);
  }

  addFavorite() {
    if (this.favoriteCompanies.findIndex(obj => obj.name == this.company.name) == -1) this.favoriteCompanies.push(this.company);
    let toast = this.toastCtrl.create({
      message: 'Favoriet toegevoegd.',
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

  removeFavorite() {
    let index = this.favoriteCompanies.findIndex(obj => obj.name == this.company.name);
    this.favoriteCompanies.splice(index, 1);
    let toast = this.toastCtrl.create({
      message: 'Favoriet verwijderd.',
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.favoriteCompanies);
  }

  copyToClipboard(text) {
    this.clipboard.copy(text);
    let toast = this.toastCtrl.create({
      message: 'Gekopieerd naar klembord.',
      duration: 1500,
      position: 'bottom'
    });

    toast.present();
  }

}
