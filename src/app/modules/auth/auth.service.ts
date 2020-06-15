import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const api = {
  login: () => `${environment.api}/ms-user/api/users/login`,
};

@Injectable()
export class AuthServices {
  constructor(
    private http: HttpClient
  ) {}

  public login$(email: string, password: string ): Observable<string> {
    return this.http.post<string>(api.login(), { Email: email, Password: password });
  }
}
