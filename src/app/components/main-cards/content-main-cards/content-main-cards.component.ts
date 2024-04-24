import { Component, Input } from '@angular/core';
import { EmployService } from 'src/app/services/employ.service';

@Component({
  selector: 'app-content-main-cards',
  templateUrl: './content-main-cards.component.html',
  styleUrls: ['./content-main-cards.component.css']
})
export class ContentMainCardsComponent {

  @Input() public tipo: string = '';
  @Input() public nombre: string = '';
  @Input() public usuarioLogin: string = '';

  constructor() {}

  ngOnInit(): void {
  }

}
