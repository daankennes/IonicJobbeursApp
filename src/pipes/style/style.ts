import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the StylePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'style',
})
export class StylePipe implements PipeTransform {

  constructor (){

  }
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    console.log(value);
  }
}
