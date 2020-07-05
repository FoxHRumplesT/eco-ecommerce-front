import { createReducer, on, combineReducers } from '@ngrx/store';

import { DataState, UIState } from './state';
import * as actions from './actions';
import { Result } from '../dashboard.entities';

const initialUiState: UIState = {
  isLoadingProducts: true,
  isLoadingTaxes: true
} as UIState;

const ui = createReducer(
  initialUiState,
  on(actions.fetchProductsAction, (state, payload) => ({ ...state, isLoadingProduct: true })),
  on(actions.fetchProductsSuccessAction, (state, payload) => ({ ...state, isLoadingProduct: false })),
);

const initialDataState: DataState = {
  products: [],
  taxes: [],
  basket: { products: [] },
  result: { summary: [] }
} as DataState;

const data = createReducer(
  initialDataState,
  on(actions.fetchProductsSuccessAction, (state, { response }) => ({ ...state, products: response })),
  on(actions.fetchTaxesSuccessAction, (state, { response }) => ({ ...state, taxes: response })),
  on(actions.addProductToBasketAction, (state, { product }) => {
    const newBasket = { ...state.basket };
    const indexToUpdate = newBasket.products.findIndex(_product => _product.id === product.id);
    if (indexToUpdate > -1) {
      newBasket.products = [
        ...newBasket.products.slice(0, indexToUpdate),
        { ...product, quantity: newBasket.products[indexToUpdate].quantity + product.quantity},
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
  on(actions.calculateTaxesInBasketSuccess, (state, { response }) => ({...state, result: response }))
);

export const DashboardReducers = combineReducers({
  ui,
  data
});
