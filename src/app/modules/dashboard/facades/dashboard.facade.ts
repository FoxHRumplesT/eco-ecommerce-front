import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product, Tax } from '../entities/dashboard.entities';
import { productsSelector, taxesSelector } from '../store/selectors';
import * as actions from '../store/actions';

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

  public fetchProducts(page: number): void {
    this.store.dispatch(actions.fetchProductsAction({ page }));
  }

  public fetchTaxes(): void {
    this.store.dispatch(actions.fetchTaxesAction());
  }
}
