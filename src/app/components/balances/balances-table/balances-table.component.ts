import { Component, Input } from '@angular/core';
import { IStory } from 'src/app/interfaces/Story.interface';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-balances-table',
  templateUrl: './balances-table.component.html',
  styleUrls: ['./balances-table.component.css']
})
export class BalancesTableComponent {

  @Input() public balances!: IStory | any

  constructor( private employService: EmployService ) {}

  formatPeriodo(datePeriod: string): string[] {
    const dates = datePeriod.split(',');
    const newDatePeriod = dates.map(date => date.trim().split(' ')[0].concat(' '));
    console.log(newDatePeriod)
    return newDatePeriod
  }
}
