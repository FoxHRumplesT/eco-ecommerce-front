import { NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product, Tax, Basket, Result, Client } from './dashboard.entities';
import { productsSelector, taxesSelector, basketSelector, resultSelector, clientSelector, uiSelector } from './store/selectors';
import * as actions from './store/actions';
import { map } from 'rxjs/operators';

@Injectable()
export class DashboardFacade {

  constructor(
    private store: Store
  ) {}

  public products$: Observable<Product[]> = this.store.pipe(
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

  public isEnabledBillButton$: Observable<boolean> = this.store.pipe(
    select(uiSelector), map(state => state.isEnabledBillButton)
  );

  public setEnabledBillButton(state: boolean): void {
    this.store.dispatch(actions.setEnableBillButtonAction({ state }));
  }

  public fetchProducts(page: number): void {
    this.store.dispatch(actions.fetchProductsAction({ page }));
  }

  public fetchProductsInStock(page: number): void {
    this.store.dispatch(actions.fetchProductsInStockAction({ page }));
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

  public updateProduct(product: Product): void {
    this.store.dispatch(actions.updateProductAction({ product }));
  }

  public deleteProduct(product: Product): void {
    this.store.dispatch(actions.deleteProductAction({ product }));
  }

  public sendMessage(msg: string, status: NgxNotificationStatusMsg): void {
    this.store.dispatch(actions.notificationAction({ msg, status }));
  }

  public createClient(client: Client): void {
    this.store.dispatch(actions.createClientAction({ client }));
  }

  public fetchIDNumber(idNumber: number): void {
    this.store.dispatch(actions.fetchIDNumberAction({ idNumber }));
  }
}
