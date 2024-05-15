import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {
  private isAdmin: boolean = false;

  constructor( private adminService: AdminService, ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('https://www.primefaces.org/cdn/api/upload.php')) {
      return next.handle(request);
    }

    const isAdmin$ = this.adminService.getIsAdmin();
    isAdmin$.subscribe(res => {
      this.isAdmin = res;
    })


    const modifiedReq = request.clone({
      setHeaders: {
        // 'X-EsAdmin': this.isAdmin.toString()
        'X-EsAdmin': 'true'
      },
    });

    return next.handle(modifiedReq);
  }
}
