import { createReducer, on, combineReducers } from '@ngrx/store';

import { DataState, UIState } from './state';
import * as actions from './actions';

const initialUiState: UIState = {
  isLoadingProducts: true,
  isLoadingTaxes: true
} as UIState;

const ui = createReducer(
  initialUiState,
  on(actions.fetchProductsAction, (state, payload) => ({ ...state, isLoadingProduct: true })),
  on(actions.fetchProductsAction, (state, payload) => ({ ...state, isLoadingProduct: true })),
);

const initialDataState: DataState = {
  products: [],
  taxes: []
} as DataState;

const data = createReducer(
  initialDataState,
  on(actions.fetchProductsSuccessAction, (state, { response }) => ({ ...state, products: response })),
  on(actions.fetchTaxesSuccessAction, (state, { response }) => ({ ...state, taxes: response })),
);

export const DashboardReducers = combineReducers({
  ui,
  data
});
