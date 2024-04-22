import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Vacaciones';
  constructor( private employeService: EmployService ) {}

  ngOnInit() {
    this.employeService.isValidUser(500).subscribe(res => console.log(res))
  }
}
