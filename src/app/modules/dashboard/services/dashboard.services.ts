import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../entities/dashboard.entities';
import { environment } from 'src/environments/environment';

const api = {
  products: (page: number) => `${environment.api.bill}/ms/e-bill/product?page=${page}`
};

@Injectable()
export class DashboardServices {

  constructor(
    private http: HttpClient
  ) {}

  public fetchProducts$(page: number): Observable<{ isSuccess: boolean, message: string, result: Product[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Product[]}>(api.products(page));
  }
}
