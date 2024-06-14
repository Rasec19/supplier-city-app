import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BalancesTableComponent } from './balances-table/balances-table.component'
import { PeriodFormatPipe } from 'src/app/pipes/period-format.pipe';




@NgModule({
  declarations: [
    BalancesTableComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    PeriodFormatPipe
  ],
  exports: [
    BalancesTableComponent
  ]
})
export class BalancesModule { }
