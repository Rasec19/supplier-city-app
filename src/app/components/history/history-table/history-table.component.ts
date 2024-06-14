import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable } from 'rxjs';
import { IHistory } from 'src/app/interfaces/History.interface';
import { IPolicies } from 'src/app/interfaces/User.interface';
import { HistoryService } from 'src/app/services/history.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent {
  public histories$!: Observable<IHistory[]> | Observable<any>;
  cities: any;

  public years: string[] =  ['2024', '2023', '2022', '2021', '2020'];
  @Input() policies!: any;

  historyForm = new FormGroup({
    policies: new FormControl(''),
    year: new FormControl('', [Validators.required]),
  });

  constructor( private historyService: HistoryService, private adminService: AdminService ) {}

  filtrar(): void {
    const politic = this.historyForm.controls['policies'].value!
    const year = this.historyForm.controls['year'].value!
    const id = this.adminService.getUserID();

    console.log({politic, year, id})

    this.histories$ = this.historyService.getUserHistory(id, year, politic);
  }

  clean(): void {
    this.historyForm.reset({
      policies: '',
      year: '',
    })
  }
}
