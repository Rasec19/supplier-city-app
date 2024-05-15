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

    const url = `http://localhost:5084/api/empleado/validarUsuario`;
    const response$ = this.http.post<IValidUser>(url, id);

    return response$;
  }

  getUserInformation( id: number ): Observable<IUser> {
    const url = `http://localhost:5084/api/empleado/obtenerDatosDelEmpleado/${id}`;
    const response$ = this.http.get<IUser>(url);

    return response$;
  }

  createVacationRequest( id: number, body: any ) {

    const url = `http://localhost:5084/api/empleado/solicitarVacaciones/${id}`;
    const response$ = this.http.post(url, body)

    return response$;
  }

  getAllVacationRequest(): Observable<IVacationRequest[]> {

    const url = `http://localhost:5084/api/empleado/obtenerTodasLasPeticiones`;
    const response$ = this.http.get<IVacationRequest[]>(url);

    return response$;
  }

  getVacationRequestByUser( id: number ): Observable<IVacationRequest[]> {

    const url = `http://localhost:5084/api/empleado/obtenerSolicitudesDeVacacionesEmpleado/${id}`;
    const response$ = this.http.get<IVacationRequest[]>(url);

    return response$;
  }

  cancelVacationRequest( id: number, idSolicitud: number, nombre: string ) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('idSolicitud', idSolicitud);
    params = params.append('nombre', nombre);

    const url = `http://localhost:5084/api/empleado/cancelarVacaciones`;
    const response$ = this.http.get(url, {params});

    return response$;
  }

  getAllEmployes(): Observable<any> {
    const url = `http://localhost:5084/api/empleado/obtenerTodosLosEmpleados`;
    const response$ = this.http.get(url);

    return response$;
  }
}
