import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';
import { IBalance } from './interfaces/Balance.interface';
import { IPolicies, IUser } from './interfaces/User.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public tipo: string = '';
  public usuarioLogin: string = '';
  public nombre: string = '';
  public balances!: IBalance[];
  public politicas: Array<IPolicies> = [];
  public politicaUsuario: string = '';
  public politicaVacaciones: number = 0;

  constructor( private employeService: EmployService ) {}

  ngOnInit() {
    // this.employeService.isValidUser(500).subscribe(res => console.log(res))
    this.employeService.getUserInformation(500).subscribe((res: IUser) => {
      this.tipo = res.tipo;
      this.usuarioLogin = res.usuarioLogin;
      this.nombre = res.nombre;
      this.balances = res.saldos;
      this.politicas = res.politicas;
      this.politicaUsuario = res.saldos[0].nombrePolitica;
      this.politicaVacaciones = res.saldos[0].politicaVacaciones;
    })
  }
}
