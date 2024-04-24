import { Component, Input } from '@angular/core';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {

  @Input() public usuarioLogin: string = '';
  visible: boolean = false;

  constructor( private employService: EmployService ) {}

  ngOnInit(): void {
    // this.employService.getUserInformation(500).subscribe(res => {
    //   this.tipo = res.tipo;
    //   this.usuarioLogin = res.usuarioLogin;
    //   this.nombre = res.nombre;
    // })
  }


}
