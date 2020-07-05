import { Product, Tax, Basket, Result } from '../dashboard.entities';

export interface UIState {
  isLoadingProducts: boolean;
  isLoadingTaxes: boolean;
}

export interface DataState {
  products: Product[];
  taxes: Tax[];
  basket: Basket;
  result: Result;
}
export interface State {
  ui: UIState;
  data: DataState;
}
