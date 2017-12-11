import { Pipe, PipeTransform } from '@angular/core';
import { HomePage } from '../../pages/home/home';

/**
 * Generated class for the FavoriteSelectionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'favoriteSelection',
  pure: false
})
export class FavoriteSelectionPipe implements PipeTransform {

   constructor(public home: HomePage) {
   }

  checkIfFavoriteActive(company){

    if (this.home.segment == "favorites"){
      if (this.home.favoriteCompanies.length < 1) return false;
      else if (this.home.favoriteCompanies.indexOf(company) > -1) return true;
      else return false;
    }
    else {
      return true;
    }
  }

  transform(items: any[]): any {
       return items.filter(item => this.checkIfFavoriteActive(item) !== false);
  }
}
