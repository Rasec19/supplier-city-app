import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/User.interface';
import { IValidUser } from '../interfaces/ValidUser.interface';
import { IVacationRequest } from '../interfaces/VacationRequest.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployService {

  private environment = environment;

  private urlIsValidUser = `${this.environment.host}${this.environment.employees.validUser}`
  private urlGetUserInformation = `${this.environment.host}${this.environment.employees.userInformation}`
  private urlCreateVacationRequest = `${this.environment.host}${this.environment.employees.requestVacations}`
  private urlGetAllVacationRequest = `${this.environment.host}${this.environment.employees.allVacationRequests}`
  private urlGetVacationRequestByUser= `${this.environment.host}${this.environment.employees.vacationByUser}`
  private urlCancelVacationRequest = `${this.environment.host}${this.environment.employees.cancelVacation}`
  private urlGetAllEmployes = `${this.environment.host}${this.environment.employees.allEmployees}`

  constructor( private http: HttpClient ) { }

  isValidUser( id: number ): Observable<IValidUser> {
    const response$ = this.http.post<IValidUser>(this.urlIsValidUser, id);
    return response$;
  }

  getUserInformation( id: number ): Observable<IUser> {
    const url = `${this.urlGetUserInformation}/${id}`;
    const response$ = this.http.get<IUser>(url);

    return response$;
  }

  createVacationRequest( id: number, body: any ) {
    const url = `${this.urlCreateVacationRequest}/${id}`;
    const response$ = this.http.post(url, body)

    return response$;
  }

  getAllVacationRequest(): Observable<IVacationRequest[]> {
    const response$ = this.http.get<IVacationRequest[]>(this.urlGetAllVacationRequest);
    return response$;
  }

  getVacationRequestByUser( id: number ): Observable<IVacationRequest[]> {
    const url = `${this.urlGetVacationRequestByUser}/${id}`;
    const response$ = this.http.get<IVacationRequest[]>(url);

    return response$;
  }

  cancelVacationRequest( id: number, idSolicitud: number, nombre: string ) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('idSolicitud', idSolicitud);
    params = params.append('nombre', nombre);

    const response$ = this.http.get(this.urlCancelVacationRequest, {params});
    return response$;
  }

  getAllEmployes(): Observable<any> {
    const response$ = this.http.get(this.urlGetAllEmployes);
    return response$;
  }
}
