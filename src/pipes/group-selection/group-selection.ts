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

    if (this.home.excludeGroups.indexOf("R") > -1) this.excludeGroups.push("#FE4C52");
    if (this.home.excludeGroups.indexOf("Y") > -1) this.excludeGroups.push("#FED035");
    if (this.home.excludeGroups.indexOf("G") > -1) this.excludeGroups.push("#69BB7B");
    if (this.home.excludeGroups.indexOf("B") > -1) this.excludeGroups.push("#0059ff");
    if (this.home.excludeGroups.indexOf("GR") > -1) this.excludeGroups.push("#8E8D93");

  }

  checkVisible(company){
    /*console.log(this.excludeGroups);
    console.log(company);*/


    if (this.excludeGroups.length > 0 && company){ //company sometimes undefined?

      let count = 0;

      for (let s = 0; s < this.excludeGroups.length; s++){
        //console.log(company.categories.indexOf(this.excludeGroups[s]));
        if (company.categories.indexOf(this.excludeGroups[s]) > -1) count++;
      }

      if (count == company.categories.length) return false;
      else return true;
    }
    else return true;

  }

  transform(items: any[]): any {
      return items.filter(item => this.checkVisible(item) !== false);
    }
}
