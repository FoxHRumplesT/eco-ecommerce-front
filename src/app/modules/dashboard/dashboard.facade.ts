import { NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Product, Tax, Basket, Result, Client, ProductsResponse, BillsResponse, Bill } from './dashboard.entities';
import {
  productsSelector, taxesSelector, basketSelector, resultSelector, clientSelector, uiSelector, billsSelector
} from './store/selectors';
import * as actions from './store/actions';

@Injectable()
export class DashboardFacade {

  constructor(
    private store: Store
  ) {}

  public products$: Observable<ProductsResponse> = this.store.pipe(
    select(productsSelector)
  );

  public taxes$: Observable<Tax[]> = this.store.pipe(
    select(taxesSelector)
  );

  public basket$: Observable<Basket> = this.store.pipe(
    select(basketSelector)
  );

  public result$: Observable<Result> = this.store.pipe(
    select(resultSelector)
  );

  public clients$: Observable<Client[]> = this.store.pipe(
    select(clientSelector)
  );

  public bills$: Observable<BillsResponse> = this.store.pipe(
    select(billsSelector)
  );

  public isEnabledBillButton$: Observable<boolean> = this.store.pipe(
    select(uiSelector), map(state => state.isEnabledBillButton)
  );

  public fetchProducts(page: number, keyword: string): void {
    this.store.dispatch(actions.fetchProductsAction({ page, keyword }));
  }

  public fetchProductsInStock(page: number, keyword: string): void {
    this.store.dispatch(actions.fetchProductsInStockAction({ page, keyword }));
  }

  public fetchTaxes(): void {
    this.store.dispatch(actions.fetchTaxesAction());
  }

  public addProductToBasket(product: Product): void {
    this.store.dispatch(actions.addProductToBasketAction({ product }));
  }

  public removeProductToBasket(product: Product): void {
    this.store.dispatch(actions.removeProductToBasketAction({ product }));
  }

  public calculateTaxesInBasket(basket: Basket) {
    this.store.dispatch(actions.calculateTaxesInBasketAction({ basket }));
  }

  public updateProductFromBasket(product: Product): void {
    this.store.dispatch(actions.updateProductFromBasketAction({ product }));
  }

  public createProduct(product: Product, formDataToUploadImage: FormData): void {
    this.store.dispatch(actions.createProductAction({ product, formDataToUploadImage }));
  }

  public updateProduct(product: Product, formDataToUploadImage: FormData): void {
    this.store.dispatch(actions.updateProductAction({ product, formDataToUploadImage }));
  }

  public deleteProduct(product: Product): void {
    this.store.dispatch(actions.deleteProductAction({ product }));
  }

  public sendMessage(msg: string, status: NgxNotificationStatusMsg): void {
    this.store.dispatch(actions.notificationAction({ msg, status }));
  }

  public fetchIDNumber(idNumber: number): void {
    this.store.dispatch(actions.fetchIDNumberAction({ idNumber }));
  }

  public fetchBills(page: number): void {
    this.store.dispatch(actions.fetchBillsAction({ page }));
  }

  public createBill(bill: Bill): void {
    this.store.dispatch(actions.createBillAction({ bill }));
  }

  public deleteBill(bill: Bill): void {
    this.store.dispatch(actions.deleteBillAction({ bill }));
  }

  public updateBill(bill: Bill): void {
    this.store.dispatch(actions.updateBillAction({ bill }));
  }
}
