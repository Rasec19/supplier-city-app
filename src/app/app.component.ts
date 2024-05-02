import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';
import { IStory } from './interfaces/Story.interface';
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
  public balances!: IStory;
  public politicas: Array<IPolicies> = [];

  constructor( private employeService: EmployService ) {}

  ngOnInit() {
    // this.employeService.isValidUser(500).subscribe(res => console.log(res))
    this.employeService.getUserInformation(500).subscribe((res: IUser) => {
      this.tipo = res.tipo;
      this.usuarioLogin = res.usuarioLogin;
      this.nombre = res.nombre;
      this.balances = res.saldos;
      this.politicas = res.politicas;
    })
  }
}
