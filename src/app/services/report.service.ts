import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReport } from '../interfaces/Report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private http: HttpClient ) { }

  createReport( id: number, body: any ): Observable<IReport> {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/reportes/obtenerReportes/${id}`;
    const response$ = this.http.post<IReport>(url, body, { headers });

    return response$;
  }

  createReportConciliacion( id: number, body: any ): Observable<IReport> {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/reportes/obtenerReporteConciliacion`;
    const response$ = this.http.post<IReport>(url, body, { headers });

    return response$;
  }
}
