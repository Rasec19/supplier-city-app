import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodFormat',
  standalone: true,
})
export class PeriodFormatPipe implements PipeTransform {

  transform(datePeriod: string): string[] {
    const dates = datePeriod.split(',');
    const newDatePeriod = dates.map(date => {
      const [month, day, year] = date.trim().split(' ')[0].split('/');
      return `${day}/${month}/${year} `;
    });
    return newDatePeriod;
  }
}
