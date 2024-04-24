import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { BalancesTableComponent } from './balances-table/balances-table.component'




@NgModule({
  declarations: [
    BalancesTableComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
  ],
  exports: [
    BalancesTableComponent
  ]
})
export class BalancesModule { }
