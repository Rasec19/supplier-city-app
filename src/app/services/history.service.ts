import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IHistory } from '../interfaces/History.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private environment = environment;

  private urlGetUserHistory = `${this.environment.host}${this.environment.history.userHistory}`

  constructor( private http: HttpClient ) { }

  getUserHistory( id: number, year: any, politic?: any ): Observable<IHistory[]> {
    let params = new HttpParams();
    params = params.set('Año', year);
    if(politic) params = params.set('PoliticaId', politic);

    const url = `${this.urlGetUserHistory}/${id}`;
    const response$ = this.http.get<IHistory[]>(url, {params});

    return response$;
  }
}
