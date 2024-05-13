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

  constructor( private adminService: AdminService, ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('https://www.primefaces.org/cdn/api/upload.php')) {
      return next.handle(request);
    }

    const isAdmin = this.adminService.getIsAdmin();

    const modifiedReq = request.clone({
      setHeaders: {
        // 'X-EsAdmin': isAdmin.toString()
        'X-EsAdmin': 'true'
      },
    });

    return next.handle(modifiedReq);
  }
}
