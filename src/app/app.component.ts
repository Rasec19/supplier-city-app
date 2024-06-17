import { Component } from '@angular/core';
import { EmployService } from './services/employ.service';
import { IBalance } from './interfaces/Balance.interface';
import { IPolicies } from './interfaces/User.interface';
import { AdminService } from './services/admin.service';

import { Router } from '@angular/router';
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

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) {}

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminParam = urlParams.get('isAdmin');
    const userIdParam = urlParams.get('userId');

    if (isAdminParam !== null && userIdParam !== null) {
      this.admin = isAdminParam === 'true';
      this.userId = Number(userIdParam);

      this.adminService.setIsAdmin(this.admin);
    } else {
      // Manejo del error: navegar a una página de error o mostrar un mensaje
      this.router.navigate(['/error-page']);
    }
  }

}
