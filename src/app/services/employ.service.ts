import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployService {

  constructor( private http: HttpClient ) { }

  isValidUser( id: number ) {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/empleado/validarUsuario`;
    const response$ = this.http.post(url, id, { headers });

    return response$;
  }
}
