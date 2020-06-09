import { Product } from '../entities/dashboard.entities';

export interface UIState {
  isLoadingProducts: boolean;
}

export interface DataState {
  products: Product[];
}
export interface State {
  ui: UIState;
  data: DataState;
}
