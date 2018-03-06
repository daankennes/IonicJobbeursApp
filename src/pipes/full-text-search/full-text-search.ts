import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FullTextSearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */

@Pipe({
  name: 'fullTextSearch',
  pure: false
})
export class FullTextSearchPipe implements PipeTransform {
  constructor() { }

    transform(value: any, input: string, searchableList : any) {
      if (input) {
        console.log(input);
       input = input.toLowerCase();
       return value.filter(function (el: any) {
         console.log(el);
       var isTrue = false;
       for(var k in searchableList ){
         if(el[searchableList[k]].toLowerCase().indexOf(input) > -1){
          isTrue = true;
         }
         if(isTrue){
          return el
         }
        }
      })
     }
     return value;
    }
}
