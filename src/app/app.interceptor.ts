import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  private token: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiYWRtaW4iLCJhcHBJZCI6ImMxNGJhODlkLTRlOGEtNGZmYy1iZTljLTc3ZTlhMjA3OTE0YiIsImV4cCI6MTU5MjIxNTY4OCwiaXNzIjoiQmxpdHoiLCJhdWQiOiJ3d3cuQmxpdHouY29tIn0.NMKOKaxokreL8lmJaZLEpaviRId9n4bjEn_Hzv3pojU';

  // tslint:disable-next-line
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('t') || this.token;
    const headers = req.headers
      .append('Authorization', `${token}`);

    const newReq = req.clone({ headers });
    return next.handle(newReq);
  }

}
