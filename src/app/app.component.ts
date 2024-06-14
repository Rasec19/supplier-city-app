import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';
import { IBalance } from './interfaces/Balance.interface';
import { IPolicies, IUser } from './interfaces/User.interface';
import { IValidUser } from './interfaces/ValidUser.interface';
import { AdminService } from './services/admin.service';

import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private userId!: number;
  private admin!: boolean;

  public isAdmin: boolean = false;
  public userExist: boolean = false;
  public tipo: string = '';
  public usuarioLogin: string = '';
  public nombre: string = '';
  public balances!: IBalance[];
  public politicas: Array<IPolicies> = [];
  public politicaUsuario: string = '';
  public politicaVacaciones: number = 0;
  public diasPendientes: number = 0;

  constructor(
    private employeService: EmployService,
    private adminService: AdminService,
    private route: ActivatedRoute,
  ) {
    console.log(window.location.href)
    this.admin = Boolean(window.location.href.split('isAdmin=')[1]);
    this.userId = Number(window.location.href.split('userId=')[1].split('&')[0]);
    console.log(this.admin)
    console.log(this.userId)
    this.adminService.setIsAdmin(this.admin)
  }

  ngAfterViewInit() {

    this.employeService.isValidUser(500).subscribe(( res: IValidUser ) => {
      this.isAdmin = res.esAdmin;
      this.userExist = res.existe;
    });
    this.employeService.getUserInformation(500).subscribe((res: IUser) => {
      this.tipo = res.tipo;
      this.usuarioLogin = res.usuarioLogin;
      this.nombre = res.nombre;
      this.balances = res.saldos;
      this.politicas = res.politicas;
      this.politicaUsuario = res.saldos[0].nombrePolitica;
      this.politicaVacaciones = res.saldos[0].politicaVacaciones;
    });
  }
}
