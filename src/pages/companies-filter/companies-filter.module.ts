import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompaniesFilterPage } from './companies-filter';

@NgModule({
  declarations: [
    CompaniesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(CompaniesFilterPage),
  ],
})
export class CompaniesFilterPageModule {}
