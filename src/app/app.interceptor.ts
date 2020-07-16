import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private applicationId = 'c14ba89d-4e8a-4ffc-be9c-77e9a207914b';

  // tslint:disable-next-line
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('t');
    const type = req.url.includes('files') ? `multipart/form-data` : `application/json`;
    let headers = req.headers
      .append('x-application-id', `${this.applicationId}`)
      .append('Accept', `*/*`)
      .append('Authorization', `${token}`);
    headers = req.url.includes('files') ? headers : headers.append('Content-Type', 'application/json');

    const newReq = req.clone({ headers });
    return next.handle(newReq);
  }

}
