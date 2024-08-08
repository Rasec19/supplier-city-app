import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

import { HistoryTableComponent } from './history-table/history-table.component';
import { PeriodFormatPipe } from 'src/app/pipes/period-format.pipe';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [
    HistoryTableComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    PeriodFormatPipe,
    ToastModule
  ],
  exports: [
    HistoryTableComponent,
  ]
})
export class HistoryModule { }
