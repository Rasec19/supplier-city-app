import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IHistory } from '../interfaces/History.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor( private http: HttpClient ) { }

  getUserHistory( id: number, year: any, politic?: any ): Observable<IHistory[]> {
    let params = new HttpParams();
    params = params.set('Año', year);
    if(politic) params = params.set('PoliticaId', politic);

    const url = `http://localhost:5084/api/empleado/obtenerHistoriasEmpleado/${id}`;
    const response$ = this.http.get<IHistory[]>(url, {params});

    return response$;
  }
}
