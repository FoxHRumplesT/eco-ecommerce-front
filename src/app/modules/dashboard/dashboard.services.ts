import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product, Tax, Basket, Result, Client, Bill, BillResponse } from './dashboard.entities';

const api = {
  productsInStock: (page: number, keyword: string) => `${environment.api}/ms-e-bill/api/stock?page=${page}&keyword=${keyword}`,
  products: (page: number, keyword: string) => `${environment.api}/ms-e-bill/api/product?page=${page}&keyword=${keyword}`,
  taxes: () => `${environment.api}/ms-e-bill/api/taxes`,
  calculateTaxes: () => `${environment.api}/ms-e-bill/api/bill/calculate`,
  createProduct: () => `${environment.api}/ms-e-bill/api/product`,
  updateProduct: (code: string) => `${environment.api}/ms-e-bill/api/product/${code}`,
  deleteProduct: (code: string) => `${environment.api}/ms-e-bill/api/product/${code}`,
  loadImage: () => `${environment.blobServer}/api/files/`,
  createClient: () => `${environment.api}/ms-client/api/client`,
  fetchIDNumber: (idNumber: number) => `${environment.api}/ms-client/api/client?numberIdentification=${idNumber}`,
  createBill: () => `${environment.api}/ms-e-bill/api/bill`,
  fetchBills: (page: number) => `${environment.api}/ms-e-bill/api/bill?page=${page}`,
  fetchBillById_delete_update: (id: number) => `${environment.api}/ms-e-bill/api/bill/${id}`
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
    return this.http.put<{ isSuccess: boolean, message: string}>(api.updateProduct(product.code), product);
  }

  public deleteProduct$(product: Product): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.delete<{ isSuccess: boolean, message: string}>(api.deleteProduct(product.code));
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

  public createBill$(bill: Bill): Observable<{ isSuccess: boolean, message: string, result: BillResponse}> {
    return this.http.post<{ isSuccess: boolean, message: string, result: BillResponse}>(api.createBill(), bill);
  }

  public fetchBills$(page: number): Observable<{ isSuccess: boolean, message: string, result: Bill[]}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Bill[]}>(api.fetchBills(page));
  }

  public fetchBillById$(idBill: number): Observable<{ isSuccess: boolean, message: string, result: Bill}> {
    return this.http.get<{ isSuccess: boolean, message: string, result: Bill}>(api.fetchBillById_delete_update(idBill));
  }

  public deleteBill$(bill: Bill): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.delete<{ isSuccess: boolean, message: string, result: BillResponse}>(api.fetchBillById_delete_update(bill.id));
  }

  public updateBill$(bill: Bill): Observable<{ isSuccess: boolean, message: string}> {
    return this.http.put<{ isSuccess: boolean, message: string}>(api.fetchBillById_delete_update(bill.id), bill);
  }
}
