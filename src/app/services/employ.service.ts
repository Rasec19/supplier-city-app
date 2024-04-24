import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/User.interface';

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

  getUserInformation( id: number ): Observable<IUser> {

    const url = `http://localhost:5084/api/empleado/obtenerDatosDelEmpleado/${id}`;
    const response$ = this.http.get<IUser>(url);

    return response$;
  }

  createVacationRequest( id: number, body: any ) {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/empleado/solicitarVacaciones/${id}`;
    const response$ = this.http.post(url, body, { headers });

    return response$;
  }
}
