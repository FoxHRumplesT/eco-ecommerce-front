import { createReducer, on, combineReducers } from '@ngrx/store';

import { DataState, UIState } from './state';
import * as actions from './actions';
import { Result } from '../dashboard.entities';

const initialUiState: UIState = {
  isLoadingProducts: true,
  isLoadingTaxes: true,
  isEnabledBillButton: false,
} as UIState;

const ui = createReducer(
  initialUiState,
  on(actions.fetchProductsAction, (state, payload) => ({ ...state, isLoadingProduct: true })),
  on(actions.fetchProductsSuccessAction, (state, payload) => ({ ...state, isLoadingProduct: false })),
  on(actions.setEnableBillButtonAction, (_state, {state}) => ({ ..._state, isEnabledBillButton: state })),

);

const initialDataState: DataState = {
  products: {},
  taxes: [],
  basket: { products: [] },
  result: { summary: {} },
  clients: [],
  bill: {}
} as DataState;

const data = createReducer(
  initialDataState,
  on(actions.fetchProductsSuccessAction, (state, { response }) => ({ ...state, products: response })),
  on(actions.fetchProductsInStockSuccessAction, (state, { response }) => ({ ...state, products: response })),
  on(actions.fetchTaxesSuccessAction, (state, { response }) => ({ ...state, taxes: response })),
  on(actions.addProductToBasketAction, (state, { product }) => {
    const newBasket = { ...state.basket };
    const indexToUpdate = newBasket.products.findIndex(_product => _product.id === product.id);
    if (indexToUpdate > -1) {
      newBasket.products = [
        ...newBasket.products.slice(0, indexToUpdate),
        { ...product, quantity: newBasket.products[indexToUpdate].quantity + product.quantity, value: newBasket.products[0].value},
        ...newBasket.products.slice(indexToUpdate + 1)
      ];
    } else {
      newBasket.products = [...newBasket.products, product];
    }
    return ({ ...state, basket: newBasket });
  }),
  on(actions.updateProductFromBasketAction, (state, { product }) => {
    const newBasket = { ...state.basket };
    const indexToReplace = newBasket.products.findIndex(_product => _product.id === product.id);
    const newProducts = [
      ...newBasket.products.slice(0, indexToReplace),
      product,
      ...newBasket.products.slice(indexToReplace + 1)
    ];
    return ({ ...state, basket: { ...newBasket, products: newProducts } });
  }),
  on(actions.removeProductToBasketAction, (state, { product }) => {
    const newBasket = { ...state.basket };
    const indexToDelete = newBasket.products.findIndex(_product => _product.id === product.id);
    const productFound = newBasket.products[indexToDelete];
    if (productFound && productFound.quantity > 1) {
      newBasket.products = [
        ...newBasket.products.slice(0, indexToDelete),
        { ...productFound, quantity: productFound.quantity - 1},
        ...newBasket.products.slice(indexToDelete + 1)
      ];
    } else {
      newBasket.products = [
        ...newBasket.products.slice(0, indexToDelete),
        ...newBasket.products.slice(indexToDelete + 1)
      ];
    }
    return ({ ...state, basket: newBasket });
  }),
  on(actions.calculateTaxesInBasketSuccessAction, (state, { response }) => ({...state, result: response })),

  on(actions.createProductSuccessAction, (state, { response }) => ({...state, result: response })),

  on(actions.updateProductSuccessAction, (state, { response }) => ({...state, result: response })),

  on(actions.deleteProductSuccessAction, (state, { response }) => ({...state, result: response })),

  on(actions.createClientSuccessAction, (state, { response }) => ({...state, resultClient: response })),

  on(actions.fetchIDNumberSuccessAction, (state, { response }) => ({...state, clients: response })),

  on(actions.createBillSuccessAction, (state, { response }) => ({...state, bill: response }))
);

export const DashboardReducers = combineReducers({
  ui,
  data
});
