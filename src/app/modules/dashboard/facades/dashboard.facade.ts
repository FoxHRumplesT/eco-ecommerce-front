import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Product } from '../entities/dashboard.entities';
import { productsSelector } from '../store/selectors';
import * as actions from '../store/actions';

@Injectable()
export class DashboardFacade {

  constructor(
    private store: Store
  ) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(productsSelector)
  );

  public fetchProducts(page: number): void {
    this.store.dispatch(actions.fetchProductsAction({ page }));
  }
}
