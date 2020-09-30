import { Tax, Basket, Result, Client, ProductsResponse, Bill, BillsResponse } from '../dashboard.entities';

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
  messageSuccess: string;
  clients: Client[];
  bills: BillsResponse;
  reportTypes: any;
}
export interface State {
  ui: UIState;
  data: DataState;
}
