import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product, Tax, Basket, Result } from './dashboard.entities';

const api = {
  products: (page: number) => `${environment.api}/ms-e-bill/api/stock?page=${page}`,
  taxes: () => `${environment.api}/ms-e-bill/api/taxes`,
  calculateTaxes: () => `${environment.api}/ms-e-bill/api/bill/calculate`,
};

@Injectable()
export class DashboardServices {

  constructor(
    private http: HttpClient
  ) {}

  public fetchProducts$(page: number): Observable<{ isSuccess: boolean, message: string, results: Product[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, results: Product[]}>(api.products(page));
  }

  public fetchTaxes$(): Observable<{ isSuccess: boolean, message: string, results: Tax[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, results: Tax[]}>(api.taxes());
  }

  public calculateTaxesInBasket$(basket: Basket): Observable<{ isSuccess: boolean, message: string, result: Result}> {
    return this.http.post<{ isSuccess: boolean, message: string, result: Result}>(api.calculateTaxes(), basket);
  }
}
