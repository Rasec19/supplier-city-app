import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/User.interface';
import { IValidUser } from '../interfaces/ValidUser.interface';
import { IVacationRequest } from '../interfaces/VacationRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployService {

  constructor( private http: HttpClient ) { }

  isValidUser( id: number ): Observable<IValidUser> {
    let headers = new HttpHeaders();

    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/empleado/validarUsuario`;
    const response$ = this.http.post<IValidUser>(url, id, { headers });

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

  getAllVacationRequest(): Observable<IVacationRequest[]> {
    let headers = new HttpHeaders();
    headers = headers.append( 'X-EsAdmin', 'true');

    const url = `http://localhost:5084/api/empleado/obtenerTodasLasPeticiones`;
    const response$ = this.http.get<IVacationRequest[]>(url, { headers });

    return response$;
  }

  cancelVacationRequest( id: number, idSolicitud: number, nombre: string ) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('idSolicitud', idSolicitud);
    params = params.append('nombre', nombre);

    console.log({
      id,idSolicitud,nombre
    })

    const url = `http://localhost:5084/api/empleado/cancelarVacaciones`;
    const response$ = this.http.get(url, {params});

    return response$;
  }
}
