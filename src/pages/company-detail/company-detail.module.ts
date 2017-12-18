import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyDetailPage } from './company-detail';

@NgModule({
  declarations: [
    CompanyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyDetailPage),
  ],
})
export class CompanyDetailPageModule {}
