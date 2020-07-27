import { Tax, Basket, Result, Client, ProductsResponse, Bill, BillResponse } from '../dashboard.entities';

export interface UIState {
  isLoadingProducts: boolean;
  isLoadingTaxes: boolean;
  isEnabledBillButton: boolean;
}

export interface DataState {
  products: ProductsResponse;
  taxes: Tax[];
  basket: Basket;
  result: Result;
  resultClient: Result;
  messageSuccess: string;
  clients: Client[];
  bill: BillResponse;
}
export interface State {
  ui: UIState;
  data: DataState;
}
