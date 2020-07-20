import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product, Tax, Basket, Result, Client } from './dashboard.entities';

const api = {
  productsInStock: (page: number, keyword: string) => `${environment.api}/ms-e-bill/api/stock?page=${page}&keyword=${keyword}`,
  products: (page: number, keyword: string) => `${environment.api}/ms-e-bill/api/product?page=${page}&keyword=${keyword}`,
  taxes: () => `${environment.api}/ms-e-bill/api/taxes`,
  calculateTaxes: () => `${environment.api}/ms-e-bill/api/bill/calculate`,
  createProduct: () => `${environment.api}/ms-e-bill/api/product`,
  updateProduct: (ID: number) => `${environment.api}/ms-e-bill/api/product/${ID}`,
  loadImage: () => `${environment.blobServer}/api/files/`,
  createClient: () => `${environment.api}/ms-client/api/client`,
  fetchIDNumber: (idNumber: number) => `${environment.api}/ms-client/api/client?numberIdentification=${idNumber}`,
};

@Injectable()
export class DashboardServices {

  constructor(
    private http: HttpClient
  ) {}

  public fetchProductsInStock$(page: number, keyword: string): Observable<{ isSuccess: boolean, message: string, results: Product[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, results: Product[]}>(api.productsInStock(page, keyword));
  }

  public fetchProducts$(page: number, keyword: string): Observable<{ isSuccess: boolean, message: string, results: Product[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, results: Product[]}>(api.products(page, keyword));
  }

  public fetchTaxes$(): Observable<{ isSuccess: boolean, message: string, results: Tax[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, results: Tax[]}>(api.taxes());
  }

  public calculateTaxesInBasket$(basket: Basket): Observable<{ isSuccess: boolean, message: string, result: Result}> {
    return this.http.post<{ isSuccess: boolean, message: string, result: Result}>(api.calculateTaxes(), basket);
  }

  public createProduct$(product: Product): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.post<{ isSuccess: boolean, message: string}>(api.createProduct(), product);
  }

  public updateProduct$(product: Product): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.put<{ isSuccess: boolean, message: string}>(api.updateProduct(product.id), product);
  }

  public deleteProduct$(product: Product): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.delete<{ isSuccess: boolean, message: string}>(api.updateProduct(product.id));
  }

  public uploadImage$(formDataToUploadImage: FormData): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.post<{ isSuccess: boolean, message: string}>(api.loadImage(), formDataToUploadImage);
  }

  public createClient$(client: Client): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.post<{ isSuccess: boolean, message: string}>(api.createClient(), client);
  }

  public fetchIDNumber$(idNumber: number): Observable<{ isSuccess: boolean, message: string, result: Client[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Client[]}>(api.fetchIDNumber(idNumber));
  }
}
