import { Component } from '@angular/core';
interface IStory {
  vacations: string,
  current: string,
  programated: string,
  available: string,
  period: string,
}

interface IHistory {
  dates: string,
  politycs: string,
  descripcion: string,
  days: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vacaciones';
  public stories: IStory[] = [
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
    {
      vacations: '100',
      current: '100',
      programated: '100',
      available: '100',
      period: '100',
    },
  ];
  public histories: IHistory[] = [
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
    {
      dates: '101',
      politycs: '101',
      descripcion: '101',
      days: '101',
    },
  ];
}
