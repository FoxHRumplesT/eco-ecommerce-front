import { createReducer, on, combineReducers } from '@ngrx/store';

import { DataState, UIState } from './state';
import * as actions from './actions';

const initialUiState: UIState = {
  isLoadingLogin: true
} as UIState;

const ui = createReducer(
  initialUiState,
  on(actions.loginAction, (state, payload) => ({ ...state, isLoadingLogin: true })),
);

const initialDataState: DataState = {} as DataState;

const data = createReducer(
  initialDataState,
);

export const AuthReducers = combineReducers({
  ui,
  data
});
