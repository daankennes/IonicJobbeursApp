import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CompaniesFilterPage } from '../pages/companies-filter/companies-filter';
import { CompanyDetailPage } from '../pages/company-detail/company-detail';
import { TutorialPage } from '../pages/tutorial/tutorial';

import { GroupSelectionPipe } from '../pipes/group-selection/group-selection';
import { FullTextSearchPipe } from '../pipes/full-text-search/full-text-search';
import { FavoriteSelectionPipe } from '../pipes/favorite-selection/favorite-selection';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BeursDataProvider } from '../providers/beurs-data/beurs-data';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    HomePage,
    TabsPage,
    GroupSelectionPipe,
    FullTextSearchPipe,
    FavoriteSelectionPipe,
    CompaniesFilterPage,
    CompanyDetailPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    HomePage,
    TabsPage,
    CompaniesFilterPage,
    CompanyDetailPage,
    TutorialPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BeursDataProvider
  ]
})
export class AppModule {}
