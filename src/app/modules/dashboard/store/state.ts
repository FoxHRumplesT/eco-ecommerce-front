import { Product, Tax } from '../entities/dashboard.entities';

export interface UIState {
  isLoadingProducts: boolean;
  isLoadingTaxes: boolean;
}

export interface DataState {
  products: Product[];
  taxes: Tax[];
}
export interface State {
  ui: UIState;
  data: DataState;
}
