import { createReducer, on, combineReducers } from '@ngrx/store';

import { DataState, UIState } from './state';
import * as actions from './actions';

const initialUiState: UIState = {
  isLoadingLogin: true
} as UIState;

const ui = createReducer(
  initialUiState,
  on(actions.loginAction, (state, payload) => ({ ...state, isLoadingProduct: true })),
);

const initialDataState: DataState = {} as DataState;

const data = createReducer(
  initialDataState,
  on(actions.loginSuccessAction, (state, { response }) => ({ ...state, product: response })),
);

export const AuthReducers = combineReducers({
  ui,
  data
});
