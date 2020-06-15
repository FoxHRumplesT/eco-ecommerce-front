import { Product, Tax, Basket } from '../dashboard.entities';

export interface UIState {
  isLoadingProducts: boolean;
  isLoadingTaxes: boolean;
}

export interface DataState {
  products: Product[];
  taxes: Tax[];
  basket: Basket;
}
export interface State {
  ui: UIState;
  data: DataState;
}
