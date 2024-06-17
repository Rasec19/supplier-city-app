import { Component } from '@angular/core';
import { IBalance } from 'src/app/interfaces/Balance.interface';
import { IPolicies, IUser } from 'src/app/interfaces/User.interface';
import { IValidUser } from 'src/app/interfaces/ValidUser.interface';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

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

  constructor(private employeService: EmployService,) {}

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
