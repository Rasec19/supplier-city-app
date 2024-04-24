import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IHistory } from 'src/app/interfaces/History.interface';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css']
})
export class HistoryTableComponent {
  public histories$!: Observable<IHistory[]> | Observable<any>;
  cities: any;

  years: string[] = ['2024', '2023', '2022', '2021', '2020'];

  historyForm = new FormGroup({
    politic: new FormControl(''),
    year: new FormControl('', [Validators.required]),
  });

  constructor( private historyService: HistoryService ) {}

  ngOnInit() {

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }

  filtrar(): void {
    const politic = this.historyForm.controls['politic'].value!
    const year = this.historyForm.controls['year'].value!
    const id = 500;

    console.log({politic, year, id})

    this.histories$ = this.historyService.getUserHistory(id, year, politic);
    this.histories$.subscribe(res => console.log(res))
  }

  clean(): void {
    this.historyForm.reset({
      politic: '',
      year: '',
    })
  }
}
