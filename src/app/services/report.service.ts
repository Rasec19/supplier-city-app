import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private http: HttpClient ) { }

  createReport( id: number, body: any ) {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/reportes/obtenerReportes/${id}`;
    const response$ = this.http.post(url, body, { headers });

    return response$;
  }
}
