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

  transform(value: any, query: string, field: string): any {
      return query ? value.reduce((prev, next) => {
        if (next[field].includes(query)) { prev.push(next); }
        return prev;
      }, []) : value;
    }
}
