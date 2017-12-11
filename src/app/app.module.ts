import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CompaniesFilterPage } from '../pages/companies-filter/companies-filter';
import { CompanyDetailPage } from '../pages/company-detail/company-detail';

import { GroupSelectionPipe } from '../pipes/group-selection/group-selection';
import { FullTextSearchPipe } from '../pipes/full-text-search/full-text-search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BeursDataProvider } from '../providers/beurs-data/beurs-data';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GroupSelectionPipe,
    FullTextSearchPipe,
    CompaniesFilterPage,
    CompanyDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CompaniesFilterPage,
    CompanyDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BeursDataProvider
  ]
})
export class AppModule {}
