import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaks'
})
export class LinebreaksPipe implements PipeTransform {

  transform(value: string): string {
    console.log("asd  " + value);
    let s = value.replace(/\\n/g, '<br />');
    console.log("asd  " + s);
    return s;
  }
}
