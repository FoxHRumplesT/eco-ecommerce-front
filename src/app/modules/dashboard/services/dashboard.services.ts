import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product, Tax } from '../entities/dashboard.entities';

const api = {
  products: (page: number) => `${environment.api}/ms-e-bill/api/product?page=${page}`,
  taxes: () => `${environment.api}/ms-e-bill/api/taxes`,
};

@Injectable()
export class DashboardServices {

  constructor(
    private http: HttpClient
  ) {}

  public fetchProducts$(page: number): Observable<{ isSuccess: boolean, message: string, result: Product[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Product[]}>(api.products(page));
  }

  public fetchTaxes$(): Observable<{ isSuccess: boolean, message: string, result: Tax[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Tax[]}>(api.taxes());
  }
}
