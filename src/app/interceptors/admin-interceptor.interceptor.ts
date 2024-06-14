import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements HttpInterceptor {

  private isAdmin!: string;

  constructor( ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.url.includes('https://www.primefaces.org/cdn/api/upload.php')) {
      return next.handle(request);
    }

    this.isAdmin = window.location.href.split('isAdmin=')[1];

    const modifiedReq = request.clone({
      setHeaders: {
        'X-EsAdmin': this.isAdmin
        // 'X-EsAdmin': 'true'
      },
    });

    return next.handle(modifiedReq);
  }
}
