import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IBalance } from 'src/app/interfaces/Balance.interface';
import { IPolicies, IUser } from 'src/app/interfaces/User.interface';
import { IValidUser } from 'src/app/interfaces/ValidUser.interface';
import { AdminService } from 'src/app/services/admin.service';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public tipo: string = '';
  public usuarioLogin: string = '';
  public nombre: string = '';
  public balances!: IBalance[];
  public politicas: Array<IPolicies> = [];
  public politicaUsuario: string = '';
  public politicaVacaciones: number = 0;
  public diasPendientes: number = 0;

  constructor(private employeService: EmployService, private adminService: AdminService, private router: Router) {}

  ngAfterViewInit() {
    const userId = this.adminService.getUserID();
    this.employeService.getUserInformation(userId).subscribe((res: IUser) => {
      this.tipo = res.tipo;
      this.usuarioLogin = res.usuarioLogin;
      this.nombre = res.nombre;
      this.balances = res.saldos;
      this.politicas = res.politicas;
      this.politicaUsuario = res.saldos[0].nombrePolitica;
      this.politicaVacaciones = res.saldos[0].politicaVacaciones;
    }, (err) => {
      const { status } = err;
      console.log(err)
      if( status === 404 ) {
        this.router.navigate(['/error-page']);
      }
    });
  }

}
