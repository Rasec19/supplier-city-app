import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployService {

  constructor( private http: HttpClient ) { }

  isValidUser( id: number ) {
    const url = `http://localhost:5084/api/empleado/validarUsuario`;
    const response$ = this.http.post(url, id);

    return response$;
  }
}
