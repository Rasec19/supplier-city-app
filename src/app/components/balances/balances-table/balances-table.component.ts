import { Component, Input } from '@angular/core';
import { IBalance } from 'src/app/interfaces/Balance.interface';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-balances-table',
  templateUrl: './balances-table.component.html',
  styleUrls: ['./balances-table.component.css']
})
export class BalancesTableComponent {

  @Input() public balances!: IBalance[] | any

  constructor( private employService: EmployService ) {}

  formatPeriodo(datePeriod: string): string[] {
    const dates = datePeriod.split(',');
    const newDatePeriod = dates.map(date => date.trim().split(' ')[0].concat(' '));
    return newDatePeriod
  }
}
