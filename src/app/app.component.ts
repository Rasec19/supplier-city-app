import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';
import { IStory } from './interfaces/Story.interface';

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

  constructor( private employeService: EmployService ) {}

  ngOnInit() {
    // this.employeService.isValidUser(500).subscribe(res => console.log(res))
    this.employeService.getUserInformation(500).subscribe(res => {
      this.tipo = res.tipo;
      this.usuarioLogin = res.usuarioLogin;
      this.nombre = res.nombre;
      this.balances = res.saldos;
    })
  }
}
