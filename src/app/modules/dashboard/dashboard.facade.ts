import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product, Tax, Basket, Result, CalculateTaxesPayload } from './dashboard.entities';
import { productsSelector, taxesSelector, basketSelector, resultSelector } from './store/selectors';
import * as actions from './store/actions';

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

  public fetchProducts(page: number): void {
    this.store.dispatch(actions.fetchProductsAction({ page }));
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

  public calculateTaxesInBasket(payload: CalculateTaxesPayload[]) {
    this.store.dispatch(actions.calculateTaxesInBasket({ payload }));
  }

  public updateProductFromBasket(product: Product): void {
    this.store.dispatch(actions.updateProductFromBasketAction({ product }));
  }
}
