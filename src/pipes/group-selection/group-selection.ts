import { Pipe, PipeTransform } from '@angular/core';
import { HomePage } from '../../pages/home/home';
/**
 * Generated class for the GroupSelectionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */

@Pipe({
  name: 'groupSelection',
  pure: false
})
export class GroupSelectionPipe implements PipeTransform {

  excludeGroups = [];

  constructor(public home: HomePage) {

  }

  checkVisible(company){

    if (this.home.excludeGroups.length > 0 && company){ //company sometimes undefined?

      let count = 0;

      for (let s = 0; s < this.home.excludeGroups.length; s++){
        //console.log(company.categories.indexOf(this.excludeGroups[s]));
        //if (company.categories.findIndex(str => str == this.excludeGroups[s])) count++;
        if (company.categories.indexOf(this.home.excludeGroups[s]) > -1) count++;
      }

      if (count == company.categories.length) return false;
      else return true;
    }
    else return true;

  }

  transform(items: any[]): any {
    //console.log("group selection pipe");
    return items.filter(item => this.checkVisible(item) !== false);
  }
}
