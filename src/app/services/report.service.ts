import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReport } from '../interfaces/Report.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private environment = environment;

  private urlCreateReport = `${this.environment.host}${this.environment.report.createReport}`
  private urlCreateReportConciliacion = `${this.environment.host}${this.environment.report.createReportConciliacion}`

  constructor( private http: HttpClient ) { }

  createReport( id: number, body: any ): Observable<IReport> {
    const url = `${this.urlCreateReport}/${id}`;
    const response$ = this.http.post<IReport>(url, body);

    return response$;
  }

  createReportConciliacion( id: number, body: any ): Observable<IReport> {
    const response$ = this.http.post<IReport>(this.urlCreateReportConciliacion, body);
    return response$;
  }
}
