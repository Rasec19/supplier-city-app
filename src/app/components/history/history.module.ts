import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { HistoryTableComponent } from '../balances/history-table/history-table.component';



@NgModule({
  declarations: [
    HistoryTableComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
  ],
  exports: [
    HistoryTableComponent
  ]
})
export class HistoryModule { }
