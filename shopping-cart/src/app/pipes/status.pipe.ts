import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(value: boolean): any {
    if (value == true) {
      return 'Approved';
    } else if (value == false) {
      return 'Declined';
    }
  }
}
