import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

const DEFAULT_TIMEOUT = 30000; // 30 seconds // TODO: verify the number with NFR.

/***
 * Introduce TimeoutInterceptor in transport sevice context as
   this is highly coupled with this TransportServiceProvider.
*/
@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).timeout(DEFAULT_TIMEOUT);
  }
}
