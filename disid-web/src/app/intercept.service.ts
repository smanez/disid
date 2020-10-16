// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
// RxJS
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        authorization: 'QdTEFMPsS2OSLFHPoM88eaQDnCffgopx'
      }
    });
    request = request.clone({
      withCredentials: true
  });

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            console.log(event.status);
          }
        },
        error => {
          console.error(error.status);
          console.error(error.message);
        }
      )
    );
  }
}
