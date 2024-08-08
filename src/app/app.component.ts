import { Component } from '@angular/core';
import { AdminService } from './services/admin.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { translate } from './handler/translatePrimeNG';
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
    private primengConfig: PrimeNGConfig,
  ) {}

  ngOnInit() {
    this.primengConfig.setTranslation(translate);

    const urlParams = new URLSearchParams(window.location.search);
    const isAdminParam = urlParams.get('isAdmin');
    const userIdParam = urlParams.get('userId');

    if (isAdminParam !== null && userIdParam !== null) {
      this.admin = isAdminParam === 'true';
      this.userId = Number(userIdParam);

      this.adminService.setIsAdmin(this.admin);
      this.adminService.setUserId(this.userId);
    } else {
      this.router.navigate(['/error-page']);
    }
  }

}
