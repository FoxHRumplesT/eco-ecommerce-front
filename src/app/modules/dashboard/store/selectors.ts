import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './state';

const stateSelector = createFeatureSelector<State>('dash');

export const uiSelector = createSelector(stateSelector, state => state.ui);
export const productsSelector = createSelector(stateSelector, state => state.data.products);
export const taxesSelector = createSelector(stateSelector, state => state.data.taxes);
export const basketSelector = createSelector(stateSelector, state => state.data.basket);
export const resultSelector = createSelector(stateSelector, state => state.data.result);
export const clientSelector = createSelector(stateSelector, state => state.data.clients);
export const billsSelector = createSelector(stateSelector, state => state.data.bills);
export const reportTypesSelector = createSelector(stateSelector, state => state.data.reportTypes);
