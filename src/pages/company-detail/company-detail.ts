import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CompanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {

  company: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.company = this.navParams.data;  }

  ionViewDidLoad() {
    console.log(this.company);
  }

}
